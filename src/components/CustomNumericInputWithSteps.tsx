import type { JSX } from 'react';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

type CustomNumericInputWithStepsProps = {
  value: number;
  onChange: (value: number) => void;
  step: number;
  min: number;
  max: number;
  className?: string;
};

const initialDelay = 300; // задержка
const repeatMs = 200; // интервал увеличения счетчика

export const CustomNumericInputWithSteps = ({
  value,
  onChange,
  step,
  min,
  max,
  className,
}: CustomNumericInputWithStepsProps): JSX.Element => {
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const activePointerRef = useRef<number | null>(null);

  // ref для актуального value
  const valueRef = useRef<number>(value);

  const clamp = (val: number): number => Math.min(Math.max(min, val), max);

  const makeStep = (delta: number): void => {
    const current = valueRef.current;

    const rounded = Math.round(current / step) * step;

    let next: number;

    if (Math.abs(current - rounded) < Number.EPSILON * 10) {
      // текущее значение считаем кратным step
      next = current + delta;
    } else if (delta > 0) {
      next = Math.ceil(current / step) * step;
    } else {
      next = Math.floor(current / step) * step;
    }

    next = clamp(Number(next.toFixed(10))); // защита от "0.30000000004"

    valueRef.current = next;
    onChange(next);
  };

  const stop = (e: React.PointerEvent | React.SyntheticEvent) => {
    const pid = activePointerRef.current;

    if (pid !== null && 'currentTarget' in (e as any)) {
      try {
        (e as React.PointerEvent).currentTarget.releasePointerCapture(pid);
      } catch {}
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    activePointerRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const renderButton = (delta: number, label: string) => (
    <button
      type="button"
      className={clsx(
        'flex h-7 w-7 items-center justify-center rounded-full border-2 transition select-none',
        'border-cyber-primary text-cyber-primary shadow-[0_0_5px_theme(colors.cyber-primary)]',
        'active:bg-cyber-primary active:scale-85 active:text-black',
      )}
      onPointerDown={(e) => {
        if (activePointerRef.current !== null) return;
        activePointerRef.current = e.pointerId;
        const target = e.currentTarget as Element;

        try {
          target.setPointerCapture(e.pointerId);
        } catch {
          /* empty */
        }

        makeStep(delta);

        timeoutRef.current = window.setTimeout(() => {
          intervalRef.current = window.setInterval(() => {
            makeStep(delta);
          }, repeatMs);
        }, initialDelay);
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {renderButton(-step, '–')}

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          let val = e.target.value;

          if (!/^\d*$/.test(val)) return;
          val = val.replace(/^0+(?=\d)/, '');

          const newVal = clamp(Number(val));

          onChange(newVal);
          valueRef.current = newVal;
        }}
        className={clsx(
          'w-14 rounded-md border px-2 py-1 text-center text-white',
          'border-cyber-primary shadow-[0_0_7px_theme(colors.cyber-primary)] border-2',
          'focus:shadow-[0_0_10px_theme(colors.cyber-primary)] focus:border-pink-100 focus:outline-none',
          'appearance-none tracking-wider',
        )}
      />

      {renderButton(step, '+')}
    </div>
  );
};
