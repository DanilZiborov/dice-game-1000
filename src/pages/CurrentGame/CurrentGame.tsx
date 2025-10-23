import type { JSX } from 'react';
import { PlayerRow } from 'pages/CurrentGame/PlayerRow';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';

export const CurrentGame = (): JSX.Element => {
  const {
    state: { players },
  } = useCurrentGame();

  console.log(players);

  return (
    <ul className="border-cyber-secondary my-10 border-y">
      {players.map((player) => (
        <li key={player.data.id}>
          <PlayerRow player={player} />
        </li>
      ))}
    </ul>
  );
};
