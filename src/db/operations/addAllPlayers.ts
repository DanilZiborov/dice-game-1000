import { assertSchemaMatch } from 'shared/utils';
import { type Player, playerSchema } from 'shared/types';
import { STORE_PLAYERS } from '../constants';
import { awaitRequest } from '../utils';

/**
 * Полностью перезаписывает таблицу players
 */
export const addAllPlayers = async (db: IDBDatabase, players: Player[]): Promise<void> => {
  players.forEach((player) => assertSchemaMatch(playerSchema, player));

  const tx = db.transaction(STORE_PLAYERS, 'readwrite');
  const store = tx.objectStore(STORE_PLAYERS);

  // чистим store
  await awaitRequest(store.clear());

  // добавляем новые записи
  for (const player of players) {
    await awaitRequest(store.add(player));
  }
};
