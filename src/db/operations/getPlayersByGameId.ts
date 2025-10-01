import type { Player } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';
import { getObjectStore } from 'db/utils/getObjectSotre';
import { throwAssertedError } from 'shared/utils/throwAssertedError';

type GetPlayersByGameIdArgs = {
  db: IDBDatabase;
  gameId: IDBValidKey;
};

export const getPlayersByGameId = async ({ db, gameId }: GetPlayersByGameIdArgs): Promise<Player[]> => {
  const store = getObjectStore(db, STORE_PLAYERS, 'readonly');

  try {
    const index = store.index('gameId');

    return await awaitRequest<Player[]>(index.getAll(gameId));
  } catch (err: unknown) {
    throwAssertedError(err, `Ошибка при получении игроков для игры с id=${gameId}`);
  }
};
