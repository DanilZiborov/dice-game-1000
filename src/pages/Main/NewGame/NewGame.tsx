import type { JSX } from 'react';
import { AddPlayerForm } from 'pages/Main/NewGame/newGameForms/AddPlayersForm';
import { PrimaryButton, SecondaryButton } from 'components';
import { useCallback, useMemo, useState } from 'react';
import { NewGameButton } from 'pages/Main/NewGame/newGameForms/NewGameButton';
import {
  AddLimitsForm,
  AddRulesForm,
  AddWinRuleForm,
  StartGameForm,
} from 'pages/Main/NewGame/newGameForms';
import type { Game } from 'pages/Main/NewGame/types';
import { DEFAULT_NEW_GAME_CONFIG } from 'pages/Main/NewGame/constants';

export const NewGame = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [newGameData, setNewGameData] = useState<Game>({
    players: [],
    started: '',
    finished: '',
    ...DEFAULT_NEW_GAME_CONFIG,
  });

  const {
    players,
    barrelLimit,
    enterLimit,
    boltsLimit,
    withBolts,
    withOvertake,
    withEasyWin,
    overtakeLimit,
    pit200,
    pit700,
    truck,
  } = newGameData;

  const limits = { barrelLimit, enterLimit };
  const rules = {
    withBolts,
    boltsLimit,
    withOvertake,
    overtakeLimit,
    pit200,
    pit700,
    truck,
    withEasyWin,
  };

  const formContainerData = [
    { title: '', subtitle: '' },
    { title: 'Добавьте игроков', subtitle: '' },
    { title: 'Добавьте лимиты', subtitle: '' },
    { title: 'Добавьте дополнительные правила', subtitle: '' },
    { title: 'Определите правило для победы', subtitle: '' },
    { title: '', subtitle: '' },
  ];

  const handleStepForward = (): void => {
    setStep((prev) => prev + 1);
  };

  const handleStepBack = (): void => {
    setStep((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const handlePlayersChange = useCallback((nextPlayers: string[]): void => {
    const filteredPlayers = nextPlayers.filter((p) => !!p);
    const newPlayers = filteredPlayers.map((p) => ({ name: p, score: 0 }));
    setNewGameData((prev) => ({ ...prev, players: newPlayers }));
  }, []);

  const initialPlayers = useMemo(() => {
    const playersNames = players.map((p) => p.name);
    if (!playersNames.length) return ['', ''];
    if (playersNames.length === 1) return [...playersNames, ''];

    return playersNames;
  }, [players]);

  const handleConfigChange = (newConfig: Partial<Game>): void => {
    setNewGameData((prev) => ({ ...prev, ...newConfig }));
  };

  const handleStartGame = (): void => {
    console.log('Партия началась!');
  };

  console.log(newGameData);

  return (
    <div className="flex h-full flex-col justify-center px-1 pb-4">
      {step === 0 ||
        (step !== 5 && (
          <div>
            <p className="mb-1 text-center"> {`Шаг ${step}. ${formContainerData[step].title}`}</p>
            <p className="mb-4 font-mono font-bold text-slate-300">
              {formContainerData[step].subtitle}
            </p>
          </div>
        ))}

      <div className="min-h-0 flex-1 pt-2 pb-10">
        {step === 0 && <NewGameButton onClick={() => setStep(1)} />}

        {step === 1 && (
          <AddPlayerForm onPlayersChange={handlePlayersChange} initialPlayers={initialPlayers} />
        )}
        {step === 2 && <AddLimitsForm limits={limits} onConfigChange={handleConfigChange} />}
        {step === 3 && <AddRulesForm onConfigChange={handleConfigChange} rules={rules} />}
        {step === 4 && <AddWinRuleForm onConfigChange={handleConfigChange} rules={rules} />}
        {step === 5 && <StartGameForm onStart={handleStartGame} />}
      </div>

      {step !== 0 && (
        <div className="flex items-center justify-between">
          <SecondaryButton onClick={handleStepBack}>Назад</SecondaryButton>
          {step !== 5 && (
            <PrimaryButton
              // disabled={newGameData.players.filter((p) => p.name).length < 2}
              onClick={handleStepForward}
            >
              Далее
            </PrimaryButton>
          )}
        </div>
      )}
    </div>
  );
};
