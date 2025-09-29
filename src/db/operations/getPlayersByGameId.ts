import type { Player } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';

type GetPlayersByGameIdArgs = {
  db: IDBDatabase;
  gameId: number;
};

export const getPlayersByGameId = async ({ db, gameId }: GetPlayersByGameIdArgs): Promise<Player[]> => {
  const tx = db.transaction(STORE_PLAYERS, 'readonly');
  const store = tx.objectStore(STORE_PLAYERS);
  const index = store.index('gameId');

  const request = index.getAll(gameId);

  return await awaitRequest<Player[]>(request);
};
