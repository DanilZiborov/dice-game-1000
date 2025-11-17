import { type JSX } from 'react';

type Props = {
  className?: string;
};

export const Dice4 = ({ className }: Props): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16" className={className || ''}>
      <title>Dice-2 SVG Icon</title>
      <g className="fill-cyber-secondary">
        <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z" />
        <path d="M5.5 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m8 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-8 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" />
      </g>
    </svg>
  );
};