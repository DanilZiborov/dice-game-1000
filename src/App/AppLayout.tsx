import { type JSX, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { Header } from './AppLayout/Header';

export const AppLayout = (): JSX.Element => {
  const { pathname } = useLocation();

  const isGame = pathname.includes('game');

  const maxWidth = useMemo(() => (isGame ? 'max-w-[600px]' : 'max-w-[1000px]'), [isGame]);

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
      <Header maxWidth={maxWidth} />
      <main className={clsx('mt-[50px] h-full w-full transition-all duration-500', !isGame && 'p-2', maxWidth)}>
        <Outlet />
      </main>
    </div>
  );
};
