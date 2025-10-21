import type { JSX } from 'react';
import { useLayoutEffect, useState } from 'react';
import { PlayersList } from 'pages/CurrentGame/PlayersList';
import { Record } from 'pages/CurrentGame/Record/Record';
import type { Game, Player } from 'shared/types';
import { useDb } from 'db/DbContext';
import { getCurrentGame, getPlayersByGameId } from 'db/operations';
import { useNavigate } from 'react-router-dom';

export const CurrentGame = (): JSX.Element => {
  const db = useDb();

  const navigate = useNavigate();

  const [isRecordMode, setIsRecordMode] = useState(false);

  const [game, setGame] = useState<Game | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  console.log(game);

  useLayoutEffect(() => {
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

      setGame(currentGame);

      setPlayers(currentPlayers);
    };

    void init();
  }, [db, navigate]);

  return (
    <div className="align-center flex h-full flex-col justify-center select-none">
      {isRecordMode ? (
        <Record disableRecordMode={() => setIsRecordMode(false)} />
      ) : (
        <PlayersList players={players} enableRecordMode={() => setIsRecordMode(true)} />
      )}
    </div>
  );
};

// TODO: переписать всё-таки через роутер, чтобы работала навигация по тапу на кнопку назад
