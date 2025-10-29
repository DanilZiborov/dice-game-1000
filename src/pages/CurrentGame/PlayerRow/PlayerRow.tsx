import type { JSX } from 'react';
import type { Player } from 'shared/types';
import { useNavigate } from 'react-router-dom';
import { RepeatComponent } from 'shared/utils/RepeatComponent';
import { clsx } from 'clsx';
import { usePlayerStatus } from 'shared/hooks/usePlayerStatus';
import { BoltIcon, FailIcon, ShovelIcon } from 'components';

type Props = { player: Player };

export const PlayerRow = ({ player }: Props): JSX.Element => {
  const navigate = useNavigate();

  const { isOnBarrel, isInPit } = usePlayerStatus({ player });

  return (
    <div
      onClick={() => navigate(`/game/record/${player.id}`)}
      className="border-cyber-secondary flex h-20 flex-col justify-center border-b px-3"
    >
      <div className="flex items-center justify-between">
        <span>{player.name}</span>
        <div className="flex items-center gap-1">
          {isInPit && <ShovelIcon />}
          <span className={clsx('text-lg tracking-wider', isOnBarrel && 'text-yellow-500')}>{player.score}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="mt-1 flex gap-0.5">
          <RepeatComponent count={player.boltsNumber}>
            <BoltIcon />
          </RepeatComponent>
        </div>

        <div className="mt-1 flex gap-1">
          <RepeatComponent count={player.failsNumber}>
            <FailIcon />
          </RepeatComponent>
        </div>
      </div>
    </div>
  );
};
