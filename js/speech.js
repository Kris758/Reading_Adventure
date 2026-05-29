/**
 * Reading Adventure - Text-to-speech (tap words to hear them)
 * Uses the browser Web Speech API.
 */

let speakingWord = null;

/** Speak a single word (requires user tap on iOS; works even when game SFX are muted) */
export function speakWord(word) {
  if (!word || !('speechSynthesis' in window)) return;

  const text = word.replace(/[^\w'-]/g, '');
  if (!text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  utterance.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const enVoice =
    voices.find((v) => v.lang.startsWith('en') && v.localService) ||
    voices.find((v) => v.lang.startsWith('en'));
  if (enVoice) utterance.voice = enVoice;

  utterance.onend = () => clearSpeakingHighlight();
  utterance.onerror = () => clearSpeakingHighlight();

  speakingWord = text;
  window.speechSynthesis.speak(utterance);
}

export function cancelSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  clearSpeakingHighlight();
}

function clearSpeakingHighlight() {
  document.querySelectorAll('.speak-word.speaking').forEach((el) => {
    el.classList.remove('speaking');
  });
  speakingWord = null;
}

/** Turn passage text into tappable word buttons */
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
      return `<button type="button" class="speak-word" data-speak="${escapeAttr(speakable)}" aria-label="Hear: ${escapeAttr(speakable)}">${escapeHtml(part)}</button>`;
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

/** One listener for all tappable words in the game screen */
export function initGameSpeech(gameScreenEl) {
  if (!gameScreenEl || gameScreenEl.dataset.speechBound === 'true') return;
  gameScreenEl.dataset.speechBound = 'true';

  gameScreenEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.speak-word');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    document.querySelectorAll('.speak-word.speaking').forEach((el) => {
      el.classList.remove('speaking');
    });
    btn.classList.add('speaking');

    speakWord(btn.dataset.speak);
  });
}

/** iOS loads voices asynchronously */
export function preloadSpeechVoices() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    window.speechSynthesis.getVoices();
  });
}
