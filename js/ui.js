/**
 * Reading Adventure - UI Controller
 * DOM updates, screen navigation, animations, and rendering.
 */

import {
  WORLDS,
  RANKS,
  HINT_TYPES,
  ACHIEVEMENTS,
  COSMETICS,
  getRankProgress,
  getNextRankXP,
  getRankForXP,
  isWorldUnlocked,
  getDifficultyLabel,
} from '../data/config.js';
import { getProfileRank, getAccuracy, getWorldProgress } from './profile.js';
import { getTypeLabel, getDisplayAvatar } from './gameEngine.js';
import { formatPassageWithSpeech, cancelSpeech } from './speech.js';

/** Show a specific screen, hide all others */
export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) screen.classList.add('active');
}

/** Switch hub tab */
export function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-panel').forEach((p) => {
    p.classList.toggle('active', p.id === `tab-${tabId}`);
  });
}

/** Render saved profiles on welcome screen */
export function renderProfileList(profiles) {
  const list = document.getElementById('saved-profiles-list');
  const selectCard = document.getElementById('profile-select');
  const createCard = document.getElementById('profile-create');

  if (profiles.length === 0) {
    selectCard.classList.add('hidden');
    createCard.classList.remove('hidden');
    return;
  }

  selectCard.classList.remove('hidden');
  createCard.classList.add('hidden');
  list.innerHTML = profiles
    .map((p) => {
      const rank = RANKS.find((r) => r.id === p.rankId) || RANKS[0];
      return `
        <div class="profile-item" data-id="${p.id}">
          <span class="profile-item-avatar">${p.avatar}</span>
          <div class="profile-item-info">
            <strong>${escapeHtml(p.name)}</strong>
            <small>${rank.icon} ${rank.name} · ${p.coins} 🪙</small>
          </div>
        </div>`;
    })
    .join('');
}

/** Update hub player panel */
export function updateHub(profile) {
  const rank = getProfileRank(profile);
  const nextXP = getNextRankXP(profile.xp);
  const progress = getRankProgress(profile.xp);

  document.getElementById('hub-avatar').textContent = getDisplayAvatar(profile);
  document.getElementById('hub-player-name').textContent = profile.name;
  document.getElementById('hub-rank-badge').textContent = rank.icon;
  document.getElementById('hub-rank-name').textContent = rank.name;
  document.getElementById('hub-xp-bar').style.width = `${progress}%`;
  document.getElementById('hub-xp-text').textContent =
    nextXP ? `${profile.xp} / ${nextXP} XP` : `${profile.xp} XP — MAX RANK!`;
  document.getElementById('hub-coins').textContent = profile.coins;
  document.getElementById('hub-accuracy').textContent = `${getAccuracy(profile)}%`;
  document.getElementById('hub-streak').textContent = profile.currentStreak;

  renderWorlds(profile);
  renderShop(profile);
  updateProfileTab(profile);
}

/** Render adventure worlds grid */
export function renderWorlds(profile) {
  const grid = document.getElementById('worlds-grid');
  grid.innerHTML = WORLDS.map((world) => {
    const unlocked = isWorldUnlocked(world, profile);
    const progress = getWorldProgress(profile, world.id);
    return `
      <div class="world-card ${world.themeClass} ${unlocked ? '' : 'locked'}" data-world="${world.id}">
        ${unlocked ? '' : '<span class="world-lock-badge">🔒 Locked</span>'}
        <span class="world-card-icon">${world.icon}</span>
        <h3>${world.name}</h3>
        <p>Level ${progress.level} · ${getDifficultyLabel(progress.difficultyTier)}</p>
      </div>`;
  }).join('');
}

/** Render cosmetic shop */
export function renderShop(profile) {
  document.getElementById('shop-coins').textContent = profile.coins;
  const grid = document.getElementById('cosmetics-grid');
  grid.innerHTML = COSMETICS.map((item) => {
    const owned = profile.cosmeticsOwned.includes(item.id);
    const equipped = profile.equipped[item.type] === item.icon;
    return `
      <div class="cosmetic-card ${owned ? 'owned' : ''}">
        <span class="cosmetic-icon">${item.icon}</span>
        <h4>${item.name}</h4>
        <p class="cosmetic-price">${owned ? '✅ Owned' : `${item.price} 🪙`}</p>
        <button class="btn ${owned ? 'btn-secondary' : 'btn-primary'} cosmetic-btn"
          data-id="${item.id}" ${!owned && profile.coins < item.price ? 'disabled' : ''}>
          ${equipped ? 'Equipped ✓' : owned ? 'Equip' : 'Buy'}
        </button>
      </div>`;
  }).join('');
}

