import type { JSX } from 'react';
import { clsx } from 'clsx';
import { useState } from 'react';

const baseBtn = clsx(
  'flex w-[80px] items-center justify-center rounded-full border-2 bg-transparent transition-colors',
  'active:text-black',
  'active:bg-cyber-secondary',
);

const bigBtn = clsx(
  'h-[80px] text-2xl',
  'border-cyber-primary text-color-cyber-primary',
  'shadow-[0_0_10px_theme(colors.cyber-primary)]',
);

const smallBtn = clsx(
  'h-[35px] px-2 text-lg',
  'border-cyber-secondary text-color-cyber-primary',
  'shadow-[0_0_10px_theme(colors.cyber-secondary)]',
);

const BUTTONS_CONFIG = [5, 10, 50];

type Props = {
  score: number;
  points: number;
  onSetPoints: (newPoints: number) => void;
};

export const RecordButtons = ({ score, points, onSetPoints }: Props): JSX.Element => {
  const [isPositive, setIsPositive] = useState(true);

  const togglePositive = (): void => setIsPositive((prev) => !prev);

  const handleSetZero = (): void => {
    onSetPoints(0);
  };

  const handleChangePoints = (delta: number): void => {
    const num = isPositive ? delta : -delta;

    // запрещает уход общего счёта игрока в минус
    if (!isPositive && score + points + num < 0) {
      return;
    }

    onSetPoints(points + num);
  };

  return (
    <div className="mb-16">
      <div className="mb-5 flex justify-center gap-6">
        {BUTTONS_CONFIG.map((value) => (
          <button key={value} type="button" className={clsx(baseBtn, bigBtn)} onClick={() => handleChangePoints(value)}>
            {isPositive ? `+${value}` : `-${value}`}
          </button>
        ))}
      </div>

      <div className="flex justify-evenly px-6">
        <button onClick={togglePositive} type="button" className={clsx(baseBtn, smallBtn, 'mb-4')}>
          {isPositive ? '+' : '-'}
        </button>
        <button
          onClick={handleSetZero}
          type="button"
          className={clsx(baseBtn, smallBtn, 'mb-4 w-20 font-mono text-sm')}
        >
          сброс
        </button>
      </div>
    </div>
  );
};
