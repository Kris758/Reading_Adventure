/**
 * Reading Adventure - Text-to-speech (tap words to hear them)
 * Uses the Web Speech API with iOS Safari workarounds.
 */

let voicesCache = [];
let iosKeepAliveId = null;
let lastSpeakAt = 0;

function isIOS() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function isGameScreenActive() {
  return document.getElementById('screen-game')?.classList.contains('active');
}

/** Warm up speech on first user touch (required on iPad) */
export function unlockSpeech() {
  if (!('speechSynthesis' in window)) return;
  const synth = window.speechSynthesis;
  voicesCache = synth.getVoices();
  if (typeof synth.resume === 'function') synth.resume();
}

function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  voicesCache = window.speechSynthesis.getVoices();
}

function getEnglishVoice() {
  const voices = voicesCache.length
    ? voicesCache
    : window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0] ||
    null
  );
}

function startIOSKeepAlive() {
  if (!isIOS()) return;
  stopIOSKeepAlive();
  iosKeepAliveId = window.setInterval(() => {
    const synth = window.speechSynthesis;
    if (!synth.speaking && !synth.pending) {
      stopIOSKeepAlive();
      return;
    }
    synth.pause();
    synth.resume();
  }, 250);
}

function stopIOSKeepAlive() {
  if (iosKeepAliveId !== null) {
    window.clearInterval(iosKeepAliveId);
    iosKeepAliveId = null;
  }
}

/** Speak a single word (must run directly from a tap handler on iOS) */
export function speakWord(word) {
  if (!word || !('speechSynthesis' in window)) return false;

  const text = word.replace(/[^\w'-]/g, '');
  if (!text) return false;

  const synth = window.speechSynthesis;
  loadVoices();

  if (typeof synth.resume === 'function') synth.resume();

  // iOS bug: cancel() then speak() in the same gesture often produces silence
  if (!isIOS() && (synth.speaking || synth.pending)) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = isIOS() ? 0.9 : 0.85;
  utterance.pitch = 1.05;
  utterance.volume = 1;

  const voice = getEnglishVoice();
  if (voice) utterance.voice = voice;

  utterance.onstart = () => startIOSKeepAlive();
  utterance.onend = () => {
    stopIOSKeepAlive();
    clearSpeakingHighlight();
  };
  utterance.onerror = () => {
    stopIOSKeepAlive();
    clearSpeakingHighlight();
  };

  synth.speak(utterance);
  return true;
}

export function cancelSpeech() {
  stopIOSKeepAlive();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  clearSpeakingHighlight();
}

function clearSpeakingHighlight() {
  document.querySelectorAll('.speak-word.speaking').forEach((el) => {
    el.classList.remove('speaking');
  });
}

function getSpeakElement(event) {
  const target = event.target;
  if (target instanceof Element) {
    return target.closest('.speak-word');
  }
  const parent = target?.parentElement;
  return parent instanceof Element ? parent.closest('.speak-word') : null;
}

function getSpeakText(el) {
  return el.getAttribute('data-speak') || el.dataset.speak || el.textContent.trim();
}

function handleSpeakTap(event) {
  if (!isGameScreenActive()) return;

  const el = getSpeakElement(event);
  if (!el) return;

  const now = Date.now();
  if (now - lastSpeakAt < 280) return;
  lastSpeakAt = now;

  event.preventDefault();
  event.stopPropagation();

  document.querySelectorAll('.speak-word.speaking').forEach((node) => {
    node.classList.remove('speaking');
  });
  el.classList.add('speaking');

  unlockSpeech();
  speakWord(getSpeakText(el));
}

/** Turn passage text into tappable words (spans — buttons are unreliable on iOS) */
export function formatPassageWithSpeech(text) {
  let html = '';
  let remaining = text;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      html += `<strong>${wrapSpeakTokens(boldMatch[1])}</strong>`;
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const spaceMatch = remaining.match(/^\s+/);
    if (spaceMatch) {
      html += escapeHtml(spaceMatch[0]);
      remaining = remaining.slice(spaceMatch[0].length);
      continue;
    }

    const tokenMatch = remaining.match(/^[^\s*]+/);
    if (tokenMatch) {
      html += wrapSpeakTokens(tokenMatch[0]);
      remaining = remaining.slice(tokenMatch[0].length);
      continue;
    }

    break;
  }

  return html;
}

function wrapSpeakTokens(token) {
  const parts = token.split(/([^\w'-]+)/);
  return parts
    .map((part) => {
      if (!part) return '';
      const speakable = part.replace(/[^\w'-]/g, '');
      if (!speakable) return escapeHtml(part);
      return (
        `<span class="speak-word" role="button" tabindex="0" ` +
        `data-speak="${escapeAttr(speakable)}" ` +
        `aria-label="Hear word: ${escapeAttr(speakable)}">${escapeHtml(part)}</span>`
      );
    })
    .join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Tap-to-speak on the gameplay screen */
export function initGameSpeech(gameScreenEl) {
  if (!gameScreenEl || gameScreenEl.dataset.speechBound === 'true') return;
  gameScreenEl.dataset.speechBound = 'true';

  const opts = { capture: true };

  if (isIOS()) {
    gameScreenEl.addEventListener(
      'touchend',
      (e) => {
        handleSpeakTap(e);
      },
      { ...opts, passive: false }
    );
    gameScreenEl.addEventListener(
      'click',
      (e) => {
        if (getSpeakElement(e)) e.preventDefault();
      },
      opts
    );
  } else {
    gameScreenEl.addEventListener('click', handleSpeakTap, opts);
  }

  gameScreenEl.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (!(e.target instanceof Element)) return;
    const el = e.target.closest('.speak-word');
    if (!el) return;
    e.preventDefault();
    unlockSpeech();
    el.classList.add('speaking');
    speakWord(getSpeakText(el));
  });
}

export function preloadSpeechVoices() {
  if (!('speechSynthesis' in window)) return;
  loadVoices();
  window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
}
