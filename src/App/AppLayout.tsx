import type { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useEffect } from 'react';

export const AppLayout = (): JSX.Element => {
  const { pathname } = useLocation();

  const isApp = pathname.includes('app');

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
        'font-cyber bg-cyber-background text-cyber-text flex flex-col items-center',
        'h-[var(--app-height)]',
      )}
    >
      <div
        className={clsx(
          'h-full w-full text-white transition-all duration-500',
          isApp ? 'max-w-[600px]' : 'max-w-[1200px]',
        )}
      >
        <header className="flex flex-row justify-between p-4">
          <button className="focus:outline-none">
            <div className="bg-cyber-secondary mb-1.5 h-0.5 w-6 shadow-lg"></div>
            <div className="bg-cyber-secondary mb-1.5 h-0.5 w-6 shadow-lg"></div>
            <div className="bg-cyber-secondary h-0.5 w-6 shadow-lg"></div>
          </button>
        </header>

        <div className="border-cyber-secondary border-1"></div>

        <main className="select-none" style={{ height: 'calc(var(--app-height) - 58px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
