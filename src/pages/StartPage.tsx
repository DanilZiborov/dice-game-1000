import { type JSX, useEffect } from 'react';
import { useDb } from 'db/DbContext';
import { useNavigate } from 'react-router-dom';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { getCurrentGame, getPlayersByGameId } from 'db/operations';

export const StartPage = (): JSX.Element => {
  const db = useDb();

  const navigate = useNavigate();

  const { dispatch } = useCurrentGame();

  useEffect(() => {
    const init = async (): Promise<void> => {
      const currentGame = await getCurrentGame({ db });

      if (!currentGame) {
        navigate('/new-game', { replace: true });

        return;
      }

      const currentPlayers = await getPlayersByGameId({
        db,
        gameId: currentGame.id,
      });

      dispatch({ type: 'SET_GAME', payload: currentGame });
      dispatch({ type: 'SET_PLAYERS', payload: currentPlayers });

      navigate('/game', { replace: true });
    };

    void init();
  }, [db, dispatch, navigate]);

  return <p>Стартовая страница, загрузка</p>;
};
