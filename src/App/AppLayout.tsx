import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';

export const AppLayout = (): JSX.Element => {
  return (
    <div
      className={clsx(
        'font-cyber bg-cyber-background text-cyber-text flex h-screen flex-col',
        'items-center',
      )}
    >
      <div className="h-full w-full max-w-[900px] text-white">
        <header className="flex flex-row justify-between p-4">
          <button className="focus:outline-none">
            <div className="bg-cyber-secondary mb-1.5 h-1 w-8 shadow-lg"></div>
            <div className="bg-cyber-secondary mb-1.5 h-1 w-8 shadow-lg"></div>
            <div className="bg-cyber-secondary h-1 w-8 shadow-lg"></div>
          </button>
          <p className="font-cyber">журнал не загружен</p>
        </header>

        <div className="border-cyber-secondary border"></div>

        <main className="h-[calc(100vh_-_58px)] p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
