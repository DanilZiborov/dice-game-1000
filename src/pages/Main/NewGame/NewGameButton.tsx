import type { JSX } from 'react';

export const NewGameButton = (): JSX.Element => {
  return (
    <button
      tabIndex={-1}
      className="border-cyber-yellow bg-cyber-purple flex h-60 w-60 items-center justify-center rounded-full border-2 text-xl shadow-[0_0_60px_var(--color-cyber-yellow)]"
    >
      <span className="text-3xl">начать игру</span>
    </button>
  );
};