/** Update profile tab details */
export function updateProfileTab(profile) {
  const rank = getProfileRank(profile);
  document.getElementById('profile-rank').textContent = rank.name;
  document.getElementById('profile-xp').textContent = profile.xp;
  document.getElementById('profile-coins').textContent = profile.coins;
  document.getElementById('profile-accuracy').textContent = `${getAccuracy(profile)}%`;
  document.getElementById('profile-best-streak').textContent = profile.bestStreak;
  document.getElementById('profile-levels').textContent = profile.levelsCompleted;
  document.getElementById('profile-cosmetics').textContent = profile.cosmeticsOwned.length;

  const equipped = document.getElementById('equipped-items');
  const items = Object.entries(profile.equipped)
    .filter(([, v]) => v)
    .map(([type, icon]) => `<span class="equip-tag">${icon} ${type}</span>`)
    .join('');
  equipped.innerHTML = items || '<span class="equip-tag">Default look</span>';
}

/** Render world intro screen */
export function renderWorldIntro(world, profile) {
  const progress = getWorldProgress(profile, world.id);
  document.getElementById('world-intro-bg').style.background = world.bgGradient;
  document.getElementById('world-intro-icon').textContent = world.icon;
  document.getElementById('world-intro-name').textContent = world.name;
  document.getElementById('world-intro-desc').textContent = world.description;
  document.getElementById('world-intro-diff').textContent =
    `${getDifficultyLabel(progress.difficultyTier)} (Level ${progress.level})`;
}

/** Render level intro */
export function renderLevelIntro(state) {
  document.getElementById('level-intro-num').textContent = state.levelNum;
  document.getElementById('level-intro-title').textContent = `${state.world.name} Challenge`;
  document.getElementById('level-intro-questions').textContent =
    `${state.questions.length} Questions`;
  document.getElementById('level-intro-type').textContent = 'Mixed Reading';
  document.getElementById('level-intro-diff').textContent =
    getDifficultyLabel(state.difficultyTier);
}

/** Render current question in gameplay */
export function renderQuestion(state, profile) {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  const idx = state.currentIndex;

  document.getElementById('game-question-num').textContent = `${idx + 1}/${total}`;
  document.getElementById('game-progress-bar').style.width =
    `${((idx) / total) * 100}%`;
  document.getElementById('game-session-coins').textContent = state.sessionCoins;
  document.getElementById('question-type-badge').textContent = getTypeLabel(q.type);

  cancelSpeech();

  document.getElementById('passage-text').innerHTML = formatPassageWithSpeech(q.passage);

  const highlightEl = document.getElementById('highlight-sentence');
  highlightEl.classList.add('hidden');
  highlightEl.innerHTML = '';

  document.getElementById('question-prompt').innerHTML = formatPassageWithSpeech(q.prompt);

  const optionsEl = document.getElementById('answer-options');
  optionsEl.innerHTML = q.options
    .map(
      (opt) =>
        `<button class="answer-btn" data-answer="${escapeAttr(opt)}">${escapeHtml(opt)}</button>`
    )
    .join('');

  document.getElementById('feedback-area').classList.add('hidden');
  document.getElementById('hints-used').textContent = state.hintsUsed;
  document.getElementById('hints-max').textContent = '3';

  renderHints(state, profile);
}

/** Render hint buttons */
export function renderHints(state, profile) {
  const grid = document.getElementById('hints-grid');
  grid.innerHTML = HINT_TYPES.map((hint) => {
    const disabled =
      state.hintsUsed >= 3 ||
      !state.attemptedCurrent ||
      state.hintsUsedThisQuestion ||
      profile.coins < hint.cost;
    return `
      <button class="hint-btn" data-hint="${hint.id}" ${disabled ? 'disabled' : ''}
        title="${hint.description}">
        ${hint.name}
        <span class="hint-cost">${hint.cost} 🪙</span>
      </button>`;
  }).join('');
}

/** Show answer feedback — wrong answers allow retry with hints */
export function showFeedback(correct, question, canRetry = false) {
  const area = document.getElementById('feedback-area');
  const text = document.getElementById('feedback-text');
  const nextBtn = document.getElementById('btn-next-question');
  area.classList.remove('hidden', 'correct-fb', 'incorrect-fb');
  area.classList.add(correct ? 'correct-fb' : 'incorrect-fb');

  if (correct) {
    text.textContent = getPositiveFeedback();
    nextBtn.classList.remove('hidden');
  } else if (canRetry) {
    text.textContent = 'Not quite — try again! You can use a clue if you need help. 💪';
    nextBtn.classList.add('hidden');
  } else {
    text.textContent = `The answer was "${question.answer}". Keep practicing!`;
    nextBtn.classList.remove('hidden');
  }

  document.querySelectorAll('.answer-btn').forEach((btn) => {
    const ans = btn.dataset.answer;
    if (correct) {
      btn.disabled = true;
      if (ans === question.answer) btn.classList.add('correct');
      else if (btn.classList.contains('selected')) btn.classList.add('incorrect');
    } else if (canRetry) {
      if (btn.classList.contains('selected')) {
        btn.classList.add('incorrect');
        btn.disabled = true;
      } else if (!btn.classList.contains('dimmed')) {
        btn.classList.remove('incorrect');
        btn.disabled = false;
      }
    }
  });
}

