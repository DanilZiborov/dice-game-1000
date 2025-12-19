import { STORE_PLAYERS } from '../constants';
import { awaitRequest, getObjectStore } from '../utils';
import type { Player } from '../../shared/types';

/**
 * Получаем всех игроков
 */
export const getAllPlayers = async (db: IDBDatabase): Promise<Player[]> => {
  const store = getObjectStore(db, STORE_PLAYERS, 'readonly');

  return await awaitRequest(store.getAll());
};
