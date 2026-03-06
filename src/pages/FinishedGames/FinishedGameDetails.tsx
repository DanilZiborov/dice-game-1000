import { type JSX } from 'react';
import type { Game, Player } from 'shared/types';
import { PlayerResults } from './PlayerResults';

type Props = {
  game: Game;
  players: Player[];
  onBack: () => void;
};

export const FinishedGameDetails = ({ game, players, onBack }: Props): JSX.Element => {
  const formatDateTime = (date: string | undefined): string => {
    if (!date) return '—';
    const dateObj = new Date(date);

    return dateObj.toLocaleString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const headerDate = new Date(game.started).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const calculateDuration = (): string => {
    if (!game.started || !game.ended) return '—';

    const start = new Date(game.started);
    const end = new Date(game.ended);
    const diffMs = end.getTime() - start.getTime();

    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);

    return `${hours} ч ${minutes} мин`;
  };

  const getPitInfo = (): string => {
    if (game.pit200 && game.pit700) return '200–300, 700–800';
    if (game.pit200) return '200–300';
    if (game.pit700) return '700–800';

    return 'нет';
  };

  const winner = players.find((p) => p.isWinner);
  const playersNames = players.map((p) => p.name).join(', ');

  return (
    <div className="min-h-screen bg-cyber-background py-4">
      {/* Фиксированная кнопка "Назад" */}
      <div className="sticky top-0 z-10 bg-cyber-background pb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-cyber-primary transition-colors hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path d="M19 12H6M12 18l-6-6 6-6" />
          </svg>
          Назад к списку игр
        </button>
      </div>

      <p className="mb-2 text-center text-lg font-bold underline">
        Партия № {game.id} от {headerDate}{' '}
      </p>

      {/* Основной контент: две колонки */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Колонка 1: время и участники */}
        <div className="space-y-6">
          <div className="space-y-4 rounded-xl bg-cyber-background/50 p-6">
            <h3 className="mb-4 font-app text-lg font-semibold text-cyber-text">Время проведения</h3>
            <div className="space-y-3">
              <p className="flex justify-between text-sm">
                <span className="w-16 text-cyber-text-secondary">Начало:</span>
                <span className="font-medium">{formatDateTime(game.started)}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span className="w-16 text-cyber-text-secondary">Конец:</span>
                <span className="font-medium">{formatDateTime(game.ended)}</span>
              </p>
              <p className="flex justify-between text-sm text-cyber-text">
                <span className="w-16 text-cyber-text-secondary">Длительность:</span>
                <span className="font-medium">{calculateDuration()}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-cyber-background/50 p-6">
            <h3 className="mb-4 font-app text-lg font-semibold text-cyber-text">Участники</h3>
            <p className="mb-6 leading-relaxed text-cyber-text">{playersNames}</p>

            {winner && (
              <div>
                <p className="font-app text-xl font-bold tracking-wide text-yellow-400">Победитель: {winner.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Колонка 2: настройки игры */}
        <div className="space-y-4 rounded-xl bg-cyber-background/50 p-6">
          <h3 className="mb-4 font-app text-lg font-semibold text-cyber-text">Настройки игры</h3>
          <div className="space-y-3 text-sm">
            <p className="flex justify-between">
              <span className="text-cyber-text-secondary">С болтами:</span>
              <span className="font-medium">{game.withBolts ? `Да (штраф: ${game.boltsLimit})` : 'Нет'}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-cyber-text-secondary">С обгонами:</span>
              <span className="font-medium">{game.withOvertake ? `Да (штраф: ${game.overtakeLimit})` : 'Нет'}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-cyber-text-secondary">Паспорт:</span>
              <span className="font-medium">{game.enterLimit}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-cyber-text-secondary">Значение бочки:</span>
              <span className="font-medium">{game.barrelLimit}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-cyber-text-secondary">Быстрая победа:</span>
              <span className="font-medium">{game.withEasyWin ? 'Да' : 'Нет'}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-cyber-text-secondary">Ямы:</span>
              <span className="font-medium">{getPitInfo()}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-cyber-text-secondary">С самосвалом:</span>
              <span className="font-medium">{game.truck ? 'Да' : 'Нет'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Секция "Результаты игроков" с якорем */}
      <div id="player-results" className="min-h-screen pt-[100px]">
        <h3 className="mb-6 font-app text-xl font-semibold text-cyber-text">Результаты игроков</h3>
        <div className="space-y-6">
          {players.map((player) => (
            <PlayerResults key={player.id} name={player.name} scores={player.log} totalBolts={player.totalBolts} />
          ))}
        </div>
      </div>
    </div>
  );
};
