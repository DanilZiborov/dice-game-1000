import type { JSX } from 'react';

type ArrowIconProps = {
  direction?: 'up' | 'down' | 'left' | 'right';
};

export const ArrowIcon = ({ direction = 'right' }: ArrowIconProps): JSX.Element => {
  let rotateClass = '';

  switch (direction) {
    case 'up':
      rotateClass = '-rotate-90';
      break;
    case 'down':
      rotateClass = 'rotate-90';
      break;
    case 'left':
      rotateClass = 'rotate-180';
      break;
    // right — по умолчанию
  }

  return (
    <svg viewBox="0 0 15.698 8.706" className={`h-5 w-5 stroke-cyber-text transition-transform ${rotateClass}`}>
      <polygon points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 " />
    </svg>
  );
};
