import type { JSX } from 'react';
import type { Game, Player } from 'shared/types';
import { PlayerRow } from 'pages/Main/CurrentGame/PlayerRow';

type CurrentGameProps = {
  game: Game;
  players: Player[];
};

export const CurrentGame = ({ players }: CurrentGameProps): JSX.Element => {
  return (
    <div className="align-center flex h-full flex-col justify-center">
      <ul className="border-cyber-secondary my-10 border-y">
        {players.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </ul>
    </div>
  );
};
