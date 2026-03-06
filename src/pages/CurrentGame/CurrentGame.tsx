import { clsx } from 'clsx';
import { Record } from 'pages/CurrentGame/Record/Record';
import { type JSX, useState } from 'react';
import { PlayerRow } from 'pages/CurrentGame/PlayerRow';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { Player } from 'shared/types';
import { useDb } from 'db/DbContext';
import { endGame } from 'db/operations';
import { ConfirmationDialog } from 'components/ConfirmationDialog';

export const CurrentGame = (): JSX.Element => {
  const db = useDb();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
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
      navigate(`/finished/${game.id}`);
      dispatch({ type: 'SET_GAME', payload: null });
    });
  };

  if (!game && location.pathname.includes('current')) return <Navigate to="/app/game/new" replace/>;

  return (
    <div className="h-full w-full">
      <div className="flex justify-end">
        <div
          onClick={() => setIsConfirmationOpen(true)}
          className="relative top-[-30px] right-[20px] z-101 h-[20px] w-[20px] rounded-xs bg-red-700"
        />
      </div>

      <div className="flex h-[calc(100%-20px)] w-full flex-col">
        {/* Основной контент (скрывается в режиме записи) */}
        <div className={clsx(isRecordMode && 'hidden', 'flex h-full w-full flex-col')}>
          {/* Контейнер для списка игроков – занимает всё свободное место и центрирует содержимое */}
          <div className="flex flex-grow flex-col items-center justify-center">
            <ul className="max-h-[80%] w-full overflow-y-auto border-cyber-secondary">
              {!!game &&
                players.map((player) => (
                  <li key={player.id}>
                    <PlayerRow player={player} onSelectPlayer={handleSelectPlayer} selectedPlayer={selectedPlayer} />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {isRecordMode && game && <Record />}
      </div>
      <ConfirmationDialog
        open={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        text="Завершить партию?"
        action={handleEndGame}
      />
    </div>
  );
};
