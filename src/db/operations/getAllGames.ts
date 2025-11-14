import { awaitRequest, getObjectStore } from '../utils';
import { STORE_GAMES } from '../constants';
import type { Game } from '../../shared/types';

/**
 * Получаем все игры
 */
export const getAllGames = async (db: IDBDatabase): Promise<Game[]> => {
  const store = getObjectStore(db, STORE_GAMES, 'readonly');

  return await awaitRequest(store.getAll());
};
