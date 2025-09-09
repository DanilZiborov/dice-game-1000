import type { JSX } from 'react';
import { clsx } from 'clsx';

type SecondaryButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const SecondaryButton = ({ children, onClick, disabled, className }: SecondaryButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'font-cyber relative inline-block px-4 py-2 tracking-wider uppercase',
        'h-[42px] min-w-[150px] border-2 transition',
        'text-cyber-secondary border-cyber-secondary',
        'active:bg-cyber-secondary active:border-black active:text-black',
        'disabled:text-cyber-disabled disabled:border-cyber-disabled',
        className || '',
      )}
    >
      {children}
    </button>
  );
};
