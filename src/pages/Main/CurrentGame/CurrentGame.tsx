import type { JSX } from 'react';
import type { Game, Player } from 'shared/types';

type CurrentGameProps = {
  game: Game;
  players: Player[];
};

export const CurrentGame = ({ players }: CurrentGameProps): JSX.Element => {
  return (
    <div className="align-center flex h-full flex-col justify-center">
      <ul className="border-cyber-secondary my-10 border-y">
        {players.map((player) => (
          <li key={player.id} className={'border-cyber-secondary flex items-center justify-between border-b px-3 py-6'}>
            <span>{player.name}</span>
            <span className="text-lg tracking-wider">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
