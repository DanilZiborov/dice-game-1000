import { STORE_GAMES } from 'db/constants';
import { awaitRequest, getObjectStore } from 'db/utils';
import { throwAssertedError } from 'shared/utils';

type RemoveGamesArgs = {
  db: IDBDatabase;
  gameIds: IDBValidKey[];
};

/**
 * Удаляет игры из indexedDB по списку их ID
 * @param db - экземпляр IDBDatabase
 * @param gameIds - массив ID игр, которые нужно удалить
 * @returns Promise<void>
 */
export const deleteGames = async ({ db, gameIds }: RemoveGamesArgs): Promise<void> => {
  if (!gameIds.length) {
    return;
  }

  const store = getObjectStore(db, STORE_GAMES, 'readwrite');

  try {
    for (const id of gameIds) {
      await awaitRequest(store.delete(id));
    }
  } catch (err) {
    throwAssertedError(err, 'Ошибка при удалении игр');
  }
};
