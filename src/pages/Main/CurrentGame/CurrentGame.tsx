import type { JSX } from 'react';
import type { Game, Player } from 'shared/types';

type CurrentGameProps = {
  game: Game;
  players: Player[];
};

export const CurrentGame = ({ game, players }: CurrentGameProps): JSX.Element => {
  return (
    <div style={{ padding: 20, fontFamily: 'monospace' }}>
      <h2>Current Game</h2>
      <h3>Game:</h3>
      <pre>{JSON.stringify(game, null, 2)}</pre>

      <h3>Players:</h3>
      <pre>{JSON.stringify(players, null, 2)}</pre>
    </div>
  );
};
