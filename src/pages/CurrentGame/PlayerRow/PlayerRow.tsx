import type { JSX } from 'react';
import type { Player } from 'shared/types';
import { RepeatComponent } from 'shared/utils/RepeatComponent';
import { clsx } from 'clsx';
import { usePlayerStatus } from 'shared/hooks/usePlayerStatus';
import { BoltIcon, FailIcon, ShovelIcon } from 'components';
import { useEffect, useRef, useState } from 'react';
import { useOvertake } from 'pages/CurrentGame/PlayerRow/useOvertake';

type Props = { player: Player; selectedPlayer: Player | null; onSelectPlayer: (player: Player) => void };

export const PlayerRow = ({ player, selectedPlayer, onSelectPlayer }: Props): JSX.Element => {
  const { isOnBarrel, isInPit } = usePlayerStatus({ player });

  const [displayScore, setDisplayScore] = useState(player.score);
  const prevScoreRef = useRef(player.score);

  const [diff, setDiff] = useState<number | null>(null);

  // шаг для плавного изменения очков
  const getStep = (delta: number): number => {
    if (delta > 100) return 10;
    if (delta > 50) return 5;
    if (delta > 20) return 2;

    return 1;
  };

  useOvertake({ selectedPlayer, currentPlayer: player });

  useEffect(() => {
    const prev = prevScoreRef.current;
    const next = player.score;
    if (prev === next) return;

    let current = prev;

    const animate = (): void => {
      if (current === next) return;

      const delta = next - current;
      const step = getStep(Math.abs(delta));

      if (delta > 0) current = Math.min(current + step, next);
      else current = Math.max(current - step, next);

      setDisplayScore(current);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevScoreRef.current = next;

    // если уменьшилось — показать отрицательную разницу
    if (next < prev) {
      setDiff(prev - next);
      const timer = setTimeout(() => setDiff(null), 1200); // удаляем через 1.2 сек

      return () => clearTimeout(timer);
    }
  }, [player.score]);

  // console.log(prevScoreRef.current);
  // console.log(player.score)

  return (
    <div
      onClick={() => onSelectPlayer(player)}
      className="border-cyber-secondary relative flex h-20 flex-col justify-center overflow-hidden border-b px-3"
    >
      <div className="flex items-center justify-between">
        <span className="relative flex items-center gap-2">
          {player.name}

          {/* отрицательная разница */}
          {diff !== null && (
            <span className="animate-float-diff absolute -right-20 text-[36px] font-bold text-red-500">-{diff}</span>
          )}
        </span>

        <div className="flex items-center gap-1">
          {isInPit && <ShovelIcon />}
          <span
            className={clsx('text-lg tracking-wider transition-colors duration-300', isOnBarrel && 'text-yellow-500')}
          >
            {displayScore}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="mt-1 flex gap-0.5">
          <RepeatComponent count={player.boltsNumber}>
            <BoltIcon />
          </RepeatComponent>
        </div>

        <div className="mt-1 flex gap-1">
          <RepeatComponent count={player.failsNumber}>
            <FailIcon />
          </RepeatComponent>
        </div>
      </div>
    </div>
  );
};
