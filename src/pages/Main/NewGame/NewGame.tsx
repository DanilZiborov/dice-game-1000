import type { JSX } from 'react';
import { NewGameButton } from 'pages/Main/NewGame/NewGameButton';
import { useState } from 'react';
import { NewGameFormContainer } from 'pages/Main/NewGame/NewGameFormContainer/NewGameFormContainer';

type Player = { name: string; score: number };

type Game = {
  players: Player[];
  started: string | null;
  finished: string | null;
};

export const NewGame = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [newGameData, setNewGameData] = useState<Game>({
    players: [],
    started: null,
    finished: null,
  });

  const handleNewGame = (): void => {
    setStep(1);
  };

  return (
    <div className="flex h-full items-center justify-center">
      {step === 0 && <NewGameButton onClick={handleNewGame} />}

      {step > 0 && <NewGameFormContainer />}
    </div>
  );
};
