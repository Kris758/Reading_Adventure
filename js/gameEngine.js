/**
 * Reading Adventure - Game Engine
 * Level flow, rewards, hints, and adaptive difficulty logic.
 */

import {
  REWARDS,
  HINT_TYPES,
  MAX_HINTS_PER_LEVEL,
  ADAPTIVE,
  QUESTION_TYPES,
} from '../data/config.js';
import { selectQuestions, getQuestionCount, shuffleArray } from '../data/questions.js';
import { getWorldProgress } from './profile.js';

/** Active level state (in-memory during gameplay) */
export function createLevelState(world, profile) {
  const progress = getWorldProgress(profile, world.id);
  const questionCount = getQuestionCount(progress.difficultyTier, progress.level);
  const { questions, usedIds } = selectQuestions(
    progress.difficultyTier,
    questionCount,
    new Set(progress.usedQuestionIds || [])
  );

  // Persist used question IDs (match against bank entries, not shuffled copies)
  progress.usedQuestionIds = [...usedIds];

  return {
    world,
    levelNum: progress.level,
    difficultyTier: progress.difficultyTier,
    questions, // each question already has shuffled options from selectQuestions
    currentIndex: 0,
    correctCount: 0,
    sessionCoins: 0,
    sessionXP: 0,
    streakBonuses: 0,
    hintsUsed: 0,
    hintsUsedThisQuestion: false,
    attemptedCurrent: false,
    answered: [],
    currentStreak: profile.currentStreak,
  };
}

/** Get current question from level state */
export function getCurrentQuestion(state) {
  return state.questions[state.currentIndex];
}

/** Calculate coin reward for a correct answer */
export function calculateAnswerReward(state, correct) {
  if (!correct) return { coins: 0, streakBonus: 0, xp: 0 };

  let coins = REWARDS.CORRECT_ANSWER;
  let streakBonus = 0;
  let xp = REWARDS.XP_PER_CORRECT;

  state.currentStreak++;
  if (state.currentStreak === 3) {
    streakBonus = REWARDS.STREAK_3_BONUS;
  } else if (state.currentStreak === 5) {
    streakBonus = REWARDS.STREAK_5_BONUS;
  } else if (state.currentStreak > 5 && state.currentStreak % 5 === 0) {
    streakBonus = REWARDS.STREAK_5_BONUS;
  }

  coins += streakBonus;
  return { coins, streakBonus, xp };
}

/** Process an answer submission — wrong answers allow retry until correct */
export function submitAnswer(state, selectedOption) {
  const question = getCurrentQuestion(state);
  const correct = selectedOption === question.answer;

  state.attemptedCurrent = true;

  let reward = { coins: 0, streakBonus: 0, xp: 0 };

  if (correct) {
    // Only count first successful answer for level stats
    if (!state.answered[state.currentIndex]?.correct) {
      state.correctCount++;
      reward = calculateAnswerReward(state, true);
      state.sessionCoins += reward.coins;
      state.sessionXP += reward.xp;
      state.streakBonuses += reward.streakBonus;
    }
    state.answered[state.currentIndex] = { correct: true, question: question.prompt };
  } else {
    state.currentStreak = 0;
    if (!state.answered[state.currentIndex]) {
      state.answered[state.currentIndex] = { correct: false, question: question.prompt };
    }
  }

  return { correct, reward, question, canRetry: !correct };
}

/** Move to next question; returns true if level continues */
export function advanceQuestion(state) {
  state.currentIndex++;
  state.attemptedCurrent = false;
  state.hintsUsedThisQuestion = false;
  return state.currentIndex < state.questions.length;
}

/** Calculate level completion rewards */
export function calculateLevelResults(state) {
  const total = state.questions.length;
  const accuracy = Math.round((state.correctCount / total) * 100);

  // Passage completion bonus
  const completionBonus =
    REWARDS.PASSAGE_COMPLETE_MIN +
    Math.floor(
      ((REWARDS.PASSAGE_COMPLETE_MAX - REWARDS.PASSAGE_COMPLETE_MIN) * accuracy) / 100
    );

  let coinsEarned = state.sessionCoins + completionBonus;
  let xpEarned = state.sessionXP + REWARDS.XP_LEVEL_COMPLETE;

  const isPerfect = accuracy === 100;
  if (isPerfect) {
    coinsEarned += REWARDS.PERFECT_LEVEL_BONUS;
    xpEarned += REWARDS.XP_PERFECT_BONUS;
  }

  // Adaptive difficulty assessment
  const showedMastery =
    accuracy >= ADAPTIVE.MASTERY_ACCURACY ||
    state.correctCount >= ADAPTIVE.CORRECT_FOR_MASTERY;
  const struggling = accuracy < ADAPTIVE.STRUGGLE_ACCURACY;

  return {
    accuracy,
    correctCount: state.correctCount,
    totalQuestions: total,
    coinsEarned,
    xpEarned,
    streakBonuses: state.streakBonuses,
    hintsUsed: state.hintsUsed,
    isPerfect,
    showedMastery,
    struggling,
    difficultyTier: state.difficultyTier,
    levelNum: state.levelNum,
  };
}

