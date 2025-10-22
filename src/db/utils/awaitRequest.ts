/**
 * Превращает любой IDBRequest в промис для использования с async/await
 */
export const awaitRequest = <T>(request: IDBRequest<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    console.log('обращение в базу');
    console.log(request.transaction?.mode, JSON.stringify(request.transaction?.objectStoreNames));
    const req = request;
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
};
