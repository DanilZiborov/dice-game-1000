import type { JSX } from 'react';
import type { Player } from 'shared/types';

type Props = {
  points: number;
  player: Player;
  truck: boolean;
};

export const RecordScore = ({ points, player, truck }: Props): JSX.Element => {
  const additionalText = truck ? `сейчас ${player.score}` : `${player.score} + ${points} = ${player.score + points}`;

  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-[64px] leading-none">{points}</div>
      <p className="mb-3 text-center font-mono text-xs tracking-wider text-cyber-text-secondary">{additionalText}</p>
    </div>
  );
};
