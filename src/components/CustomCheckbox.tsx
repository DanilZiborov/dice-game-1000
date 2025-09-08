import type { JSX, ChangeEvent } from 'react';
import { clsx } from 'clsx';

type CustomCheckboxProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
};

export const CustomCheckbox = ({
  checked,
  onChange,
  label,
  className,
}: CustomCheckboxProps): JSX.Element => {
  return (
    <label className="inline-flex w-auto cursor-pointer gap-2 select-none">
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
      <span
        className={clsx(
          'relative flex h-5 w-5 items-center justify-center',
          'border-2 transition',
          checked
            ? 'border-cyber-secondary bg-cyber-primary' +
                ' shadow-[0_0_10px_theme(colors.cyber-secondary)]'
            : 'border-cyber-secondary bg-transparent shadow-none',
          className,
        )}
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="absolute h-full w-full text-white"
            stroke="currentColor"
            strokeWidth={4}
          >
            <line x1="0" y1="0" x2="28" y2="28" />
            <line x1="24" y1="0" x2="0" y2="24" />
          </svg>
        )}
      </span>
      {label && <span className="text-white">{label}</span>}
    </label>
  );
};
