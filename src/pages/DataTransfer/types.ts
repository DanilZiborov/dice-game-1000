import { type InferOutput, object, string } from 'valibot';
import { array } from 'valibot';
import { gameSchema, playerSchema } from '../../shared/types';

export const backupDBShema = object({
  games: array(gameSchema),
  players: array(playerSchema),
  exportedAt: string(),
});

export type BackupDB = InferOutput<typeof backupDBShema>;
