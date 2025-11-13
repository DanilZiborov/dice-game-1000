import type { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useEffect } from 'react';

export const AppLayout = (): JSX.Element => {
  const { pathname } = useLocation();

  const isApp = pathname.includes('app');

  const maxWidth = isApp ? 'max-w-[600px]' : 'max-w-[1200px]';

  // CSS переменная для полной высоты окна
  useEffect(() => {
    const setAppHeight = (): void => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);

    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return (
    <div className={clsx('flex flex-col items-center bg-cyber-background text-cyber-text', 'h-[var(--app-height)]')}>
      <div className="fixed top-0 left-0 z-10 flex h-[50px] w-full justify-center transition-all duration-500">
        <div className={clsx(maxWidth, 'w-full')}>
          <header className="flex flex-row justify-between bg-cyber-background p-4">
            <button className="focus:outline-none">
              <div className="mb-1.5 h-0.5 w-6 bg-cyber-secondary shadow-lg"></div>
              <div className="mb-1.5 h-0.5 w-6 bg-cyber-secondary shadow-lg"></div>
              <div className="h-0.5 w-6 bg-cyber-secondary shadow-lg"></div>
            </button>
          </header>
          <div className="border-b border-cyber-secondary" />
        </div>
      </div>

      <main className={clsx('h-full w-full pt-[50px]', maxWidth)}>
        <Outlet />
      </main>
    </div>
  );
};
