import type { JSX } from 'react';
import clsx from 'clsx';

type PrimaryButtonProps = {
  children: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const PrimaryButton = ({
  children,
  onClick,
  className,
  disabled = false,
}: PrimaryButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'font-cyber relative inline-block px-1 py-1 tracking-wider uppercase',
        'transition-all duration-150',
        'group',
        'h-[40px]',
        'min-w-[150px]',
        disabled ? 'cursor-not-allowed text-gray-400' : 'text-white',
        className,
      )}
    >
      {/* Нижний прямоугольник (подложка) */}
      {!disabled && (
        <div
          className={clsx(
            'absolute inset-0 z-5 h-full w-full',
            'bg-cyber-secondary skew-x-[-15deg]',
            'translate-x-2 translate-y-2',
            'group-active:translate-x-1 group-active:translate-y-1',
            'shadow-[0_0_20px_theme(colors.cyber-secondary)]',
            'transition-all duration-150',
          )}
        />
      )}

      {/* Верхний прямоугольник */}
      <div
        className={clsx(
          'absolute inset-0 z-10 h-full w-full skew-x-[-15deg]',
          'transition-all duration-150',
          disabled
            ? 'border-none bg-gray-500'
            : 'bg-cyber-primary border-cyber-secondary border group-active:translate-x-1 group-active:translate-y-1',
        )}
      />

      {/* Текст поверх */}
      <span className="relative z-20">{children}</span>
    </button>
  );
};
