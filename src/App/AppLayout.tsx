import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { getFormattedDateString } from 'shared/utils/getFormattedDateString';
import { getCurrentGame } from 'db/operations';
import { useDb } from 'db/DbContext';
import type { Game } from 'shared/types';
import { useEffect, useState } from 'react';

export const AppLayout = (): JSX.Element => {
  const db = useDb();

  const [currentGame, setCurrentGame] = useState<null | Game>(null);

  useEffect(() => {
    getCurrentGame({ db }).then((game) => setCurrentGame(game));
  }, [db]);

  return (
    <div
      className={clsx(
        'font-cyber bg-cyber-background text-cyber-text flex h-screen flex-col',
        'items-center overflow-hidden',
      )}
    >
      <div className="h-full w-full max-w-[900px] text-white">
        <header className="flex flex-row justify-between p-4">
          <button className="focus:outline-none">
            <div className="bg-cyber-secondary mb-1.5 h-0.5 w-6 shadow-lg"></div>
            <div className="bg-cyber-secondary mb-1.5 h-0.5 w-6 shadow-lg"></div>
            <div className="bg-cyber-secondary h-0.5 w-6 shadow-lg"></div>
          </button>
          {currentGame && (
            <div className="text-cyber-text-secondary text-xs">
              партия началась {getFormattedDateString(new Date(currentGame.started))}
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
