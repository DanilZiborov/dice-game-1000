import type { JSX } from 'react';
import { clsx } from 'clsx';
import { useHoldProgress } from 'components/actionButtons/useHoldProgress';

type PrimaryButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  /**
   * Режим с удержанием — при true клик срабатывает только после полного заполнения круга.
   */
  withDelay?: boolean;
};

// Константы стилей
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
  const { bind, circleProps } = useHoldProgress({
    onClick,
    disabled,
    withDelay,
    svgSize: 120,
  });

  return (
    <button
      type="button"
      disabled={disabled}
      {...bind}
      className={clsx(baseBtn, disabled ? disabledBtnStyle : enabledBtnStyle, className)}
    >
      {!disabled && <div className={overlayStyle} />}
      <div className={clsx(disabled ? mainLayerDisabled : mainLayerEnabled)} />

      {/* SVG-индикатор удержания */}
      {withDelay && !disabled && (
        <svg
          className="pointer-events-none absolute top-1/2 left-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 120 120"
        >
          <circle {...circleProps} className="stroke-cyber-secondary" fill="transparent" strokeWidth={2} />
        </svg>
      )}

      <p className={textStyle}>{children}</p>
    </button>
  );
};
