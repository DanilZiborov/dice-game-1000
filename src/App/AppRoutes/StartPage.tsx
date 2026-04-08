import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';

const isPWA = (): boolean => {
  // iOS Safari — проверяем наличие standalone через "in", чтобы TS не ругался
  if ('standalone' in window.navigator && window.navigator.standalone) return true;

  // Остальные браузеры
  return window.matchMedia('(display-mode: standalone)').matches;
};

export const StartPage = (): JSX.Element => {
  const pwa = isPWA();

  return <Navigate to={pwa ? '/app/game' : '/landing'} replace />;
};
