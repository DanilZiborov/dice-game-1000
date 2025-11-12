import { MAX_EASY_WIN_ATTEMPTS, MAX_FAILS, ROLLBACK_POINTS, THOUSAND_WINNING_POINTS } from 'shared/constants';
import type { Game, Player, PlayerStatus } from 'shared/types';

export const handleBarrelAttempt = (player: Player, points: number, game: Game, status: PlayerStatus): Player => {
  const { isOnBarrel } = status;
  const { withEasyWin, barrelLimit } = game;

  const isFail = !withEasyWin || (withEasyWin && player.easyWinLog.length >= MAX_EASY_WIN_ATTEMPTS - 1);

  // если на бочке - начинаем анализировать
  if (!isOnBarrel) return player;

  // отрицательные записи на бочке не засчитывам за попытку
  if (points < 0) return player;

  // если ещё не победил
  if (player.score >= THOUSAND_WINNING_POINTS) return player;

  let updated = { ...player };

  if (isFail) {
    if (player.failsNumber < MAX_FAILS - 1) {
      updated = {
        ...updated,
        failsNumber: player.failsNumber + 1,
        score: barrelLimit - ROLLBACK_POINTS,
        easyWinLog: [],
      };
    } else {
      updated = {
        ...updated,
        score: 0,
        boltsNumber: 0,
        failsNumber: 0,
        easyWinLog: [],
      };
    }
  } else {
    if (withEasyWin && points >= 0) {
      updated = {
        ...updated,
        easyWinLog: [...player.easyWinLog, points],
      };
    }
  }

  return updated;
};
