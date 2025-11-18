import { STORE_PLAYERS } from '../constants';
import { awaitRequest, getObjectStore } from '../utils';

/**
 * Получаем всех игроков
 */
export const getAllPlayers = async (db: IDBDatabase): Promise<unknown[]> => {
  const store = getObjectStore(db, STORE_PLAYERS, 'readonly');

  return await awaitRequest(store.getAll());
};
