import type { JSX } from 'react';
import { useRef } from 'react';
import clsx from 'clsx';

type CustomNumericInputWithStepsProps = {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  className?: string;
};

export const CustomNumericInputWithSteps = ({
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  className,
}: CustomNumericInputWithStepsProps): JSX.Element => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clamp = (val: number): number => {
    if (max !== undefined) return Math.min(Math.max(min, val), max);

    return Math.max(min, val);
  };

  const updateValue = (delta: number): void => {
    onChange(clamp(value + delta));
  };

  const handleMouseDown = (delta: number): void => {
    updateValue(delta);
    intervalRef.current = setInterval(() => updateValue(delta), 150);
  };

  const handleMouseUp = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <button
        type="button"
        className={clsx(
          'flex h-7 w-7 items-center justify-center rounded-full border-2 transition' +
            ' active:scale-95',
          'border-cyber-primary text-cyber-primary',
          'shadow-[0_0_5px_theme(colors.cyber-primary)]',
          'hover:bg-cyber-primary hover:text-black',
          'select-none',
        )}
        onMouseDown={() => handleMouseDown(-step)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        –
      </button>

      <input
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className={clsx(
          'w-13 rounded-md border px-2 py-1 text-center text-white',
          'border-cyber-primary border-2',
          'shadow-[0_0_7px_theme(colors.cyber-primary)]',
          'focus:border-pink-100 focus:outline-none',
          'focus:shadow-[0_0_10px_theme(colors.cyber-primary)]',
          'tracking-wider',
        )}
      />

      <button
        type="button"
        className={clsx(
          'flex h-7 w-7 items-center justify-center rounded-full border-2 transition' +
            ' active:scale-95',
          'border-cyber-primary text-cyber-primary',
          'shadow-[0_0_5px_theme(colors.cyber-primary)]',
          'hover:bg-cyber-primary hover:text-black',
          'select-none',
        )}
        onMouseDown={() => handleMouseDown(step)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        +
      </button>
    </div>
  );
};