/** Apply hint visual effects */
export function applyHintEffect(result) {
  if (result.message) {
    showToast(result.message, 'hint');
  }
  if (result.keySentence) {
    const el = document.getElementById('highlight-sentence');
    el.innerHTML = `🔍 Key Evidence: "${formatPassageWithSpeech(result.keySentence)}"`;
    el.classList.remove('hidden');
  }
  if (result.eliminate) {
    result.eliminate.forEach((wrong) => {
      document.querySelectorAll('.answer-btn').forEach((btn) => {
        if (btn.dataset.answer === wrong) btn.classList.add('dimmed');
      });
    });
  }
  if (result.revealAnswer) {
    document.querySelectorAll('.answer-btn').forEach((btn) => {
      if (btn.dataset.answer === result.revealAnswer) btn.classList.add('revealed');
      else btn.classList.add('dimmed');
    });
  }
}

/** Render results screen */
export function renderResults(results, profile, outcome, diffMessage) {
  document.getElementById('results-outcome').textContent = outcome.icon;
  document.getElementById('results-title').textContent = outcome.title;
  document.getElementById('results-message').textContent = outcome.message;
  document.getElementById('results-accuracy').textContent = `${results.accuracy}%`;
  document.getElementById('results-coins').textContent = `+${results.coinsEarned} 🪙`;
  document.getElementById('results-xp').textContent = `+${results.xpEarned} XP`;
  document.getElementById('results-streak-bonus').textContent = `+${results.streakBonuses} 🪙`;
  document.getElementById('results-difficulty-note').textContent = diffMessage;

  const progress = getRankProgress(profile.xp);
  const nextXP = getNextRankXP(profile.xp);
  document.getElementById('results-xp-bar').style.width = `${progress}%`;
  const rank = getRankForXP(profile.xp);
  document.getElementById('results-rank-text').textContent =
    nextXP ? `${rank.name} — ${profile.xp} / ${nextXP} XP` : `${rank.name} — MAX RANK!`;
}

/** Show rank-up overlay */
export function showRankUp(rank) {
  const overlay = document.getElementById('rank-up-overlay');
  document.getElementById('rank-up-badge').textContent = rank.icon;
  document.getElementById('rank-up-title').textContent = rank.name;
  document.getElementById('rank-up-message').textContent =
    `You've reached a new reading rank! Keep exploring!`;
  overlay.classList.remove('hidden');
}

/** Hide rank-up overlay */
export function hideRankUp() {
  document.getElementById('rank-up-overlay').classList.add('hidden');
}

/** Show achievement popup toast */
export function showAchievement(achievement) {
  const toast = document.getElementById('achievement-popup');
  document.getElementById('achievement-popup-text').textContent =
    `${achievement.icon} ${achievement.name}: ${achievement.description}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 4000);
}

/** Animate coin particles at a position */
export function spawnCoins(x, y, count = 5) {
  const container = document.getElementById('coin-particles');
  for (let i = 0; i < count; i++) {
    const coin = document.createElement('span');
    coin.className = 'coin-particle';
    coin.textContent = '🪙';
    coin.style.left = `${x + (Math.random() - 0.5) * 60}px`;
    coin.style.top = `${y}px`;
    coin.style.animationDelay = `${i * 0.08}s`;
    container.appendChild(coin);
    setTimeout(() => coin.remove(), 1200);
  }
}

/** Render achievements page */
export function renderAchievements(profile) {
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = ACHIEVEMENTS.map((a) => {
    const unlocked = profile.achievements.includes(a.id);
    return `
      <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
        <span class="achievement-card-icon">${a.icon}</span>
        <div>
          <h4>${a.name}</h4>
          <p>${a.description}</p>
        </div>
      </div>`;
  }).join('');
}

/** Simple toast notification */
export function showToast(message, type = 'info') {
  const existing = document.querySelector('.game-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'achievement-toast game-toast';
  toast.innerHTML = `<span>${type === 'hint' ? '💡' : 'ℹ️'}</span><div><p>${escapeHtml(message)}</p></div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/** Random positive feedback messages */
function getPositiveFeedback() {
  const messages = [
    'Correct! Great reading! 🎉',
    'Awesome! You got it! ⭐',
    'Super reader! Well done! 📚',
    'Yes! Keep it up! 🔥',
    'Brilliant answer! 🌟',
    'You\'re on fire! 💪',
    'Reading champion! 🏆',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;');
}

/** Update mute button icon */
export function updateMuteButton(muted) {
  document.getElementById('btn-mute').textContent = muted ? '🔇' : '🔊';
}

/** Show welcome screen for profile creation */
export function showWelcomeCreate() {
  document.getElementById('profile-select').classList.add('hidden');
  document.getElementById('profile-create').classList.remove('hidden');
  document.getElementById('player-name').value = '';
  showScreen('screen-welcome');
}

/** Show welcome screen with profile list */
export function showWelcomeSelect() {
  showScreen('screen-welcome');
}
