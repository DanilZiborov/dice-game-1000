import type { JSX } from 'react';
import clsx from 'clsx';

type PrimaryButtonProps = {
  children: string;
  onClick?: () => void;
  className?: string;
};

export const PrimaryButton = ({
  children,
  onClick,
  className,
}: PrimaryButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'font-cyber relative inline-block px-1 py-1 tracking-wider text-white uppercase',
        'transition-all duration-150',
        'group',
        'h-[40px]',
        'min-w-[150px]',
        className,
      )}
    >
      {/* Нижний прямоугольник (подложка) */}
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

      {/* Верхний прямоугольник */}
      <div
        className={clsx(
          'absolute inset-0 z-10 h-full w-full',
          'bg-cyber-primary skew-x-[-15deg]',
          'transition-all duration-150',
          'group-active:translate-x-1 group-active:translate-y-1',
          'border-cyber-secondary border',
        )}
      />

      {/* Текст поверх */}
      <span className="relative z-20">{children}</span>
    </button>
  );
};
