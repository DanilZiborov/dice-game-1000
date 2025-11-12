import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { getFormattedDateString } from 'shared/utils/getFormattedDateString';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useEffect } from 'react';

export const AppLayout = (): JSX.Element => {
  const {
    state: { game },
  } = useCurrentGame();

  // Устанавливаем CSS-переменную --app-height на реальную высоту окна
  useEffect(() => {
    const setAppHeight = (): void => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);

    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return (
    <div
      className={clsx(
        'font-cyber bg-cyber-background text-cyber-text flex flex-col items-center overflow-hidden',
        'h-[var(--app-height)]',
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

        <main
          className="align-center flex flex-col justify-center select-none"
          style={{ height: 'calc(var(--app-height) - 58px)' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
