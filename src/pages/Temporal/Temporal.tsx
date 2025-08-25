import type { JSX } from 'react';
import { NewGame } from 'pages/Main/NewGame';

// для тестов и экспериментов
export const Temporal = (): JSX.Element => {
  return (
    <div>
      <input className="bg-amber-50 text-black" />
      <div className="h-2 bg-amber-500" />
    </div>
  );
};
