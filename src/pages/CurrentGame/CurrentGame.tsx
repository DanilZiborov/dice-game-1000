import { clsx } from 'clsx';
import { Record } from 'pages/CurrentGame/Record/Record';
import { type JSX, useState } from 'react';
import { PlayerRow } from 'pages/CurrentGame/PlayerRow';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { Player } from 'shared/types';
import { endGame } from 'db/operations';
import { useDb } from 'db/DbContext';

export const CurrentGame = (): JSX.Element => {
  const db = useDb();
  const navigate = useNavigate();
  const {
    state: { players, game },
    dispatch,
  } = useCurrentGame();

  const { playerId } = useParams();
  const isRecordMode = !!playerId;

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSelectPlayer = (player: Player): void => {
    setSelectedPlayer(player);
    navigate(`/app/game/current/${player.id}`);
  };

  const handleEndGame = (): void => {
    if (!game) return;
    endGame({ db, gameId: game.id }).then(() => {
      dispatch({ type: 'SET_GAME', payload: null });
      navigate(`/finished/${game.id}#player-results`);
    });
  };

  if (!game) return <Navigate to="/app/game/new" />;

  return (
    <div className="flex h-full w-full flex-col">
      {/* Основной контент (скрывается в режиме записи) */}
      <div className={clsx(isRecordMode && 'hidden', 'flex h-full w-full flex-col')}>
        {/* Контейнер для списка игроков – занимает всё свободное место и центрирует содержимое */}
        <div className="flex flex-grow flex-col items-center justify-center overflow-hidden">
          <ul className="max-h-[80%] w-full overflow-y-auto border-cyber-secondary">
            {players.map((player) => (
              <li key={player.id}>
                <PlayerRow player={player} onSelectPlayer={handleSelectPlayer} selectedPlayer={selectedPlayer} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Режим записи (занимает весь экран) */}
      {isRecordMode && <Record />}
    </div>
  );
};
