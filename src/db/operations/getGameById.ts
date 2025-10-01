import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';
import { getObjectStore } from 'db/utils/getObjectSotre';
import { throwAssertedError } from 'shared/utils/throwAssertedError';

type GetGameArgs = {
  db: IDBDatabase;
  gameId: IDBValidKey;
};

export const getGameById = async ({ db, gameId }: GetGameArgs): Promise<Game | undefined> => {
  const store = getObjectStore(db, STORE_GAMES, 'readonly');

  try {
    return await awaitRequest<Game | undefined>(store.get(gameId));
  } catch (err: unknown) {
    throwAssertedError(err, `Ошибка при получении игры с id=${gameId}`);

    return undefined as never;
  }
};
