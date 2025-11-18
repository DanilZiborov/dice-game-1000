import type { ChangeEvent, JSX, RefObject } from 'react';
import { clsx } from 'clsx';

type CustomInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  className?: string;
  ref: RefObject<HTMLInputElement | null> | null;
  maxLength?: number;
};

export const CustomInput = ({
  value,
  onChange,
  label,
  placeholder,
  className,
  ref,
  maxLength,
}: CustomInputProps): JSX.Element => {
  return (
    <div className="flex grow flex-col">
      <label className="mb-1 text-sm text-cyber-primary">{label}</label>
      <input
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-md border px-3 py-2 tracking-wide text-white',
          'transition-all placeholder:text-slate-300',
          'border-cyber-primary',
          'border-2',
          'shadow-[0_0_10px_theme(colors.cyber-primary)]',
          'focus:border-pink-100 focus:outline-none',
          'focus:shadow-[0_0_25px_theme(colors.cyber-primary)]',
          'transition',
          className || '',
        )}
        ref={ref}
      />
    </div>
  );
};
