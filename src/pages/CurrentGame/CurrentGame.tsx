import { clsx } from 'clsx';
import { Record } from 'pages/CurrentGame/Record/Record';
import { type JSX, useState } from 'react';
import { PlayerRow } from 'pages/CurrentGame/PlayerRow';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useNavigate, useParams } from 'react-router-dom';
import type { Player } from 'shared/types';

export const CurrentGame = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    state: { players },
  } = useCurrentGame();

  const { recordMode } = useParams();

  const isRecordMode = !!recordMode;

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  console.log(selectedPlayer?.score);

  const handleSelectPlayer = (player: Player): void => {
    setSelectedPlayer(player);
    navigate('/game/record');
  };

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <ul className={clsx('border-cyber-secondary my-10 border-y', isRecordMode && 'hidden')}>
        {players.map((player) => (
          <li key={player.id}>
            <PlayerRow player={player} onSelectPlayer={handleSelectPlayer} selectedPlayer={selectedPlayer} />
          </li>
        ))}
      </ul>
      {selectedPlayer && isRecordMode && <Record player={selectedPlayer} />}
    </div>
  );
};
