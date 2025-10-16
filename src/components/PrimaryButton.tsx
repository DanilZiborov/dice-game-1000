import type { JSX } from 'react';
import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';

type PrimaryButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const PrimaryButton = ({ children, onClick, className, disabled }: PrimaryButtonProps): JSX.Element => {
  const [progress, setProgress] = useState(0); // 0..1
  const targetProgress = useRef(0); // к чему анимируем
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const DURATION = 800; // время удержания до срабатывания, ms
  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const animate = (time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    setProgress((prev) => {
      // скорость изменения прогресса в 1 секунду (delta в ms)
      const speed = 1 / DURATION;
      let next = prev;

      if (targetProgress.current > prev) {
        next = Math.min(prev + speed * delta, targetProgress.current);
        if (next === 1) onClick?.();
      } else if (targetProgress.current < prev) {
        next = Math.max(prev - speed * delta, targetProgress.current);
      }

      return next;
    });

    rafRef.current = requestAnimationFrame(animate);
  };

  const startHold = () => {
    if (disabled) return;
    targetProgress.current = 1;

    if (!rafRef.current) {
      lastTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  const stopHold = () => {
    targetProgress.current = 0;

    if (!rafRef.current) {
      lastTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={startHold}
      onMouseUp={stopHold}
      onMouseLeave={stopHold}
      onTouchStart={startHold}
      onTouchEnd={stopHold}
      className={clsx(
        'font-cyber relative inline-block px-1 py-1 tracking-wider uppercase',
        'transition',
        'group',
        'h-[40px]',
        'min-w-[150px]',
        disabled ? 'text-cyber-disabled' : 'text-white',
        className || '',
        'select-none',
      )}
    >
      {!disabled && (
        <div
          className={clsx(
            'absolute inset-0 z-5 h-full w-full',
            'bg-cyber-secondary skew-x-[-15deg]',
            'translate-x-2 translate-y-2',
            'group-active:translate-x-1 group-active:translate-y-1',
            'shadow-[0_0_20px_theme(colors.cyber-secondary)]',
            'transition',
          )}
        />
      )}

      <div
        className={clsx(
          'absolute inset-0 z-10 h-full w-full skew-x-[-15deg]',
          'transition',
          disabled
            ? 'border-none bg-gray-500'
            : 'bg-cyber-primary border-cyber-secondary border group-active:translate-x-1 group-active:translate-y-1',
        )}
      />

      {!disabled && (
        <svg className="absolute top-1/2 left-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2">
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            className="stroke-cyber-secondary"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            strokeLinecap="round"
            transform={`rotate(-90 ${120 / 2} ${120 / 2})`}
          />
        </svg>
      )}

      <p className="relative z-20 transition group-active:translate-x-1 group-active:translate-y-1">{children}</p>
    </button>
  );
};
