import type { JSX } from 'react';
import type { Player } from 'shared/types';

type Props = {
  points: number;
  player: Player;
};

export const RecordScore = ({ points, player }: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-[64px] leading-none">{points}</div>
      <p className="text-cyber-text-secondary mb-3 text-center font-mono text-xs tracking-wider">{`${player.data.score} + ${points} = ${player.data.score + points}`}</p>
    </div>
  );
};
