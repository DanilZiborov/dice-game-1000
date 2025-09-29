import { createContext, useContext, useState, useEffect } from 'react';
import { initDB } from 'db/index';
import type { JSX, ReactNode } from 'react';

const DbContext = createContext<IDBDatabase | null>(null);

export const DbProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    const openDb = async (): Promise<void> => {
      try {
        const database = await initDB();
        setDb(database);
        // eslint-disable-next-line no-console
        console.log('Успешная инициализация БД');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Ошибка при Инициализации', err);
      }
    };

    void openDb();
  }, []);

  // ждем инициализации базы, пока ничего не рендерим
  if (!db) {
    return <div className="flex h-full items-center justify-center">Загрузка базы данных...</div>;
  }

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};

// Хук для получения db из контекста
export const useDb = (): IDBDatabase => {
  const db = useContext(DbContext);
  if (!db) throw new Error('DB ещё не инициализирована');

  return db;
};
