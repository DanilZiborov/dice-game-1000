import { type JSX, useEffect, useState } from 'react';
import { useDb } from '../../db/DbContext';
import type { Game, Player } from '../../shared/types';
import { getAllGames } from '../../db/operations/getAllGames';
import { getAllPlayers } from '../../db/operations/getAllPlayers';
import { getFormattedDateString } from '../../shared/utils/getFormattedDateString';

type GameWithPlayers = {
  game: Game;
  players: Player[];
};

export const FinishedGames = (): JSX.Element => {
  const db = useDb();

  const [gamesWithPlayers, setGamesWithPlayers] = useState<GameWithPlayers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error('Ошибка при загрузке игр и игроков:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [db]);

  const handleCardClick = (gameId: number) => {
    console.log('Открыть детали игры:', gameId);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-cyber-text-secondary">Загрузка игр...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {gamesWithPlayers.map(({ game, players }) => {
        const isFinished = !!game.ended;
        const startDate = new Date(game.started);
        const endDate = game.ended ? new Date(game.ended) : null;

        // Форматируем время начала (ЧЧ:ММ)
        const formatTime = (date: Date) => {
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
            } p-6 transition-all duration-300 hover:border-cyber-primary/60 hover:shadow-lg hover:shadow-cyber-primary/20`}
          >
            {/* Заголовок — только дата начала */}
            <h3 className={`mb-4 font-app text-2xl font-bold tracking-tight text-cyber-text`}>
              {getFormattedDateString(startDate).split(', ')[0]}
            </h3>

            {/* Список участников */}
            <p className={`truncate font-info text-sm text-cyber-text-secondary`} title={playersNames}>
              {playersNames || 'Нет игроков'}
            </p>

            {/* Декоративная линия */}
            <div className={`mt-4 h-px bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent`} />

            {/* Подвал с временем игры */}
            <div className={`mt-3 flex justify-between font-info text-xs text-cyber-text-secondary/70`}>
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
    </div>
  );
};
