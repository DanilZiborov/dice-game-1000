import type { NewGameConfig } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';

type AddGameArgs = {
  db: IDBDatabase;
  gameConfig: NewGameConfig;
};

export const addGame = async ({ db, gameConfig }: AddGameArgs): Promise<number> => {
  const tx = db.transaction(STORE_GAMES, 'readwrite');
  const store = tx.objectStore(STORE_GAMES);

  const request = store.add({
    ...gameConfig,
    started: new Date().toISOString(),
    ended: undefined,
  });

  return await awaitRequest(request as IDBRequest<number>);
};
