import type { JSX } from 'react';

export const FailIcon = (): JSX.Element => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block"
  >
    {/* Круг */}
    <circle cx="5" cy="5" r="4.5" strokeWidth="1" fill="#FF4D4D" />
    {/* Крест */}
    {/*<line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="#FF4D4D" strokeWidth="1" />*/}
    {/*<line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="#FF4D4D" strokeWidth="1" />*/}
  </svg>
);
