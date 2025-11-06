import {
  array,
  boolean,
  maxLength,
  maxValue,
  minLength,
  number,
  object,
  optional,
  pipe,
  string,
  trim,
  intersect,
} from 'valibot';
import type { InferOutput } from 'valibot';
import { MAX_BOLTS, MAX_EASY_WIN_ATTEMPTS, PLAYER_NAME_MAXLENGTH, PLAYER_NAME_MINLENGTH } from 'shared/constants';

// Конфиг новой партии
export const newGameConfigSchema = object({
  enterLimit: number(),
  barrelLimit: number(),
  withBolts: boolean(),
  withOvertake: boolean(),
  boltsLimit: number(),
  pit200: boolean(),
  pit700: boolean(),
  overtakeLimit: number(),
  truck: boolean(),
  withEasyWin: boolean(),
});

export type NewGameConfig = InferOutput<typeof newGameConfigSchema>;

// Имя игрока
export const playerNameSchema = pipe(
  string(),
  trim(),
  minLength(PLAYER_NAME_MINLENGTH),
  maxLength(PLAYER_NAME_MAXLENGTH),
);

// Конфиг игрока
export const playerConfigSchema = object({
  gameId: number(),
  name: playerNameSchema,
  score: number(),
  boltsNumber: pipe(number(), maxValue(MAX_BOLTS)),
  failsNumber: number(),
  isWinner: boolean(),
  isEnterGame: boolean(),
  log: array(number()),
  easyWinLog: pipe(array(number()), minLength(0), maxLength(MAX_EASY_WIN_ATTEMPTS)),
});

export type PlayerConfig = InferOutput<typeof playerConfigSchema>;

// Игрок из базы
export const playerSchema = intersect([
  playerConfigSchema,
  object({
    id: number(),
  }),
]);

export type Player = InferOutput<typeof playerSchema>;

// Игра из базы
export const gameSchema = intersect([
  newGameConfigSchema,
  object({
    id: number(),
    started: string(),
    ended: optional(string()),
  }),
]);

export type Game = InferOutput<typeof gameSchema>;

export type PlayerStatus = {
  isInPit: boolean;
  pitPointsLeft: number | null;
  isOnBarrel: boolean;
  barrelPointsLeft: number | null;
};
