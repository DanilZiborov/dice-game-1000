import { array, boolean, maxLength, minLength, number, object, optional, pipe, string, trim } from 'valibot';
import type { InferOutput } from 'valibot';
import { PLAYER_NAME_MAXLENGTH, PLAYER_NAME_MINLENGTH } from 'shared/constants';

// В данные, которые лежат в базе, включаем только чистые значения. Всё, что можно посчитать (статусы на основе
// данных), считаем на фронте и в базу не записываем.

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

// Схема для валидации имени игрока

export const playerNameSchema = pipe(
  string(),
  trim(),
  minLength(PLAYER_NAME_MINLENGTH),
  maxLength(PLAYER_NAME_MAXLENGTH),
);

// Конфиг для записи нового игрока
export const playerConfigSchema = object({
  gameId: number(),
  name: playerNameSchema,
  score: number(),
  boltsNumber: number(),
  barrelAttempts: number(),
  isWinner: boolean(),
  log: array(string()),
  easyWinLog: pipe(array(number()), minLength(0), maxLength(3)),
});

// Статусы игрока. В базу не записываются, рассчитываются на фронте на основании данных
export const playerStatusSchema = object({
  isInPit: boolean(),
  isEnterGame: boolean(),
  isOnBarrel: boolean(),
});

export type PlayerStatus = InferOutput<typeof playerStatusSchema>;

export type PlayerConfig = InferOutput<typeof playerConfigSchema>;

// Игрок, получаемый из базы
export const playerSchemaDTO = object({
  id: number(),
  ...playerConfigSchema.entries,
});

// Игрок и его посчитанные статусы, используемые в приложении
export const playerSchema = object({
  data: playerSchemaDTO,
  status: playerStatusSchema,
});

export type PlayerDTO = InferOutput<typeof playerSchemaDTO>;
export type Player = InferOutput<typeof playerSchema>;

// Игра, получаемая из базы
export const gameSchema = object({
  id: number(),
  ...newGameConfigSchema.entries,
  started: string(),
  ended: optional(string()),
});

export type Game = InferOutput<typeof gameSchema>;
