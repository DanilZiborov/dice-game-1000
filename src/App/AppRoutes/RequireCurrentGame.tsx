import { Navigate, Outlet } from 'react-router-dom';
import type { JSX } from 'react';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';

// защищает роуты, которые требуют наличия текущей игры в контексте
export const RequireCurrentGame = (): JSX.Element => {
  const {
    state: { game, players },
  } = useCurrentGame();

  const isGameActive = !!game && !!players.length;

  if (!isGameActive) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
