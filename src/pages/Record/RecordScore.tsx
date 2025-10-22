import type { JSX } from 'react';

export const RecordScore = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-[64px] leading-none">115</div>
      <p className="text-cyber-text-secondary mb-3 text-center font-mono text-xs tracking-wider">325 + 115 = 440</p>
    </div>
  );
};
