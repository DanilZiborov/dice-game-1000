import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initDB } from 'db/index';

import type { JSX } from 'react';

const DbContext = createContext<IDBDatabase | null>(null);

export const DbProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    const openDb = async (): Promise<void> => {
      try {
        const database = await initDB();
        setDb(database);
        console.log('DB initialized');
      } catch (err) {
        console.error('Ошибка при открытии базы', err);
      }
    };

    void openDb();
  }, []);

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};

// Хук для получения db из контекста
export const useDb = (): IDBDatabase => {
  const db = useContext(DbContext);
  if (!db) throw new Error('DB ещё не инициализирована');

  return db;
};
