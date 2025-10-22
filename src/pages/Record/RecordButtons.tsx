import type { JSX } from 'react';
import { clsx } from 'clsx';

const baseBtn = clsx(
  'flex w-[80px] items-center justify-center rounded-full border-2 bg-transparent transition-colors',
  'active:text-black',
  'active:bg-cyber-secondary',
);

const bigBtn = clsx(
  'h-[80px] text-2xl',
  'border-cyber-primary text-color-cyber-primary',
  'shadow-[0_0_10px_theme(colors.cyber-primary)]',
);

const smallBtn = clsx(
  'h-[35px] px-2 text-lg',
  'border-cyber-secondary text-color-cyber-primary',
  'shadow-[0_0_10px_theme(colors.cyber-secondary)]',
);

export const RecordButtons = (): JSX.Element => {
  return (
    <div className="mb-16">
      <div className="mb-5 flex justify-center gap-6">
        <button type="button" className={clsx(baseBtn, bigBtn)}>
          +5
        </button>
        <button type="button" className={clsx(baseBtn, bigBtn)}>
          +10
        </button>
        <button type="button" className={clsx(baseBtn, bigBtn)}>
          +50
        </button>
      </div>

      <div className="flex justify-evenly px-6">
        <button type="button" className={clsx(baseBtn, smallBtn, 'mb-4')}>
          +
        </button>
        <button type="button" className={clsx(baseBtn, smallBtn, 'mb-4 w-20 font-mono text-sm')}>
          сброс
        </button>
      </div>
    </div>
  );
};
