import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentGame } from '../../context/currentGame/CurrentGameContext';

export const GameNav = (): JSX.Element => {
  const {
    state: { game },
  } = useCurrentGame();

  return <Navigate to={game ? '/app/game/current' : '/app/game/new'} />;
};
