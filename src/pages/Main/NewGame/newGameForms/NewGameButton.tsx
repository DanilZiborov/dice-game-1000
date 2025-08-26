import type { JSX } from 'react';

type Props = {
  onClick: () => void;
};

export const NewGameButton = ({ onClick }: Props): JSX.Element => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <button
        onClick={onClick}
        tabIndex={-1}
        className="border-cyber-secondary bg-cyber-primary flex h-60 w-60 items-center justify-center rounded-full border-2 text-xl shadow-[0_0_60px_var(--color-cyber-secondary)]"
      >
        <span className="text-3xl">новая партия</span>
      </button>
    </div>
  );
};
