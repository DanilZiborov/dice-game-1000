import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Шапка с бургер-меню */}
      <header className="flex flex-row justify-between p-4">
        <button className="focus:outline-none">
          {/* Бургер-меню: три полоски жёлтого цвета с неоновым эффектом */}
          <div className="mb-1.5 h-1 w-8 bg-yellow-300 shadow-lg"></div>
          <div className="mb-1.5 h-1 w-8 bg-yellow-300 shadow-lg"></div>
          <div className="h-1 w-8 bg-yellow-300 shadow-lg"></div>
        </button>
        <p>журнал не загружен</p>
      </header>

      <div className="border border-yellow-300"></div>

      {/* Основной контент */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
