import type { JSX } from 'react';
import type { Player } from 'shared/types';

type Props = { player: Player };

// Минималистичный болт
const BoltIcon = (): JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-cyber-secondary inline-block"
  >
    {/* Скруглённая шляпка */}
    <rect x="3" y="1" width="10" height="4" rx="2" fill="currentColor" />

    {/* Ножка */}
    <rect x="6" y="5" width="4" height="10" rx="1" fill="currentColor" />

    {/* Резьба (тонкие линии) */}
    <line x1="6" y1="8" x2="10" y2="8" stroke="black" strokeWidth="0.5" />
    <line x1="6" y1="10" x2="10" y2="10" stroke="black" strokeWidth="0.5" />
    <line x1="6" y1="12" x2="10" y2="12" stroke="black" strokeWidth="0.5" />
    <line x1="6" y1="14" x2="10" y2="14" stroke="black" strokeWidth="0.5" />
  </svg>
);

const FailIcon = (): JSX.Element => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    {/* Круг */}
    <circle cx="5" cy="5" r="4.5" stroke="#FF4D4D" strokeWidth="1" fill="none" />
    {/* Крест — концы касаются круга */}
    <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="#FF4D4D" strokeWidth="1" />
    <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="#FF4D4D" strokeWidth="1" />
  </svg>
);

export const PlayerRow = ({ player }: Props): JSX.Element => {
  return (
    <div className={'border-cyber-secondary flex h-20 items-center justify-between border-b px-3'}>
      <div className="flex flex-col items-start justify-start">
        <span className="text-base">{player.name}</span>
        <div className="mt-1 flex gap-0.5">
          <BoltIcon />
          <BoltIcon />
          <BoltIcon />
        </div>
      </div>

      {/* Правая колонка: счёт + черепа */}
      <div className="flex flex-col items-end justify-start">
        <span className="text-lg tracking-wider">{player.score}</span>
        <div className="mt-1 flex gap-1">
          <FailIcon />
          <FailIcon />
          <FailIcon />
        </div>
      </div>
    </div>
  );
};
