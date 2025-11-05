import type { JSX } from 'react';
import { AddPlayerForm } from 'pages/NewGame/newGameForms/AddPlayersForm';
import { PrimaryButton, SecondaryButton } from 'components';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { NewGameButton } from 'pages/NewGame/newGameForms/NewGameButton';
import { AddLimitsForm, AddRulesForm, AddWinRuleForm, StartGameForm } from 'pages/NewGame/newGameForms';
import { NEW_GAME_DEFAULT_CONFIG } from 'pages/NewGame/constants';
import type { NewGameConfig } from 'shared/types';
import { useDb } from 'db/DbContext';
import { addGame } from 'db/operations/addGame';
import { addPlayers } from 'db/operations/addPlayers';
import { useNavigate } from 'react-router-dom';
import { getCurrentGame } from 'db/operations';
import { findDuplicates } from 'shared/utils/findDuplicates';

const formContainerTitle = [
  '',
  'Добавьте игроков',
  'Добавьте лимиты',
  'Добавьте дополнительные правила',
  'Определите правило для победы',
  '',
] as const;

export const NewGame = (): JSX.Element => {
  const db = useDb();

  const navigate = useNavigate();

  const [step, setStep] = useState<number>(0);
  const [newPlayers, setNewPlayers] = useState<string[]>(['', '']);
  const [newGameConfig, setNewGameConfig] = useState<NewGameConfig>(NEW_GAME_DEFAULT_CONFIG);

  // если в массиве игроков меньше двух элементов, добавляем пустых игроков
  const initialPlayers = useMemo(() => {
    if (!newPlayers.length) return ['', ''];
    if (newPlayers.length === 1) return [...newPlayers, ''];

    return newPlayers;
  }, [newPlayers]);

  const isPlayerDupes = useMemo(() => !!findDuplicates(newPlayers), [newPlayers]);

  const notEnoughPlayers = useMemo(() => newPlayers.filter((p) => !!p).length < 2, [newPlayers]);

  // Обработчики шагов
  const handleStepForward = useCallback((): void => setStep((prev) => prev + 1), []);
  const handleStepBack = useCallback((): void => setStep((prev) => (prev <= 0 ? 0 : prev - 1)), []);

  const handleConfigChange = useCallback((newConfig: Partial<NewGameConfig>): void => {
    setNewGameConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleStartGame = useCallback(async (): Promise<void> => {
    if (notEnoughPlayers || isPlayerDupes) return;
    const filteredPlayers = newPlayers.filter((p) => !!p);
    if (filteredPlayers.length < 2) return;

    const gameId = await addGame({ db, gameConfig: newGameConfig });
    await addPlayers({ db, gameId: Number(gameId), playerNames: filteredPlayers });

    navigate('/', { replace: true });
  }, [db, navigate, newGameConfig, newPlayers]);

  // Функция рендера формы по шагу
  const renderForm = useCallback((): JSX.Element => {
    switch (step) {
      case 0:
        return <NewGameButton onClick={() => setStep(1)} />;
      case 1:
        return <AddPlayerForm onPlayersChange={(players) => setNewPlayers(players)} initialPlayers={initialPlayers} />;
      case 2:
        return <AddLimitsForm currentConfig={newGameConfig} onConfigChange={handleConfigChange} />;
      case 3:
        return <AddRulesForm onConfigChange={handleConfigChange} currentConfig={newGameConfig} />;
      case 4:
        return <AddWinRuleForm onConfigChange={handleConfigChange} currentConfig={newGameConfig} />;
      case 5:
        return <StartGameForm onStart={handleStartGame} />;
      default:
        throw new Error(`Ошибка логики рендеринга формы. Для шага ${step} не задано отображение.`);
    }
  }, [step, initialPlayers, newGameConfig, handleConfigChange, handleStartGame]);

  // protect against manual url navigation
  useLayoutEffect(() => {
    const checkGameStarted = async (): Promise<void> => {
      const currentGame = await getCurrentGame({ db });

      if (currentGame) {
        navigate('/game', { replace: true });

        return;
      }
    };

    void checkGameStarted();
  }, [db, navigate]);

  const isButtonDisabled = isPlayerDupes || notEnoughPlayers;

  return (
    <div className="flex h-full flex-col justify-center p-4">
      {step > 0 && step < 5 ? (
        <div>
          <p className="mb-1 text-center">{`Шаг ${step}. ${formContainerTitle[step]}`}</p>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 pt-2 pb-10">{renderForm()}</div>

      {step !== 0 && (
        <div className="flex items-center justify-between">
          <SecondaryButton onClick={handleStepBack}>Назад</SecondaryButton>
          {step !== 5 && (
            <PrimaryButton disabled={isButtonDisabled} onClick={handleStepForward}>
              Далее
            </PrimaryButton>
          )}
        </div>
      )}
    </div>
  );
};
