import type { JSX } from 'react';
import { PlayerRow } from 'pages/CurrentGame/PlayerRow';
import type { Player } from 'shared/types';

type Props = { players: Player[]; enableRecordMode: () => void };

export const PlayersList = ({ players, enableRecordMode }: Props): JSX.Element => {
  return (
    <ul className="border-cyber-secondary my-10 border-y">
      {players.map((player) => (
        <li key={player.id} onClick={enableRecordMode}>
          <PlayerRow player={player} />
        </li>
      ))}
    </ul>
  );
};
