/**
 * Reading Adventure - Main Entry Point
 * Wires together all modules and handles user interactions.
 */

import {
  loadProfiles,
  getActiveProfileId,
  setActiveProfileId,
  loadProfile,
  clearActiveProfile,
  getProfileList,
  saveProfile,
} from './storage.js';
import {
  createProfile,
  completeLevel,
  recordAnswer,
  checkAchievements,
} from './profile.js';
import {
  createLevelState,
  submitAnswer,
  advanceQuestion,
  calculateLevelResults,
  useHint,
  getOutcomeMessage,
  getDifficultyMessage,
  purchaseCosmetic,
  equipCosmetic,
} from './gameEngine.js';
import { WORLDS, COSMETICS } from '../data/config.js';
import {
  showScreen,
  switchTab,
  renderProfileList,
  updateHub,
  renderWorldIntro,
  renderLevelIntro,
  renderQuestion,
  showFeedback,
  applyHintEffect,
  renderResults,
  showRankUp,
  hideRankUp,
  showAchievement,
  spawnCoins,
  renderAchievements,
  showToast,
  updateMuteButton,
  showWelcomeCreate,
  renderHints,
} from './ui.js';
import { initTouchSupport } from './touch.js';
import {
  resumeAudio,
  setMuted,
  playCorrect,
  playIncorrect,
  playCoin,
  playRankUp,
  playLevelComplete,
  playAchievement,
  playHint,
  playClick,
} from './audio.js';

// ── Game State ──────────────────────────────────────────────
let profile = null;
let levelState = null;
let currentWorld = null;
let pendingRankUp = null;
let pendingAchievements = [];

// ── Initialization ──────────────────────────────────────────
function init() {
  initTouchSupport();
  bindEvents();
  const activeId = getActiveProfileId();
  if (activeId) {
    profile = loadProfile(activeId);
    if (profile) {
      setMuted(profile.muted);
      updateMuteButton(profile.muted);
      enterHub();
      return;
    }
  }
  showWelcome();
}

function showWelcome() {
  const profiles = getProfileList();
  renderProfileList(profiles);
  showScreen('screen-welcome');
}

function enterHub() {
  updateHub(profile);
  showScreen('screen-hub');
}

// ── Event Bindings ──────────────────────────────────────────
function bindEvents() {
  // Welcome / Profile
  document.getElementById('btn-start-adventure').addEventListener('click', onCreateProfile);
  document.getElementById('player-name').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onCreateProfile();
  });
  document.getElementById('btn-new-profile').addEventListener('click', () => {
    playClick();
    showWelcomeCreate();
  });
  document.getElementById('saved-profiles-list').addEventListener('click', onSelectProfile);

  // Hub
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      playClick();
      switchTab(tab.dataset.tab);
    });
  });
  document.getElementById('btn-mute').addEventListener('click', toggleMute);
  document.getElementById('btn-achievements').addEventListener('click', () => {
    playClick();
    renderAchievements(profile);
    showScreen('screen-achievements');
  });
  document.getElementById('btn-back-from-achievements').addEventListener('click', () => {
    playClick();
    showScreen('screen-hub');
  });
  document.getElementById('btn-switch-profile').addEventListener('click', () => {
    playClick();
    clearActiveProfile();
    profile = null;
    showWelcome();
  });
  document.getElementById('worlds-grid').addEventListener('click', onSelectWorld);
  document.getElementById('cosmetics-grid').addEventListener('click', onShopAction);

  // World / Level flow
  document.getElementById('btn-start-world').addEventListener('click', startLevelIntro);
  document.getElementById('btn-back-hub-from-world').addEventListener('click', () => {
    playClick();
    enterHub();
  });
  document.getElementById('btn-start-level').addEventListener('click', startGameplay);
  document.getElementById('btn-quit-level').addEventListener('click', () => {
    if (confirm('Quit this level? Your progress on this level will be lost.')) {
      playClick();
      enterHub();
    }
  });

  // Gameplay
  document.getElementById('answer-options').addEventListener('click', onAnswerClick);
  document.getElementById('btn-next-question').addEventListener('click', onNextQuestion);
  document.getElementById('hints-grid').addEventListener('click', onHintClick);

  // Results
  document.getElementById('btn-next-level').addEventListener('click', onNextLevel);
  document.getElementById('btn-back-hub').addEventListener('click', () => {
    playClick();
    enterHub();
  });

  // Rank up
  document.getElementById('rank-up-close').addEventListener('click', () => {
    playClick();
    hideRankUp();
    showPendingAchievements();
  });
}

// ── Profile Handlers ────────────────────────────────────────
function onCreateProfile() {
  resumeAudio();
  const name = document.getElementById('player-name').value.trim();
  if (!name) {
    showToast('Please enter your name!');
    return;
  }
  playClick();
  profile = createProfile(name);
  setActiveProfileId(profile.id);
  enterHub();
}

