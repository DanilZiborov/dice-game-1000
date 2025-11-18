import type { JSX, ReactNode } from 'react';
import { clsx } from 'clsx';

type IconButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const IconButton = ({ children, onClick, className }: IconButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex h-10 w-10 items-center justify-center',
        'border-2 border-cyber-secondary',
        'font-cyber',
        'transition-colors duration-50 ease-in-out',
        'active:bg-cyber-secondary active:text-black',
        className || '',
      )}
    >
      {children}
    </button>
  );
};
