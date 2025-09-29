import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import type { Game, Player } from 'shared/types';
import { NewGame } from 'pages/Main/NewGame';
import { useDb } from 'db/DbContext';
import { getCurrentGame } from 'db/operations/getCurrentGame';
import { getPlayersByGameId } from 'db/operations/getPlayersByGameId';
import { CurrentGame } from 'pages/Main/CurrentGame/CurrentGame';

export const Main = (): JSX.Element => {
  const db = useDb();

  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);

  const handleGameStarted = ({ game, players }: { game: Game; players: Player[] }): void => {
    setCurrentGame(game);
    setCurrentPlayers(players);
  };

  useEffect(() => {
    if (!db) return;

    const init = async (): Promise<void> => {
      try {
        const game = await getCurrentGame({ db });

        if (!game) return;

        setCurrentGame(game);

        const players = await getPlayersByGameId({
          db,
          gameId: game.id,
        });

        setCurrentPlayers(players);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Возникла ошибка при поиске текущей партии', error);
      }
    };

    void init();
  }, [db]);

  if (currentGame) {
    return <CurrentGame game={currentGame} players={currentPlayers} />;
  }

  return <NewGame onGameStarted={handleGameStarted} />;
};
