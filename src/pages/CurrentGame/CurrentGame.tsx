import { clsx } from 'clsx';
import { Record } from 'pages/CurrentGame/Record/Record';
import { type JSX, useState } from 'react';
import { PlayerRow } from 'pages/CurrentGame/PlayerRow';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useNavigate, useParams } from 'react-router-dom';
import type { Player } from 'shared/types';
import { SecondaryButton } from 'components';
import { endGame } from 'db/operations';
import { useDb } from 'db/DbContext';

export const CurrentGame = (): JSX.Element => {
  const db = useDb();
  const navigate = useNavigate();
  const {
    state: { players, game },
    dispatch,
  } = useCurrentGame();

  const { recordMode } = useParams();

  const isRecordMode = !!recordMode;

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSelectPlayer = (player: Player): void => {
    setSelectedPlayer(player);
    navigate('/game/record');
  };

  const handleEndGame = (): void => {
    if (!game) return;
    endGame({ db, gameId: game.id }).then(() => dispatch({ type: 'SET_GAME', payload: null }));
  };

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className={clsx(isRecordMode && 'hidden', 'flex h-full w-full flex-col items-center justify-center')}>
        <ul className={clsx('border-cyber-secondary my-10 w-full border-y')}>
          {players.map((player) => (
            <li key={player.id}>
              <PlayerRow player={player} onSelectPlayer={handleSelectPlayer} selectedPlayer={selectedPlayer} />
            </li>
          ))}
        </ul>
        <SecondaryButton onClick={handleEndGame} withDelay>
          Завершить партию
        </SecondaryButton>
      </div>
      {selectedPlayer && isRecordMode && <Record player={selectedPlayer} />}
    </div>
  );
};
