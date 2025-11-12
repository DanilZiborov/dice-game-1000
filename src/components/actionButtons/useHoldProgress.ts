import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';

type UseHoldProgressParams = {
  onClick?: () => void;
  disabled?: boolean;
  withDelay?: boolean;
  svgSize?: number;
};

type Returns = {
  progress: number;
  bind: {
    onClick: (e: ReactMouseEvent<HTMLButtonElement>) => void;
    onMouseDown?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
    onMouseUp?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
    onTouchStart?: (e: ReactTouchEvent<HTMLButtonElement>) => void;
    onTouchEnd?: (e: ReactTouchEvent<HTMLButtonElement>) => void;
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

export const useHoldProgress = ({ onClick, disabled, withDelay, svgSize = 120 }: UseHoldProgressParams): Returns => {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const onClickRef = useRef(onClick);

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

        // когда прогресс достиг 1, выполняем действие
        if (next === 1) {
          // временная блокировка pointer-events на body чтобы предотвратить паразитный клик на элементе, который появится под пальцем

          document.body.style.pointerEvents = 'none';
          onClickRef.current?.();
          setTimeout(() => {
            document.body.style.pointerEvents = 'auto';
          }, 200); // 200ms достаточно, чтобы браузер не сгенерировал лишний клик
        }
      } else if (targetProgress.current < prev) {
        next = Math.max(prev - speed * delta, targetProgress.current);
      }

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
  const startHoldMouse = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled || !withDelay) return;
      targetProgress.current = 1;

      if (!rafRef.current) {
        lastTimeRef.current = null;
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [disabled, withDelay, animate],
  );

  const startHoldTouch = useCallback(
    (e: ReactTouchEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled || !withDelay) return;
      targetProgress.current = 1;

      if (!rafRef.current) {
        lastTimeRef.current = null;
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [disabled, withDelay, animate],
  );

  /** Завершение удержания */
  const stopHoldMouse = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!withDelay) return;
      targetProgress.current = 0;

      if (!rafRef.current) {
        lastTimeRef.current = null;
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [withDelay, animate],
  );

  const stopHoldTouch = useCallback(
    (e: ReactTouchEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!withDelay) return;
      targetProgress.current = 0;

      if (!rafRef.current) {
        lastTimeRef.current = null;
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [withDelay, animate],
  );

  /** Обычный клик */
  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!withDelay && !disabled) onClickRef.current?.();
    },
    [disabled, withDelay],
  );

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

  /** Обработчики событий */
  const bind = {
    onClick: handleClick,
    onMouseDown: withDelay ? startHoldMouse : undefined,
    onMouseUp: withDelay ? stopHoldMouse : undefined,
    onMouseLeave: withDelay ? stopHoldMouse : undefined,
    onTouchStart: withDelay ? startHoldTouch : undefined,
    onTouchEnd: withDelay ? stopHoldTouch : undefined,
  };

  return { progress, bind, circleProps };
};
