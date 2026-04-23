import type { JSX } from 'react';
import { useMemo } from 'react';
import { ArrowIcon, BoltIcon, FailIcon, ShovelIcon } from 'components/icons';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import type { Player } from 'shared/types';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { RepeatComponent } from 'shared/utils/RepeatComponent';
import { usePlayerStatus } from 'shared/playerStatus/usePlayerStatus';
import { MAX_EASY_WIN_ATTEMPTS } from 'shared/constants';

type Props = {
  player: Player;
};

export const RecordHeader = ({ player }: Props): JSX.Element => {
  const navigate = useNavigate();

  const {
    state: { game },
  } = useCurrentGame();

  if (!game) throw new Error('Игра не существует!');

  const playerStatus = usePlayerStatus({ player });

  // Если в массиве не хватает значений, дополняем до 3
  const stableEasyWinLog =
    player.easyWinLog.length === MAX_EASY_WIN_ATTEMPTS
      ? player.easyWinLog
      : [...player.easyWinLog, ...Array(3 - player.easyWinLog.length).fill(null)];

  const additionalText = useMemo(() => {
    if (!player.isEnterGame) return `паспорт: ${game.enterLimit} очков`;

    if (playerStatus?.isInPit) return `выбраться из ямы: ${playerStatus?.pitPointsLeft} очков`;

    if (playerStatus?.isOnBarrel && game.withEasyWin) return `для победы нужно ${playerStatus?.barrelPointsLeft} очков`;

    return '';
  }, [
    game.enterLimit,
    game.withEasyWin,
    player.isEnterGame,
    playerStatus?.barrelPointsLeft,
    playerStatus?.isInPit,
    playerStatus?.isOnBarrel,
    playerStatus?.pitPointsLeft,
  ]);

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

      <div className="flex h-[45px] flex-col items-center gap-1">
        <div className="flex gap-1">
          <RepeatComponent count={player.boltsNumber}>
            <BoltIcon />
          </RepeatComponent>
          {playerStatus?.isInPit && <ShovelIcon />}
        </div>

        {/*Доп. инфо*/}
        <p className="text-center font-mono text-xs text-cyber-text-secondary">{additionalText}</p>

        {/*Сетка для easyWin*/}
        {game?.withEasyWin && playerStatus?.isOnBarrel && (
          <div className="mb-2 flex">
            {stableEasyWinLog.map((value, index, arr) => (
              <div
                /* eslint-disable-next-line react/no-array-index-key */
                key={`easy-win-grid-${index}`}
                className={clsx(
                  'flex h-[16px] w-[36px] items-center justify-center border border-r border-cyber-text-secondary font-mono text-[10px] leading-none tracking-widest',
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
