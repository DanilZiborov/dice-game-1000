import type { JSX } from 'react';
import { clsx } from 'clsx';
import { useState, useRef, useEffect, useCallback } from 'react';

type PrimaryButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  withDelay?: boolean; // true — с задержкой (по удержанию), false — обычный клик
};

const DURATION = 250; // ms
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Общие стили
const baseBtn = clsx(
  'font-cyber relative inline-block px-1 py-1 tracking-wider uppercase',
  'transition group h-[40px] min-w-[150px] select-none',
);

const disabledBtnStyle = 'text-cyber-text-secondary pointer-events-none';
const enabledBtnStyle = 'text-white';

const overlayStyle = clsx(
  'absolute inset-0 z-5 h-full w-full',
  'bg-cyber-secondary skew-x-[-15deg]',
  'translate-x-2 translate-y-2',
  'group-active:translate-x-1 group-active:translate-y-1',
  'shadow-[0_0_20px_theme(colors.cyber-secondary)]',
  'transition',
);

const mainLayerEnabled = clsx(
  'absolute inset-0 z-10 h-full w-full skew-x-[-15deg]',
  'transition',
  'bg-cyber-primary border-cyber-secondary border group-active:translate-x-1 group-active:translate-y-1',
);

const mainLayerDisabled = clsx(
  'absolute inset-0 z-10 h-full w-full skew-x-[-15deg]',
  'transition',
  'bg-cyber-disabled border-none',
);

const textStyle = 'relative z-20 text-inherit transition group-active:translate-x-1 group-active:translate-y-1';

export const PrimaryButton = ({
  children,
  onClick,
  className,
  disabled,
  withDelay = false,
}: PrimaryButtonProps): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const onClickRef = useRef(onClick);

  // обновляем ref при каждом изменении пропа onClick, чтобы onClick оставался актуальным
  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    setProgress((prev) => {
      const speed = 1 / DURATION;
      let next = prev;

      if (targetProgress.current > prev) {
        next = Math.min(prev + speed * delta, targetProgress.current);

        if (next === 1) {
          onClickRef.current?.();
        }
      } else if (targetProgress.current < prev) {
        next = Math.max(prev - speed * delta, targetProgress.current);
      }

      return next;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // 🔹 обработчики для режима с удержанием
  const startHold = useCallback(() => {
    if (disabled || !withDelay) return;
    targetProgress.current = 1;

    if (!rafRef.current) {
      lastTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [disabled, withDelay, animate]);

  const stopHold = useCallback(() => {
    if (!withDelay) return;
    targetProgress.current = 0;

    if (!rafRef.current) {
      lastTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [withDelay, animate]);

  // 🔹 обработчик обычного клика (без задержки)
  const handleClick = useCallback(() => {
    if (disabled) return;
    if (!withDelay) onClickRef.current?.();
  }, [disabled, withDelay]);

  // очистка requestAnimationFrame при размонтировании
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={withDelay ? startHold : undefined}
      onMouseUp={withDelay ? stopHold : undefined}
      onMouseLeave={withDelay ? stopHold : undefined}
      onTouchStart={withDelay ? startHold : undefined}
      onTouchEnd={withDelay ? stopHold : undefined}
      className={clsx(baseBtn, disabled ? disabledBtnStyle : enabledBtnStyle, className)}
    >
      {!disabled && <div className={overlayStyle} />}

      <div className={clsx(disabled ? mainLayerDisabled : mainLayerEnabled)} />

      {withDelay && !disabled && (
        <svg className="absolute top-1/2 left-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2">
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            className="stroke-cyber-secondary"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            strokeLinecap="round"
            transform={`rotate(-90 ${120 / 2} ${120 / 2})`}
          />
        </svg>
      )}

      <p className={textStyle}>{children}</p>
    </button>
  );
};
