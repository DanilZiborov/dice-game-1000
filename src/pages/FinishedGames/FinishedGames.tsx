import { useParams, useNavigate } from 'react-router-dom';
import { type JSX, useCallback, useEffect, useState } from 'react';
import { useDb } from 'db/DbContext';
import type { Game, Player } from 'shared/types';
import { getAllGames } from 'db/operations/getAllGames';
import { getAllPlayers } from 'db/operations/getAllPlayers';
import { getFormattedDateString } from 'shared/utils/getFormattedDateString';
import { IconButton } from 'components';
import { deleteGamesAndPlayers } from 'db/operations/deleteGamesAndPlayers';
import { ConfirmationDialog } from 'components/ConfirmationDialog';
import { DeleteIcon } from 'components/icons';
import { FinishedGameDetails } from './FinishedGameDetails';

type GameWithPlayers = {
  game: Game;
  players: Player[];
};

// TODO: большую часть комопнента FinishedGames писала нейронка. Требуется жёсткий рефакторинг всего раздела FinishedGames

export const FinishedGames = (): JSX.Element => {
  const db = useDb();
  const navigate = useNavigate();
  const { gameId } = useParams();

  const isItemMode = !!gameId;
  const [gamesWithPlayers, setGamesWithPlayers] = useState<GameWithPlayers[]>([]);
  const [gameToDelete, setGameToDelete] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const [allGames, allPlayers] = await Promise.all([getAllGames(db), getAllPlayers(db)]);

      const mappedGames: GameWithPlayers[] = allGames.map((game) => {
        const playersForGame = allPlayers.filter((player) => player.gameId === game.id);

        return {
          game,
          players: playersForGame,
        };
      });

      mappedGames.sort((a, b) => {
        const dateA = new Date(a.game.started);
        const dateB = new Date(b.game.started);

        return dateB.getTime() - dateA.getTime();
      });

      setGamesWithPlayers(mappedGames);
    } finally {
      setIsLoading(false);
    }
  }, [db, setGamesWithPlayers, setIsLoading]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleCardClick = (finishedGameId: number): void => {
    navigate(`/finished/${finishedGameId}`);
  };

  const handleBack = (): void => {
    navigate('/finished');
  };

  const handleDelete = async (gameIdToDelete: number): Promise<void> => {
    await deleteGamesAndPlayers({
      db,
      gameIds: [gameIdToDelete],
    });
    void fetchData();

    if (Number(gameId) === Number(gameToDelete)) {
      handleBack();
    }

    setGameToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-cyber-text-secondary">Загрузка игр...</p>
      </div>
    );
  }

  // Режим отображения одной игры
  if (isItemMode) {
    const selectedGame = gamesWithPlayers.find((g) => g.game.id === Number(gameId));

    if (!selectedGame) {
      return (
        <div className="p-6">
          <p className="text-red-500">Игра не найдена</p>
          <button onClick={handleBack} className="mt-4 text-cyber-primary hover:underline">
            Вернуться к списку
          </button>
        </div>
      );
    }

    return <FinishedGameDetails game={selectedGame.game} players={selectedGame.players} onBack={handleBack} />;
  }

  // Режим списка игр
  return (
    <div className="space-y-4 px-2 py-4">
      {gamesWithPlayers.map(({ game, players }) => {
        const isFinished = !!game.ended;
        const startDate = new Date(game.started);
        const endDate = game.ended ? new Date(game.ended) : null;

        // Форматируем время начала (ЧЧ:ММ)
        const formatTime = (date: Date): string => {
          return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          });
        };

        let timeInfo = '';

        if (endDate) {
          // Время начала - Время окончания
          const startTime = formatTime(startDate);
          const endTime = formatTime(endDate);

          // Рассчитываем длительность
          const diffMs = endDate.getTime() - startDate.getTime();
          const hours = Math.floor(diffMs / 3600000);
          const minutes = Math.floor((diffMs % 3600000) / 60000);

          timeInfo = `${startTime} - ${endTime} (${hours} ч, ${minutes} мин)`;
        } else {
          timeInfo = `Начало: ${formatTime(startDate)} (игра идёт)`;
        }

        const playersNames = players.map((p) => p.name).join(', ');

        return (
          <div
            key={game.id}
            onClick={() => handleCardClick(game.id)}
            className={`relative cursor-pointer rounded-xl ${
              isFinished
                ? 'border border-cyber-secondary/30 bg-cyber-background'
                : 'animate-pulse-border bg-cyber-background/95'
            } p-4 transition-all duration-300 hover:border-cyber-primary/60 hover:shadow-lg hover:shadow-cyber-primary/20`}
          >
            <div className="flex flex-row items-center justify-between">
              <h3 className={`font-app text-lg font-bold tracking-wider text-cyber-text`}>
                {getFormattedDateString(startDate).split(', ')[0]}
              </h3>
              <IconButton className="border-none" onClick={() => setGameToDelete(game.id)}>
                <DeleteIcon />
              </IconButton>
            </div>

            {/* Список участников */}
            <p className={`truncate font-info text-sm text-cyber-text-secondary`} title={playersNames}>
              {playersNames || 'Нет игроков'}
            </p>

            {/* Декоративная линия */}
            <div className={`my-4 h-px bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent`} />

            {/* Подвал с временем игры */}
            <div className={`flex justify-between font-info text-xs text-cyber-text-secondary/70`}>
              <span>{timeInfo}</span>
              <span>ID: {game.id.toString().padStart(4, '0')}</span>
            </div>
          </div>
        );
      })}

      {/* Сообщение, если игр нет */}
      {gamesWithPlayers.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-cyber-text-secondary/80">Нет завершённых игр</p>
        </div>
      )}

      {/* Диалог подтверждения удаления */}
      <ConfirmationDialog
        open={!!gameToDelete}
        onClose={() => setGameToDelete(null)}
        text="Вы уверены, что хотите удалить эту игру? Восстановить её будет невозможно."
        action={() => {
          if (gameToDelete) {
            void handleDelete(gameToDelete);
          }
        }}
      />
    </div>
  );
};
