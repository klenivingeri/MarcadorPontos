export const XP_POINT_REWARDS = {
  1: 4,
  3: 14,
  6: 28,
  9: 44,
  12: 62,
};

export const XP_SET_WIN_BY_MODE = {
  1: 45,
  3: 70,
  5: 95,
};

export const XP_MATCH_WIN_BONUS = 90;

export const XP_LEVEL_BASE = 100;
export const XP_LEVEL_EXPONENT = 1.5;

export const getPointXpReward = (value) =>
  XP_POINT_REWARDS[value] || XP_POINT_REWARDS[1];

export const getSetXpReward = (maxRounds) => {
  const normalizedRounds = [1, 3, 5].includes(maxRounds) ? maxRounds : 3;
  return XP_SET_WIN_BY_MODE[normalizedRounds] || XP_SET_WIN_BY_MODE[3];
};