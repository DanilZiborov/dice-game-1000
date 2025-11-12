import type { JSX } from 'react';
import { ArrowIcon } from 'components/icons';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import type { Player } from 'shared/types';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { RepeatComponent } from 'shared/utils/RepeatComponent';
import { BoltIcon, FailIcon, ShovelIcon } from 'components';
import { usePlayerStatus } from 'shared/hooks/usePlayerStatus';
import { MAX_EASY_WIN_ATTEMPTS } from 'shared/constants';
import { useMemo } from 'react';

type Props = {
  player: Player;
};

export const RecordHeader = ({ player }: Props): JSX.Element => {
  const navigate = useNavigate();

  const {
    state: { game },
  } = useCurrentGame();

  if (!game) throw new Error('Игра не существует!');

  const { isInPit, isOnBarrel, barrelPointsLeft, pitPointsLeft } = usePlayerStatus({ player });

  // Если в массиве не хватает значений, дополняем до 3
  const stableEasyWinLog =
    player.easyWinLog.length === MAX_EASY_WIN_ATTEMPTS
      ? player.easyWinLog
      : [...player.easyWinLog, ...Array(3 - player.easyWinLog.length).fill(null)];

  const additionalText = useMemo(() => {
    if (!player.isEnterGame) return `паспорт: ${game.enterLimit} очков`;

    if (isInPit) return `выбраться из ямы: ${pitPointsLeft} очков`;

    if (isOnBarrel && game.withEasyWin) return `для победы нужно ${barrelPointsLeft} очков`;

    return '';
  }, [barrelPointsLeft, game.enterLimit, game.withEasyWin, isInPit, isOnBarrel, pitPointsLeft, player.isEnterGame]);

  return (
    <div className="w-full">
      {/*Кнопка назад, имя игрока и счётчик фейлов*/}
      <div className="flex items-center justify-between">
        <div onClick={() => navigate('/app/game/current', { replace: true })}>
          <ArrowIcon direction="left" />
        </div>
        <h1 className="text-[24px]">{player.name}</h1>
        {player.failsNumber ? (
          <div className="flex flex-col gap-1">
            <RepeatComponent count={player.failsNumber}>
              <FailIcon />
            </RepeatComponent>
          </div>
        ) : (
          <div className="w-5" />
        )}
      </div>

      {/*Болты*/}
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <RepeatComponent count={player.boltsNumber}>
            <BoltIcon />
          </RepeatComponent>
          {isInPit && <ShovelIcon />}
        </div>

        {/*Доп. инфо*/}
        <p className="text-cyber-text-secondary text-center font-mono text-xs">{additionalText}</p>

        {/*Сетка для easyWin*/}
        {game?.withEasyWin && isOnBarrel && (
          <div className="mb-2 flex">
            {stableEasyWinLog.map((value, index, arr) => (
              <div
                /* eslint-disable-next-line react/no-array-index-key */
                key={`easy-win-grid-${index}`}
                className={clsx(
                  'border-cyber-text-secondary flex h-[16px] w-[36px] items-center justify-center border border-r font-mono text-[10px] leading-none tracking-widest',
                  index === arr.length - 1 && 'border-r-1',
                )}
              >
                {value ?? '-'}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
