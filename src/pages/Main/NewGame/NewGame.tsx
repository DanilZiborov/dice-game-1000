import type { JSX } from 'react';
import { AddPlayerForm } from 'pages/Main/NewGame/newGameForms/AddPlayersForm';
import { PrimaryButton, SecondaryButton } from 'components';
import { useCallback, useMemo, useState } from 'react';
import { NewGameButton } from 'pages/Main/NewGame/newGameForms/NewGameButton';
import { AddLimitsForm, AddRulesForm } from 'pages/Main/NewGame/newGameForms';

type Player = { name: string; score: number };

type Game = {
  players: Player[];
  started: string | null;
  finished: string | null;
  enterLimit: number;
  barrelLimit: number;
};

export const NewGame = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [newGameData, setNewGameData] = useState<Game>({
    players: [],
    started: null,
    finished: null,
    enterLimit: 0,
    barrelLimit: 0,
  });

  const formContainerData = [
    { title: '', subtitle: '' },
    { title: 'Добавь игроков', subtitle: '' },
    { title: 'Добавь лимиты', subtitle: '' },
    { title: 'Добавь дополнительные правила', subtitle: '' },
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

  const handleLimitsChange = (newLimits: { enterLimit: number; barrelLimit: number }): void =>
    setNewGameData((prev) => ({ ...prev, ...newLimits }));

  console.log(newGameData);

  return (
    <div className="flex h-full flex-col justify-center px-1 pb-4">
      {step !== 0 && (
        <div>
          <p className="mb-1 text-center"> {`Шаг ${step}. ${formContainerData[step].title}`}</p>
          <p className="mb-4 font-mono font-bold text-slate-300">
            {formContainerData[step].subtitle}
          </p>
        </div>
      )}

      <div className="min-h-0 flex-1 pt-2 pb-10">
        {step === 0 && <NewGameButton onClick={() => setStep(1)} />}

        {step === 1 && (
          <AddPlayerForm onPlayersChange={handlePlayersChange} initialPlayers={initialPlayers} />
        )}
        {step === 2 && (
          <AddLimitsForm
            limits={{ enterLimit: newGameData.enterLimit, barrelLimit: newGameData.barrelLimit }}
            onLimitsChange={handleLimitsChange}
          />
        )}
        {step === 3 && (
          <AddRulesForm
            onRulesChange={() => {}}
            initialRules={{
              boltsEnabled: true,
              boltsValue: 25,
              pit200Enabled: true,
              pit700Enabled: true,
            }}
          />
        )}
      </div>

      {step !== 0 && (
        <div className="flex items-center justify-between">
          <SecondaryButton onClick={handleStepBack}>Назад</SecondaryButton>
          <PrimaryButton
            // disabled={newGameData.players.filter((p) => p.name).length < 2}
            onClick={handleStepForward}
          >
            Далее
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
