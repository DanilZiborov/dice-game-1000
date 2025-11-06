import type { JSX } from 'react';

export const BoltIcon = (): JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-cyber-secondary block"
  >
    {/* Шляпка */}
    <rect x="3" y="1" width="10" height="4" rx="2" fill="currentColor" />

    {/* Ножка */}
    <rect x="6" y="5" width="4" height="10" rx="1" fill="currentColor" />

    {/* Резьба */}
    <line x1="6" y1="8" x2="10" y2="8" stroke="black" strokeWidth="0.5" />
    <line x1="6" y1="10" x2="10" y2="10" stroke="black" strokeWidth="0.5" />
    <line x1="6" y1="12" x2="10" y2="12" stroke="black" strokeWidth="0.5" />
    <line x1="6" y1="14" x2="10" y2="14" stroke="black" strokeWidth="0.5" />
  </svg>
);