function onSelectProfile(e) {
  const item = e.target.closest('.profile-item');
  if (!item) return;
  resumeAudio();
  playClick();
  profile = loadProfile(item.dataset.id);
  setActiveProfileId(profile.id);
  setMuted(profile.muted);
  updateMuteButton(profile.muted);
  enterHub();
}

function toggleMute() {
  profile.muted = !profile.muted;
  setMuted(profile.muted);
  updateMuteButton(profile.muted);
  saveProfile(profile);
  if (!profile.muted) playClick();
}

// ── World / Level Handlers ──────────────────────────────────
function onSelectWorld(e) {
  const card = e.target.closest('.world-card');
  if (!card || card.classList.contains('locked')) return;
  playClick();
  currentWorld = WORLDS.find((w) => w.id === card.dataset.world);
  renderWorldIntro(currentWorld, profile);
  showScreen('screen-world-intro');
}

function startLevelIntro() {
  playClick();
  levelState = createLevelState(currentWorld, profile);
  saveProfile(profile);
  renderLevelIntro(levelState);
  showScreen('screen-level-intro');
}

function startGameplay() {
  playClick();
  renderQuestion(levelState, profile);
  showScreen('screen-game');
}

function onNextLevel() {
  playClick();
  levelState = createLevelState(currentWorld, profile);
  saveProfile(profile);
  renderLevelIntro(levelState);
  showScreen('screen-level-intro');
}

// ── Gameplay Handlers ───────────────────────────────────────
function onAnswerClick(e) {
  const btn = e.target.closest('.answer-btn');
  if (!btn || btn.disabled) return;

  resumeAudio();
  document.querySelectorAll('.answer-btn').forEach((b) => b.classList.remove('selected'));
  btn.classList.add('selected');

  const result = submitAnswer(levelState, btn.dataset.answer);

  if (result.correct) {
    recordAnswer(profile, true, result.question.type);
    playCorrect();
    const rect = btn.getBoundingClientRect();
    spawnCoins(rect.left + rect.width / 2, rect.top, 3);
    if (result.reward.streakBonus > 0) playCoin();
  } else {
    playIncorrect();
  }

  showFeedback(result.correct, result.question, result.canRetry);
  renderHints(levelState, profile);
}

function onNextQuestion() {
  playClick();
  const hasMore = advanceQuestion(levelState);
  if (hasMore) {
    renderQuestion(levelState, profile);
  } else {
    finishLevel();
  }
}

function onHintClick(e) {
  const btn = e.target.closest('.hint-btn');
  if (!btn || btn.disabled) return;
  resumeAudio();

  const result = useHint(levelState, profile, btn.dataset.hint);
  if (result.error) {
    showToast(result.error);
    return;
  }

  playHint();
  applyHintEffect(result);

  // Reveal hint marks question as resolved so player can continue
  if (result.revealAnswer) {
    levelState.answered[levelState.currentIndex] = {
      correct: false,
      question: result.question.prompt,
    };
    document.getElementById('feedback-area').classList.remove('hidden');
    document.getElementById('feedback-text').textContent =
      `The answer is "${result.revealAnswer}". You'll get it next time!`;
    document.getElementById('btn-next-question').classList.remove('hidden');
    document.querySelectorAll('.answer-btn').forEach((b) => { b.disabled = true; });
  }

  renderHints(levelState, profile);
  saveProfile(profile);
  updateHub(profile);
}

function finishLevel() {
  const results = calculateLevelResults(levelState);
  const outcome = getOutcomeMessage(results);
  const diffMessage = getDifficultyMessage(results);

  const { rankUp, achievements } = completeLevel(profile, currentWorld.id, results);
  pendingRankUp = rankUp;
  pendingAchievements = achievements;

  playLevelComplete();
  renderResults(results, profile, outcome, diffMessage);
  showScreen('screen-results');

  if (rankUp) {
    setTimeout(() => {
      playRankUp();
      showRankUp(rankUp);
    }, 800);
  } else if (achievements.length > 0) {
    setTimeout(() => showPendingAchievements(), 800);
  }
}

function showPendingAchievements() {
  if (pendingAchievements.length > 0) {
    const ach = pendingAchievements.shift();
    playAchievement();
    showAchievement(ach);
    if (pendingAchievements.length > 0) {
      setTimeout(showPendingAchievements, 4200);
    }
  }
}

// ── Shop Handlers ───────────────────────────────────────────
function onShopAction(e) {
  const btn = e.target.closest('.cosmetic-btn');
  if (!btn) return;
  resumeAudio();

  const item = COSMETICS.find((c) => c.id === btn.dataset.id);
  if (!item) return;

  const owned = profile.cosmeticsOwned.includes(item.id);

  if (owned) {
    const result = equipCosmetic(profile, item);
    if (result.error) {
      showToast(result.error);
      return;
    }
  } else {
    const result = purchaseCosmetic(profile, item);
    if (result.error) {
      showToast(result.error);
      return;
    }
    playCoin();
  }

  playClick();
  saveProfile(profile);
  updateHub(profile);
  checkAchievements(profile);
  saveProfile(profile);
}

// ── Start ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
