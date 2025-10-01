import type { JSX } from 'react';
import { AddPlayerForm } from 'pages/Main/NewGame/newGameForms/AddPlayersForm';
import { PrimaryButton, SecondaryButton } from 'components';
import { useCallback, useMemo, useState } from 'react';
import { NewGameButton } from 'pages/Main/NewGame/newGameForms/NewGameButton';
import { AddLimitsForm, AddRulesForm, AddWinRuleForm, StartGameForm } from 'pages/Main/NewGame/newGameForms';
import { NEW_GAME_DEFAULT_CONFIG } from 'pages/Main/NewGame/constants';
import type { Game, NewGameConfig, NewPlayerConfig, Player } from 'shared/types';
import { useDb } from 'db/DbContext';
import { addGame } from 'db/operations/addGame';
import { addPlayers } from 'db/operations/addPlayers';
import { getGameById } from 'db/operations/getGameById';
import { getPlayersByGameId } from 'db/operations/getPlayersByGameId';

type Props = {
  onGameStarted: ({ game, players }: { game: Game; players: Player[] }) => void;
};

const formContainerTitle = [
  '',
  'Добавьте игроков',
  'Добавьте лимиты',
  'Добавьте дополнительные правила',
  'Определите правило для победы',
  '',
] as const;

export const NewGame = ({ onGameStarted }: Props): JSX.Element => {
  const db = useDb();

  const [step, setStep] = useState<number>(0);
  const [newPlayers, setNewPlayers] = useState<NewPlayerConfig>(['', '']);
  const [newGameConfig, setNewGameConfig] = useState<NewGameConfig>(NEW_GAME_DEFAULT_CONFIG);

  // если в массиве игроков меньше двух элементов, добавляем пустых игроков
  const initialPlayers = useMemo(() => {
    if (!newPlayers.length) return ['', ''];
    if (newPlayers.length === 1) return [...newPlayers, ''];

    return newPlayers;
  }, [newPlayers]);

  // Обработчики шагов
  const handleStepForward = useCallback((): void => setStep((prev) => prev + 1), []);
  const handleStepBack = useCallback((): void => setStep((prev) => (prev <= 0 ? 0 : prev - 1)), []);

  const handleConfigChange = useCallback((newConfig: Partial<NewGameConfig>): void => {
    setNewGameConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleStartGame = useCallback(async (): Promise<void> => {
    const gameId = await addGame({ db, gameConfig: newGameConfig });
    await addPlayers({ db, gameId: Number(gameId), playerNames: newPlayers });

    const createdGame = await getGameById({ db, gameId });
    const createdPlayers = await getPlayersByGameId({ db, gameId });

    onGameStarted({ game: createdGame, players: createdPlayers });
  }, [db, newGameConfig, newPlayers, onGameStarted]);

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
