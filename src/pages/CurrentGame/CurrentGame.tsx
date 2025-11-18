import { clsx } from 'clsx';
import { Record } from 'pages/CurrentGame/Record/Record';
import { type JSX, useState } from 'react';
import { PlayerRow } from 'pages/CurrentGame/PlayerRow';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { Player } from 'shared/types';
import { SecondaryButton } from 'components';
import { endGame } from 'db/operations';
import { useDb } from 'db/DbContext';
import { getFormattedDateString } from 'shared/utils/getFormattedDateString';

export const CurrentGame = (): JSX.Element => {
  const db = useDb();
  const navigate = useNavigate();
  const {
    state: { players, game },
    dispatch,
  } = useCurrentGame();

  const { playerId } = useParams();

  const isRecordMode = !!playerId;

  // Храним последнего записанного игрока. Нужно для логики обгонов
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSelectPlayer = (player: Player): void => {
    setSelectedPlayer(player);
    navigate(`/app/game/current/${player.id}`);
  };

  const handleEndGame = (): void => {
    if (!game) return;
    endGame({ db, gameId: game.id }).then(() => dispatch({ type: 'SET_GAME', payload: null }));
  };

  if (!game) return <Navigate to="/app/game/new" />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className={clsx(isRecordMode && 'hidden', 'flex h-full w-full flex-col items-center justify-center')}>
        <ul className={clsx('my-10 max-h-[70%] w-full border-cyber-secondary')}>
          {players.map((player) => (
            <li key={player.id}>
              <PlayerRow player={player} onSelectPlayer={handleSelectPlayer} selectedPlayer={selectedPlayer} />
            </li>
          ))}
        </ul>
        <SecondaryButton onClick={handleEndGame} withDelay>
          Завершить партию
        </SecondaryButton>
        {game && (
          <div className="pt-5 text-xs text-cyber-text-secondary">
            партия началась {getFormattedDateString(new Date(game.started))}
          </div>
        )}
      </div>
      {isRecordMode && <Record />}
    </div>
  );
};
