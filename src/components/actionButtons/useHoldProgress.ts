import { useState, useRef, useEffect, useCallback } from 'react';

type UseHoldProgressParams = {
  onClick?: () => void;
  disabled?: boolean;
  withDelay?: boolean;
  svgSize?: number; // размер SVG (для Primary/Secondary)
};

type Returns = {
  progress: number;
  bind: {
    onClick: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onMouseLeave?: () => void;
    onTouchStart?: () => void;
    onTouchEnd?: () => void;
  };
  circleProps: {
    cx: number;
    cy: number;
    r: number;
    strokeDasharray: number;
    strokeDashoffset: number;
    transform: string;
  };
};

const DURATION = 350; // ms

// TODO: изучить код тут подробнее

/**
 * Универсальный хук для кнопок с режимом удержания.
 * - При `withDelay = false` срабатывает обычный клик.
 * - При `withDelay = true` выполняет `onClick` только после полного заполнения круга.
 *
 * Возвращает:
 * - `progress` — текущий прогресс от 0 до 1
 * - `bind` — объект с обработчиками событий (привязывается к кнопке)
 * - `circleProps` — рассчитанные атрибуты SVG-круга для визуализации прогресса
 */
export const useHoldProgress = ({ onClick, disabled, withDelay, svgSize = 120 }: UseHoldProgressParams): Returns => {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const onClickRef = useRef(onClick);

  // держим актуальный onClick
  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  /** Анимация заполнения круга */
  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    setProgress((prev) => {
      const speed = 1 / DURATION;
      let next = prev;

      if (targetProgress.current > prev) {
        next = Math.min(prev + speed * delta, targetProgress.current);
        if (next === 1) onClickRef.current?.();
      } else if (targetProgress.current < prev) {
        next = Math.max(prev - speed * delta, targetProgress.current);
      }

      // останавливаем RAF, если достигли цели
      if (next === targetProgress.current) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }

      return next;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  /** Начало удержания */
  const startHold = useCallback(() => {
    if (disabled || !withDelay) return;
    targetProgress.current = 1;

    if (!rafRef.current) {
      lastTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [disabled, withDelay, animate]);

  /** Завершение удержания */
  const stopHold = useCallback(() => {
    if (!withDelay) return;
    targetProgress.current = 0;

    if (!rafRef.current) {
      lastTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [withDelay, animate]);

  /** Обычный клик (без задержки) */
  const handleClick = useCallback(() => {
    if (!withDelay && !disabled) onClickRef.current?.();
  }, [disabled, withDelay]);

  // Очистка
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /** Геометрия круга */
  const PADDING = 6;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const r = cx - PADDING;
  const circumference = 2 * Math.PI * r;

  const circleProps = {
    cx,
    cy,
    r,
    strokeDasharray: circumference,
    strokeDashoffset: circumference * (1 - progress),
    transform: `rotate(-90 ${cx} ${cy})`,
  };

  /** Обработчики событий для кнопки */
  const bind = {
    onClick: handleClick,
    onMouseDown: withDelay ? startHold : undefined,
    onMouseUp: withDelay ? stopHold : undefined,
    onMouseLeave: withDelay ? stopHold : undefined,
    onTouchStart: withDelay ? startHold : undefined,
    onTouchEnd: withDelay ? stopHold : undefined,
  };

  return { progress, bind, circleProps };
};
