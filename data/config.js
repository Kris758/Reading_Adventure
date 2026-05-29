/**
 * Reading Adventure - Game Configuration
 * Ranks, worlds, hints, achievements, cosmetics, and reward constants.
 */

export const RANKS = [
  { id: 'rookie', name: 'Reading Rookie', icon: '🌱', xpRequired: 0 },
  { id: 'explorer', name: 'Story Explorer', icon: '🗺️', xpRequired: 100 },
  { id: 'detective', name: 'Word Detective', icon: '🔍', xpRequired: 250 },
  { id: 'hunter', name: 'Chapter Hunter', icon: '🏹', xpRequired: 500 },
  { id: 'scholar', name: 'Reading Scholar', icon: '📖', xpRequired: 850 },
  { id: 'master', name: 'Master Reader', icon: '⭐', xpRequired: 1300 },
  { id: 'legendary', name: 'Legendary Reader', icon: '👑', xpRequired: 2000 },
];

export const WORLDS = [
  {
    id: 'forest',
    name: 'Forest Library',
    icon: '🌲',
    description: 'Ancient trees hold magical storybooks. Perfect for beginning readers!',
    unlockRank: 'rookie',
    baseDifficulty: 1,
    themeClass: 'world-forest',
    bgGradient: 'linear-gradient(135deg, #00b894, #55efc4, #81ecec)',
    levelsToUnlock: 0,
  },
  {
    id: 'pirate',
    name: 'Pirate Cove',
    icon: '🏴‍☠️',
    description: 'Treasure maps and sea tales await brave word hunters!',
    unlockRank: 'explorer',
    baseDifficulty: 2,
    themeClass: 'world-pirate',
    bgGradient: 'linear-gradient(135deg, #0984e3, #74b9ff, #a29bfe)',
    levelsToUnlock: 3,
  },
  {
    id: 'space',
    name: 'Space Station',
    icon: '🚀',
    description: 'Read cosmic stories among the stars and distant planets!',
    unlockRank: 'detective',
    baseDifficulty: 3,
    themeClass: 'world-space',
    bgGradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe, #fd79a8)',
    levelsToUnlock: 6,
  },
  {
    id: 'castle',
    name: 'Castle Archives',
    icon: '🏰',
    description: 'Royal scrolls and legendary tales fill the grand library halls.',
    unlockRank: 'hunter',
    baseDifficulty: 4,
    themeClass: 'world-castle',
    bgGradient: 'linear-gradient(135deg, #e17055, #fab1a0, #fdcb6e)',
    levelsToUnlock: 10,
  },
  {
    id: 'time',
    name: 'Time Machine Lab',
    icon: '⏰',
    description: 'Journey through history with advanced reading challenges!',
    unlockRank: 'scholar',
    baseDifficulty: 5,
    themeClass: 'world-time',
    bgGradient: 'linear-gradient(135deg, #fdcb6e, #ffeaa7, #55efc4)',
    levelsToUnlock: 15,
  },
];

export const HINT_TYPES = [
  {
    id: 'small',
    name: 'Small Hint',
    cost: 10,
    description: 'A gentle nudge in the right direction.',
  },
  {
    id: 'medium',
    name: 'Medium Hint',
    cost: 20,
    description: 'Narrows down your choices.',
  },
  {
    id: 'major',
    name: 'Major Hint',
    cost: 35,
    description: 'Strong help to guide you.',
  },
  {
    id: 'sentence',
    name: 'Key Sentence',
    cost: 50,
    description: 'Highlights the evidence in the passage.',
  },
  {
    id: 'reveal',
    name: 'Reveal Answer',
    cost: 85,
    description: 'Emergency help — shows the correct answer.',
  },
];

export const MAX_HINTS_PER_LEVEL = 3;

/** Coin rewards */
export const REWARDS = {
  CORRECT_ANSWER: 5,
  STREAK_3_BONUS: 10,
  STREAK_5_BONUS: 20,
  PASSAGE_COMPLETE_MIN: 25,
  PASSAGE_COMPLETE_MAX: 50,
  PERFECT_LEVEL_BONUS: 30,
  XP_PER_CORRECT: 15,
  XP_LEVEL_COMPLETE: 25,
  XP_PERFECT_BONUS: 40,
};

/** Adaptive difficulty thresholds */
export const ADAPTIVE = {
  MASTERY_ACCURACY: 80,
  STRUGGLE_ACCURACY: 60,
  CORRECT_FOR_MASTERY: 4,
  MAX_DIFFICULTY: 5,
  MIN_DIFFICULTY: 1,
};

export const QUESTION_TYPES = {
  word: 'Word Reading',
  sentence: 'Sentence Reading',
  passage: 'Short Passage',
  context: 'Context Clues',
  detective: 'Reading Detective',
  inference: 'Inference Challenge',
};

