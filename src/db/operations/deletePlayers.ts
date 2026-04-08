import { STORE_PLAYERS } from 'db/constants';
import { awaitRequest, getObjectStore } from 'db/utils';
import { throwAssertedError } from 'shared/utils';

type RemovePlayersArgs = {
  db: IDBDatabase;
  playerIds: IDBValidKey[];
};

/**
 * Удаляет игроков из indexedDB по списку их ID
 * @param db - экземпляр IDBDatabase
 * @param playerIds - массив ID игроков, которых нужно удалить
 * @returns Promise<void>
 */
export const deletePlayers = async ({ db, playerIds }: RemovePlayersArgs): Promise<void> => {
  if (!playerIds.length) {
    return;
  }

  const store = getObjectStore(db, STORE_PLAYERS, 'readwrite');

  try {
    for (const id of playerIds) {
      await awaitRequest(store.delete(id));
    }
  } catch (err) {
    throwAssertedError(err, 'Ошибка при удалении игроков');
  }
};
