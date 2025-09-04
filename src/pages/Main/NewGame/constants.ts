import type { GameConfig } from 'pages/Main/NewGame/types';

export const MIN_MAX_GAME_CONFIGS = {
  enterLimit: { min: 0, max: 100 },
  barrelLimit: { min: 850, max: 900 },
  boltsLimit: { min: 25, max: 100 },
  overtakeLimit: { min: 25, max: 100 },
} as const;

export const DEFAULT_NEW_GAME_CONFIG: GameConfig = {
  enterLimit: 75,
  barrelLimit: 900,
  withBolts: false,
  boltsLimit: 50,
  withOvertake: false,
  overtakeLimit: 50,
  withEasyWin: false,
  pit200: false,
  pit700: false,
  truck: false,
} as const;
