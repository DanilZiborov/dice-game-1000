import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { getFormattedDateString } from 'shared/utils/getFormattedDateString';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';

export const AppLayout = (): JSX.Element => {
  const {
    state: { game },
  } = useCurrentGame();

  return (
    <div
      className={clsx(
        'font-cyber bg-cyber-background text-cyber-text flex h-screen flex-col',
        'items-center overflow-hidden',
      )}
    >
      <div className="h-full w-full max-w-[600px] text-white">
        <header className="flex flex-row justify-between p-4">
          <button className="focus:outline-none">
            <div className="bg-cyber-secondary mb-1.5 h-0.5 w-6 shadow-lg"></div>
            <div className="bg-cyber-secondary mb-1.5 h-0.5 w-6 shadow-lg"></div>
            <div className="bg-cyber-secondary h-0.5 w-6 shadow-lg"></div>
          </button>
          {game && (
            <div className="text-cyber-text-secondary text-xs">
              партия началась {getFormattedDateString(new Date(game.started))}
            </div>
          )}
        </header>

        <div className="border-cyber-secondary border-1"></div>

        <main className="align-center flex h-[calc(100vh_-_58px)] flex-col justify-center select-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
