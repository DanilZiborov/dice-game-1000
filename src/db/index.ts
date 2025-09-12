import { awaitRequest } from 'db/utils/awaitRequest';
import { DB_NAME, DB_VERSION, PLAYER_INDEXES, STORE_GAMES, STORE_PLAYERS } from './constants';

export const initDB = async (): Promise<IDBDatabase> => {
  // открываем IndexedDB
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  // onupgradeneeded всё равно остаётся, потому что это событие синхронное при апгрейде
  request.onupgradeneeded = () => {
    console.log(`Создание БД ${DB_NAME}`);
    const db = request.result;

    if (!db.objectStoreNames.contains(STORE_GAMES)) {
      db.createObjectStore(STORE_GAMES, { keyPath: 'id', autoIncrement: true });
    }

    if (!db.objectStoreNames.contains(STORE_PLAYERS)) {
      const store = db.createObjectStore(STORE_PLAYERS, { keyPath: 'id', autoIncrement: true });
      store.createIndex(PLAYER_INDEXES.GAME_ID, PLAYER_INDEXES.GAME_ID, { unique: false });
      store.createIndex(PLAYER_INDEXES.NAME, PLAYER_INDEXES.NAME, { unique: false });
    }
  };

  // ждём завершения открытия базы через промис
  return await awaitRequest<IDBDatabase>(request);
};
