import type { JSX } from 'react';
import { ArrowIcon } from 'components/icons';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import type { Player } from 'shared/types';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { RepeatComponent } from 'shared/utils/RepeatComponent';
import { BoltIcon } from 'pages/CurrentGame/PlayerRow/PlayerRow';

const cellBase =
  'flex h-[16px] w-[36px] items-center justify-center font-mono text-[10px] leading-none tracking-widest';
const cellBorder = 'border border-cyber-text-secondary border-r';
const cellLast = 'border border-cyber-text-secondary';

type Props = {
  player: Player;
};

export const RecordHeader = ({ player }: Props): JSX.Element => {
  const navigate = useNavigate();

  const {
    state: { game },
  } = useCurrentGame();

  return (
    <div className="w-full">
      {/*Игрок*/}
      <div className="flex items-center justify-between">
        <div onClick={() => navigate('/game')}>
          <ArrowIcon direction="left" />
        </div>
        <h1 className="text-[24px]">{player.name}</h1>
        <div className="w-[20px]" />
      </div>

      <div className="flex flex-col items-center gap-1">
        {/*Статусы*/}
        <div className="flex gap-1">
          <RepeatComponent count={player.boltsNumber}>
            <BoltIcon />
          </RepeatComponent>
        </div>

        {/*Доп. инфо*/}
        <p className="text-cyber-text-secondary text-center font-mono text-xs">прыжок из ямы: 75</p>

        {/*Сетка для easyWin*/}
        {game?.withEasyWin && (
          <div className="mb-2 flex">
            <div className={clsx(cellBase, cellBorder)}>{player?.easyWinLog[0] || '-'}</div>
            <div className={clsx(cellBase, cellBorder)}>{player?.easyWinLog[1] || '-'}</div>
            <div className={clsx(cellBase, cellLast)}>{player?.easyWinLog[2] || '-'}</div>
          </div>
        )}
      </div>
    </div>
  );
};
