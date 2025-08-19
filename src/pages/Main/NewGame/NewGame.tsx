import type { JSX } from 'react';
import { NewGameButton } from 'pages/Main/NewGame/NewGameButton';
import { useState } from 'react';

type Player = { name: string; score: number };

type Game = {
  players: Player[];
  started: string | null;
  finished: string | null;
};

export const NewGame = (): JSX.Element => {
  const [newGameData, setNewGameData] = useState<Game>({
    players: [],
    started: null,
    finished: null,
  });

  return (
    <div className="flex h-full items-center justify-center">
      <NewGameButton />
    </div>
  );
};
