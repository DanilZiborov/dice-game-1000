// src/components/PlayerResults.tsx
import {memo, useEffect} from 'react';
import {useLocation} from "react-router-dom";

type Props = {
  name: string;
  scores: number[];
  totalBolts: number;
};

export const PlayerResults = memo(({ name, scores, totalBolts }: Props) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const el = document.querySelector(hash);

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  }, [hash]);

  if (scores.length < 2) {
    return (
      <div className="rounded-xl bg-cyber-background/50 p-6">
        <h4 className="mb-4 font-app text-lg font-semibold text-cyber-text">{name}</h4>
        <p className="text-cyber-text-secondary">Нет данных о ходах</p>
      </div>
    );
  }

  // Вычисляем дельты (изменения между соседними значениями)
  const deltas = scores.slice(1).map((score, i) => score - scores[i]);

  // Только положительные приросты (игнорируем потери и нули)
  const positiveDeltas = deltas.filter((d) => d > 0);

  const totalGain = positiveDeltas.reduce((sum, d) => sum + d, 0);

  // Исправленный расчёт: сумма потерь по модулю
  const totalLoss = Math.abs(deltas.filter((d) => d < 0).reduce((sum, d) => sum + d, 0));

  const maxDelta = Math.max(...deltas); // Максимальная дельта
  const minPositiveDelta = positiveDeltas.length > 0 ? Math.min(...positiveDeltas) : 0; // Если положительных приростов не было — показываем 0
  const avgDelta = deltas.reduce((sum, d) => sum + d, 0) / deltas.length;

  return (
    <div className="space-y-4 rounded-xl bg-cyber-background/50 p-6">
      <h4 className="font-app text-lg font-semibold text-cyber-text">{name}</h4>

      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
        <div>
          <p className="flex justify-between">
            <span className="text-cyber-text-secondary">Всего набрано очков:</span>
            <span className="font-medium text-green-400">+{totalGain}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-cyber-text-secondary">Всего потеряно очков:</span>
            <span className="font-medium text-red-400">-{totalLoss}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-cyber-text-secondary">Всего болтов:</span>
            <span className="font-medium text-cyber-secondary">{totalBolts}</span>
          </p>
        </div>

        <div>
          <p className="flex justify-between">
            <span className="text-cyber-text-secondary">Наибольшая запись:</span>
            <span className="font-medium">+{maxDelta}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-cyber-text-secondary">Наименьшая запись:</span>
            <span className="font-medium">+{minPositiveDelta}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-cyber-text-secondary">Средняя запись:</span>
            <span className="font-medium">{avgDelta.toFixed(1)}</span>
          </p>
        </div>
      </div>
    </div>
  );
});

PlayerResults.displayName = 'PlayerResults';
