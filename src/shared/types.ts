import { array, boolean, number, object, optional, string } from 'valibot';
import type { InferOutput } from 'valibot';

// Конфиг для создания игроков
export const newPlayerConfigSchema = array(string());

export type NewPlayerConfig = InferOutput<typeof newPlayerConfigSchema>;

// Конфиг для создания новой партии
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

// Игрок, получаемый из базы
export const playerSchema = object({
  id: number(),
  gameId: number(),
  name: string(),
  score: number(),
  boltsNumber: number(),
  barrelAttempts: number(),
  isInPit: boolean(),
  isWinner: boolean(),
  log: array(string()),
});

export type Player = InferOutput<typeof playerSchema>;

// Игра, получаемая из базы
export const gameSchema = object({
  id: number(),
  ...newGameConfigSchema.entries,
  started: string(),
  ended: optional(string()),
});

export type Game = InferOutput<typeof gameSchema>;
