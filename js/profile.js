/**
 * Reading Adventure - Profile Management
 * Create, update, and manage player profiles.
 */

import { DEFAULT_PROFILE, RANKS, getRankForXP, isWorldUnlocked, WORLDS, ACHIEVEMENTS } from '../data/config.js';
import { saveProfile, generateProfileId } from './storage.js';

/** Create a new player profile */
export function createProfile(name) {
  const profile = {
    ...JSON.parse(JSON.stringify(DEFAULT_PROFILE)),
    id: generateProfileId(name),
    name: name.trim(),
    coins: 50,
    createdAt: Date.now(),
  };
  saveProfile(profile);
  return profile;
}

/** Update profile rank based on current XP */
export function updateRank(profile) {
  const newRank = getRankForXP(profile.xp);
  const oldRankId = profile.rankId;
  profile.rankId = newRank.id;
  return oldRankId !== newRank.id ? newRank : null;
}

/** Unlock worlds the player qualifies for */
export function checkWorldUnlocks(profile) {
  const newlyUnlocked = [];
  for (const world of WORLDS) {
    if (!profile.worldsUnlocked.includes(world.id) && isWorldUnlocked(world, profile)) {
      profile.worldsUnlocked.push(world.id);
      newlyUnlocked.push(world);
    }
  }
  return newlyUnlocked;
}

/** Get world-specific progress (difficulty tier, level number, used question IDs) */
export function getWorldProgress(profile, worldId) {
  if (!profile.worldProgress[worldId]) {
    profile.worldProgress[worldId] = {
      level: 1,
      difficultyTier: WORLDS.find((w) => w.id === worldId)?.baseDifficulty || 1,
      usedQuestionIds: [],
      levelsAtCurrentTier: 0,
    };
  }
  return profile.worldProgress[worldId];
}

/** Calculate accuracy percentage */
export function getAccuracy(profile) {
  if (profile.totalAnswered === 0) return 0;
  return Math.round((profile.totalCorrect / profile.totalAnswered) * 100);
}

/** Check and unlock achievements, returns newly unlocked list */
export function checkAchievements(profile) {
  const newlyUnlocked = [];
  for (const achievement of ACHIEVEMENTS) {
    if (!profile.achievements.includes(achievement.id) && achievement.check(profile)) {
      profile.achievements.push(achievement.id);
      newlyUnlocked.push(achievement);
    }
  }
  return newlyUnlocked;
}

/** Record a correct answer on the profile */
export function recordAnswer(profile, correct, questionType) {
  profile.totalAnswered++;
  if (correct) {
    profile.totalCorrect++;
    profile.currentStreak++;
    if (profile.currentStreak > profile.bestStreak) {
      profile.bestStreak = profile.currentStreak;
    }
    if (questionType === 'context' || questionType === 'word') {
      profile.vocabCorrect++;
    }
  } else {
    profile.currentStreak = 0;
  }
}

/** Get rank object for profile */
export function getProfileRank(profile) {
  return RANKS.find((r) => r.id === profile.rankId) || RANKS[0];
}

/** Apply level completion stats to profile */
export function completeLevel(profile, worldId, results) {
  const progress = getWorldProgress(profile, worldId);
  progress.level++;
  profile.levelsCompleted++;
  profile.coins += results.coinsEarned;
  profile.totalCoinsEarned += results.coinsEarned;
  profile.xp += results.xpEarned;

  if (results.accuracy === 100) {
    profile.perfectLevels++;
  }

  if (results.hintsUsed === 0) {
    profile.currentNoHintStreak++;
    if (profile.currentNoHintStreak >= 5) {
      profile.noHintLevels = Math.max(profile.noHintLevels, profile.currentNoHintStreak);
    }
  } else {
    profile.currentNoHintStreak = 0;
  }

  // Adaptive difficulty: only increase on mastery
  if (results.showedMastery) {
    progress.difficultyTier = Math.min(5, progress.difficultyTier + 1);
    progress.levelsAtCurrentTier = 0;
  } else if (results.struggling) {
    // Keep same tier, reset used questions for variety
    progress.usedQuestionIds = [];
    progress.levelsAtCurrentTier++;
  } else {
    progress.levelsAtCurrentTier++;
  }

  const rankUp = updateRank(profile);
  checkWorldUnlocks(profile);
  const achievements = checkAchievements(profile);
  saveProfile(profile);

  return { rankUp, achievements };
}
