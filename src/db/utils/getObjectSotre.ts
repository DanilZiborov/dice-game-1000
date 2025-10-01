import { throwAssertedError } from 'shared/utils/throwAssertedError';

export const getObjectStore = (
  db: IDBDatabase,
  storeName: string,
  mode: IDBTransactionMode = 'readonly',
): IDBObjectStore => {
  try {
    const tx = db.transaction(storeName, mode);

    return tx.objectStore(storeName);
  } catch (err) {
    throwAssertedError(err, 'Ошибка обработки транзакции IndexedDB');

    return undefined as never;
  }
};
