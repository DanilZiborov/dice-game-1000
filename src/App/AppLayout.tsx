import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout = (): JSX.Element => {
  return (
    <div className="h-screen bg-black text-white">
      {/* Шапка с бургер-меню */}
      <header className="flex flex-row justify-between p-4">
        <button className="focus:outline-none">
          {/* Бургер-меню: три полоски жёлтого цвета с неоновым эффектом */}
          <div className="bg-cyber-yellow mb-1.5 h-1 w-8 shadow-lg"></div>
          <div className="bg-cyber-yellow mb-1.5 h-1 w-8 shadow-lg"></div>
          <div className="bg-cyber-yellow h-1 w-8 shadow-lg"></div>
        </button>
        <p>журнал не загружен</p>
      </header>

      <div className="border-cyber-yellow border"></div>

      {/* Основной контент */}
      <main className="h-[calc(100vh_-_58px)] p-4">
        <Outlet />
      </main>
    </div>
  );
};
