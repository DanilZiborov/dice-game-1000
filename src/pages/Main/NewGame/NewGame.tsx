import type { JSX } from 'react';
import { AddPlayerForm } from 'pages/Main/NewGame/newGameForms/AddPlayersForm';
import { PrimaryButton, SecondaryButton } from 'components';
import { useCallback, useMemo, useState } from 'react';
import { NewGameButton } from 'pages/Main/NewGame/newGameForms/NewGameButton';

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

  const formContainerData = [
    { title: '', subtitle: '' },
    { title: 'Добавь игроков', subtitle: '' },
  ];

  const handleStepForward = (): void => {
    setStep((prev) => prev + 1);
  };

  const handleStepBack = (): void => {
    setStep((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const handlePlayersChange = useCallback((players: string[]): void => {
    const filteredPlayers = players.filter((p) => !!p);
    const newPlayers = filteredPlayers.map((p) => ({ name: p, score: 0 }));
    setNewGameData((prev) => ({ ...prev, players: newPlayers }));
  }, []);

  const initialPlayers = useMemo(() => {
    const playersNames = newGameData.players.map((p) => p.name);
    if (!playersNames.length) return ['', ''];
    if (playersNames.length === 1) return [...playersNames, ''];

    return playersNames;
  }, [newGameData.players]);

  return (
    <div className="flex h-full flex-col justify-center px-1 pb-4">
      {step !== 0 && (
        <div>
          <p className="mb-1 text-center"> {`Шаг ${step}. ${formContainerData[step].title}`}</p>
          <p className="mb-4 font-mono text-slate-300">{formContainerData[step].subtitle}</p>
        </div>
      )}

      <div className="min-h-0 flex-1 pt-2 pb-10">
        {step === 0 && <NewGameButton onClick={() => setStep(1)} />}

        {step === 1 && (
          <AddPlayerForm onPlayersChange={handlePlayersChange} initialPlayers={initialPlayers} />
        )}
      </div>

      {step !== 0 && (
        <div className="flex items-center justify-between">
          <SecondaryButton onClick={handleStepBack}>Назад</SecondaryButton>
          <PrimaryButton onClick={handleStepForward}>Далее</PrimaryButton>
        </div>
      )}
    </div>
  );
};
