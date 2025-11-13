import { Outlet, useNavigate } from 'react-router-dom';
import { type JSX, useEffect, useState } from 'react';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useDb } from '../db/DbContext';
import { getCurrentGame, getPlayersByGameId } from '../db/operations';

export const GameAppWrapper = (): JSX.Element => {
  const db = useDb();

  const navigate = useNavigate();

  const { dispatch } = useCurrentGame();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async (): Promise<void> => {
      const currentGame = await getCurrentGame({ db });

      if (!currentGame) {
        setIsLoading(false);

        return;
      }

      const currentPlayers = await getPlayersByGameId({
        db,
        gameId: currentGame.id,
      });

      dispatch({ type: 'SET_GAME', payload: currentGame });
      dispatch({ type: 'SET_PLAYERS', payload: currentPlayers });

      setIsLoading(false);
    };

    void init();
  }, [db, dispatch, navigate]);

  if (isLoading) return <p className="font-app">Загрузка...</p>;

  return (
    <div className="h-full font-app">
      {' '}
      <Outlet />
    </div>
  );
};
