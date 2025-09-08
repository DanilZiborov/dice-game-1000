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
import { NEW_GAME_DEFAULT_CONFIG } from 'pages/Main/NewGame/constants';

const formContainerTitle = [
  '',
  'Добавьте игроков',
  'Добавьте лимиты',
  'Добавьте дополнительные правила',
  'Определите правило для победы',
  '',
] as const;

export const NewGame = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [newGameData, setNewGameData] = useState<Game>({
    players: [],
    started: '',
    finished: '',
    ...NEW_GAME_DEFAULT_CONFIG,
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

  const rules = useMemo(
    () => ({
      withBolts,
      boltsLimit,
      withOvertake,
      overtakeLimit,
      pit200,
      pit700,
      truck,
      withEasyWin,
    }),
    [withBolts, boltsLimit, withOvertake, overtakeLimit, pit200, pit700, truck, withEasyWin],
  );

  // если в массиве игроков меньше двух элементов, добавляем пустых игрокой
  // в теории, это маловероятный сценарий
  const initialPlayers = useMemo(() => {
    const names = players.map((p) => p.name);
    if (!names.length) return ['', ''];
    if (names.length === 1) return [...names, ''];

    return names;
  }, [players]);

  // Обработчики шагов
  const handleStepForward = useCallback((): void => setStep((prev) => prev + 1), []);
  const handleStepBack = useCallback((): void => setStep((prev) => (prev <= 0 ? 0 : prev - 1)), []);

  const handlePlayersChange = useCallback((nextPlayers: string[]): void => {
    const newPlayers = nextPlayers.filter(Boolean).map((name) => ({ name, score: 0 }));
    setNewGameData((prev) => ({ ...prev, players: newPlayers }));
  }, []);

  const handleConfigChange = useCallback((newConfig: Partial<Game>): void => {
    setNewGameData((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleStartGame = useCallback((): void => {
    console.log('Партия началась!');
  }, []);

  // Функция рендера формы по шагу
  const renderForm = useCallback((): JSX.Element => {
    switch (step) {
      case 0:
        return <NewGameButton onClick={() => setStep(1)} />;
      case 1:
        return (
          <AddPlayerForm onPlayersChange={handlePlayersChange} initialPlayers={initialPlayers} />
        );
      case 2:
        return (
          <AddLimitsForm limits={{ barrelLimit, enterLimit }} onConfigChange={handleConfigChange} />
        );
      case 3:
        return <AddRulesForm onConfigChange={handleConfigChange} rules={rules} />;
      case 4:
        return <AddWinRuleForm onConfigChange={handleConfigChange} rules={rules} />;
      case 5:
        return <StartGameForm onStart={handleStartGame} />;
      default:
        throw new Error(`Ошибка логики рендеринга формы. Для шага ${step} не задано отображение.`);
    }
  }, [
    step,
    handlePlayersChange,
    initialPlayers,
    barrelLimit,
    enterLimit,
    handleConfigChange,
    rules,
    handleStartGame,
  ]);

  return (
    <div className="flex h-full flex-col justify-center px-1 pb-4">
      {step > 0 && step < 5 ? (
        <div>
          <p className="mb-1 text-center">{`Шаг ${step}. ${formContainerTitle[step]}`}</p>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 pt-2 pb-10">{renderForm()}</div>

      {step !== 0 && (
        <div className="flex items-center justify-between">
          <SecondaryButton onClick={handleStepBack}>Назад</SecondaryButton>
          {step !== 5 && <PrimaryButton onClick={handleStepForward}>Далее</PrimaryButton>}
        </div>
      )}
    </div>
  );
};
