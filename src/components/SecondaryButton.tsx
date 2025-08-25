import type { JSX } from 'react';
import clsx from 'clsx';

type SecondaryButtonProps = {
  children: string;
  onClick?: () => void;
  className?: string;
};

export const SecondaryButton = ({
  children,
  onClick,
  className,
}: SecondaryButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'font-cyber relative inline-block px-4 py-2 tracking-wider uppercase',
        'border-cyber-secondary text-cyber-secondary border-2',
        'transition-all duration-150',
        'active:bg-cyber-secondary active:border-black active:text-black',
        'min-w-[150px]',
        'h-[42px]',
        className,
      )}
    >
      {children}
    </button>
  );
};