export const ACHIEVEMENTS = [
  {
    id: 'first_level',
    name: 'First Steps',
    icon: '🎉',
    description: 'Complete your first reading level.',
    check: (p) => p.levelsCompleted >= 1,
  },
  {
    id: 'streak_5',
    name: 'Reading Streak',
    icon: '🔥',
    description: 'Get 5 correct answers in a row.',
    check: (p) => p.bestStreak >= 5,
  },
  {
    id: 'streak_10',
    name: 'On Fire!',
    icon: '💥',
    description: 'Reach a 10 answer streak.',
    check: (p) => p.bestStreak >= 10,
  },
  {
    id: 'coin_100',
    name: 'Coin Collector',
    icon: '🪙',
    description: 'Earn 100 total coins.',
    check: (p) => p.totalCoinsEarned >= 100,
  },
  {
    id: 'coin_500',
    name: 'Treasure Hunter',
    icon: '💰',
    description: 'Earn 500 total coins.',
    check: (p) => p.totalCoinsEarned >= 500,
  },
  {
    id: 'hint_saver',
    name: 'Hint Saver',
    icon: '🧠',
    description: 'Complete 5 levels without using hints.',
    check: (p) => p.noHintLevels >= 5,
  },
  {
    id: 'vocab_hero',
    name: 'Vocabulary Hero',
    icon: '📚',
    description: 'Answer 20 vocabulary questions correctly.',
    check: (p) => p.vocabCorrect >= 20,
  },
  {
    id: 'story_champion',
    name: 'Story Champion',
    icon: '🏆',
    description: 'Complete 10 reading levels.',
    check: (p) => p.levelsCompleted >= 10,
  },
  {
    id: 'perfect_level',
    name: 'Perfect Reader',
    icon: '✨',
    description: 'Get 100% on a level.',
    check: (p) => p.perfectLevels >= 1,
  },
  {
    id: 'world_explorer',
    name: 'World Explorer',
    icon: '🌍',
    description: 'Unlock 3 adventure worlds.',
    check: (p) => p.worldsUnlocked.length >= 3,
  },
  {
    id: 'rank_master',
    name: 'Rising Star',
    icon: '⭐',
    description: 'Reach Master Reader rank.',
    check: (p) => {
      const rankIndex = RANKS.findIndex((r) => r.id === p.rankId);
      return rankIndex >= RANKS.findIndex((r) => r.id === 'master');
    },
  },
  {
    id: 'legendary',
    name: 'Legendary Status',
    icon: '👑',
    description: 'Become a Legendary Reader!',
    check: (p) => p.rankId === 'legendary',
  },
];

export const COSMETICS = [
  { id: 'avatar_wizard', name: 'Wizard', type: 'avatar', icon: '🧙', price: 50 },
  { id: 'avatar_astronaut', name: 'Astronaut', type: 'avatar', icon: '👨‍🚀', price: 75 },
  { id: 'avatar_pirate', name: 'Pirate', type: 'avatar', icon: '🏴‍☠️', price: 60 },
  { id: 'avatar_robot', name: 'Robot', type: 'avatar', icon: '🤖', price: 80 },
  { id: 'hat_crown', name: 'Royal Crown', type: 'hat', icon: '👑', price: 100 },
  { id: 'hat_wizard', name: 'Wizard Hat', type: 'hat', icon: '🎩', price: 45 },
  { id: 'hat_party', name: 'Party Hat', type: 'hat', icon: '🎉', price: 30 },
  { id: 'pet_dragon', name: 'Baby Dragon', type: 'pet', icon: '🐉', price: 120 },
  { id: 'pet_cat', name: 'Reading Cat', type: 'pet', icon: '🐱', price: 55 },
  { id: 'pet_owl', name: 'Wise Owl', type: 'pet', icon: '🦉', price: 65 },
  { id: 'badge_star', name: 'Star Badge', type: 'badge', icon: '⭐', price: 40 },
  { id: 'badge_heart', name: 'Heart Badge', type: 'badge', icon: '💖', price: 35 },
  { id: 'bg_rainbow', name: 'Rainbow Sky', type: 'background', icon: '🌈', price: 90 },
  { id: 'bg_night', name: 'Starry Night', type: 'background', icon: '🌙', price: 70 },
  { id: 'effect_sparkle', name: 'Sparkle Effect', type: 'effect', icon: '✨', price: 85 },
  { id: 'effect_rainbow', name: 'Rainbow Trail', type: 'effect', icon: '🌈', price: 95 },
];

export const DEFAULT_PROFILE = {
  name: '',
  rankId: 'rookie',
  xp: 0,
  coins: 50,
  totalCoinsEarned: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  currentStreak: 0,
  bestStreak: 0,
  worldsUnlocked: ['forest'],
  worldProgress: {},
  cosmeticsOwned: [],
  equipped: { avatar: '🧒', hat: '', pet: '', badge: '', background: '', effect: '' },
  achievements: [],
  levelsCompleted: 0,
  perfectLevels: 0,
  noHintLevels: 0,
  vocabCorrect: 0,
  currentNoHintStreak: 0,
  muted: false,
  createdAt: null,
};

/** Get rank info for a given XP total */
export function getRankForXP(xp) {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.xpRequired) current = rank;
  }
  return current;
}

/** XP needed for next rank (null if max rank) */
export function getNextRankXP(xp) {
  const current = getRankForXP(xp);
  const idx = RANKS.findIndex((r) => r.id === current.id);
  if (idx >= RANKS.length - 1) return null;
  return RANKS[idx + 1].xpRequired;
}

/** Progress percentage toward next rank */
export function getRankProgress(xp) {
  const current = getRankForXP(xp);
  const nextXP = getNextRankXP(xp);
  if (nextXP === null) return 100;
  const range = nextXP - current.xpRequired;
  const progress = xp - current.xpRequired;
  return Math.min(100, Math.round((progress / range) * 100));
}

/** Check if a world is unlocked for a profile */
export function isWorldUnlocked(world, profile) {
  if (profile.worldsUnlocked.includes(world.id)) return true;
  const requiredRank = RANKS.find((r) => r.id === world.unlockRank);
  const playerRank = RANKS.find((r) => r.id === profile.rankId);
  const rankIdx = RANKS.indexOf(playerRank);
  const reqIdx = RANKS.indexOf(requiredRank);
  return rankIdx >= reqIdx && profile.levelsCompleted >= world.levelsToUnlock;
}

/** Difficulty label for display */
export function getDifficultyLabel(tier) {
  const labels = ['', 'Easy', 'Medium', 'Challenging', 'Advanced', 'Expert'];
  return labels[tier] || 'Easy';
}
