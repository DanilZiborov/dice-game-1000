import type { JSX } from 'react';

type Props = {
  onClick?: () => void;
};

export const NewGameButton = ({ onClick }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      tabIndex={-1}
      className="border-cyber-yellow bg-cyber-purple flex h-60 w-60 items-center justify-center rounded-full border-2 text-xl shadow-[0_0_60px_var(--color-cyber-yellow)]"
    >
      <span className="text-3xl">начать игру</span>
    </button>
  );
};