/** Apply a hint — returns hint result or error */
export function useHint(state, profile, hintId) {
  if (state.hintsUsed >= MAX_HINTS_PER_LEVEL) {
    return { error: 'You\'ve used all hints for this level!' };
  }
  if (!state.attemptedCurrent) {
    return { error: 'Try answering first before using a hint!' };
  }
  if (state.hintsUsedThisQuestion) {
    return { error: 'Only one hint per question!' };
  }

  const hint = HINT_TYPES.find((h) => h.id === hintId);
  if (!hint) return { error: 'Invalid hint.' };
  if (profile.coins < hint.cost) {
    return { error: 'Not enough coins!' };
  }

  const question = getCurrentQuestion(state);
  profile.coins -= hint.cost;
  state.hintsUsed++;
  state.hintsUsedThisQuestion = true;

  const result = { hint, question };

  switch (hintId) {
    case 'small':
      result.message = question.hint || 'Read the passage carefully and look for key details.';
      break;
    case 'medium':
      result.message = question.hint || 'Think about what the passage is mainly about.';
      result.eliminate = eliminateWrongOptions(question, 1);
      break;
    case 'major':
      result.message = question.hint || 'The answer is related to the main idea of the passage.';
      result.eliminate = eliminateWrongOptions(question, 2);
      break;
    case 'sentence':
      result.message = 'Look at this key sentence!';
      result.keySentence = question.keySentence || question.passage.split('.')[0] + '.';
      break;
    case 'reveal':
      result.revealAnswer = question.answer;
      result.message = 'The correct answer is highlighted!';
      break;
    default:
      break;
  }

  return result;
}

/** Remove N wrong options from the question */
function eliminateWrongOptions(question, count) {
  const wrong = question.options.filter((o) => o !== question.answer);
  return shuffleArray(wrong).slice(0, count);
}

/** Get question type display label */
export function getTypeLabel(type) {
  return QUESTION_TYPES[type] || 'Reading Challenge';
}

/** Get encouraging outcome message */
export function getOutcomeMessage(results) {
  const { accuracy, isPerfect } = results;

  if (isPerfect) {
    return {
      icon: '🌟',
      title: 'Perfect Level!',
      message: 'Amazing! You got every question right. You\'re a reading superstar!',
    };
  }
  if (accuracy >= 80) {
    return {
      icon: '🎉',
      title: 'Great Job!',
      message: 'You showed real reading mastery! Keep up the awesome work!',
    };
  }
  if (accuracy >= 60) {
    return {
      icon: '👍',
      title: 'Good Effort!',
      message: 'Nice try! Practice makes perfect — you\'re getting stronger every level!',
    };
  }
  return {
    icon: '💪',
    title: 'Keep Going!',
    message: 'Every great reader keeps trying! Let\'s practice more — you\'ve got this!',
  };
}

/** Get adaptive difficulty message for results screen */
export function getDifficultyMessage(results) {
  if (results.showedMastery) {
    return '⭐ Mastery shown! Next level will be a bit harder — you\'re ready!';
  }
  if (results.struggling) {
    return '🌱 Keep practicing at this level — new questions coming your way!';
  }
  return '📖 Keep reading — you\'re building great skills!';
}

/** Purchase a cosmetic item */
export function purchaseCosmetic(profile, cosmetic) {
  if (profile.cosmeticsOwned.includes(cosmetic.id)) {
    return { error: 'You already own this!' };
  }
  if (profile.coins < cosmetic.price) {
    return { error: 'Not enough coins!' };
  }
  profile.coins -= cosmetic.price;
  profile.cosmeticsOwned.push(cosmetic.id);
  return { success: true };
}

/** Equip a owned cosmetic */
export function equipCosmetic(profile, cosmetic) {
  if (!profile.cosmeticsOwned.includes(cosmetic.id)) {
    return { error: 'You don\'t own this item yet!' };
  }
  profile.equipped[cosmetic.type] = cosmetic.icon;
  return { success: true };
}

/** Build display avatar string from equipped items */
export function getDisplayAvatar(profile) {
  const { avatar, hat, pet } = profile.equipped;
  const parts = [avatar || '🧒'];
  if (hat) parts.push(hat);
  if (pet) parts.push(pet);
  return parts.join(' ');
}
