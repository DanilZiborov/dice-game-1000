import type { JSX } from 'react';
import { clsx } from 'clsx';
import { useHoldProgress } from 'components/actionButtons/useHoldProgress';

type SecondaryButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  withDelay?: boolean;
};

export const SecondaryButton = ({
  children,
  onClick,
  disabled,
  className,
  withDelay = false,
}: SecondaryButtonProps): JSX.Element => {
  const { bind, circleProps } = useHoldProgress({
    onClick,
    disabled,
    withDelay,
    svgSize: 100,
  });

  return (
    <button
      type="button"
      disabled={disabled}
      {...bind}
      className={clsx(
        'font-cyber relative inline-block px-4 py-2 tracking-wider uppercase',
        'h-[42px] min-w-[150px] border-2 transition select-none',
        'text-cyber-secondary border-cyber-secondary',
        'active:bg-cyber-secondary active:border-black active:text-black',
        'disabled:text-cyber-disabled disabled:border-cyber-disabled',
        className,
      )}
    >
      {withDelay && !disabled && (
        <svg
          className="pointer-events-none absolute top-1/2 left-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 100 100"
        >
          <circle
            {...circleProps}
            className="stroke-cyber-secondary opacity-70"
            fill="transparent"
            strokeLinecap="round"
            strokeWidth={2}
          />
        </svg>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
