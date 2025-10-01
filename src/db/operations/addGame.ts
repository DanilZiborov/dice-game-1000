import type { NewGameConfig } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';
import { getObjectStore } from 'db/utils/getObjectSotre';
import { throwAssertedError } from 'shared/utils/throwAssertedError';

type AddGameArgs = {
  db: IDBDatabase;
  gameConfig: NewGameConfig;
};

export const addGame = async ({ db, gameConfig }: AddGameArgs): Promise<IDBValidKey> => {
  const store = getObjectStore(db, STORE_GAMES, 'readwrite');

  try {
    return await awaitRequest<IDBValidKey>(
      store.add({
        ...gameConfig,
        started: new Date().toISOString(),
        ended: undefined,
      }),
    );
  } catch (err) {
    throwAssertedError(err, 'Ошибка при создании игры');

    return undefined as never;
  }
};
