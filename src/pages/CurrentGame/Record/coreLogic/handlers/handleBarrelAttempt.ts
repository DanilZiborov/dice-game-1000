import { MAX_EASY_WIN_ATTEMPTS, MAX_FAILS, ROLLBACK_POINTS, THOUSAND_WINNING_POINTS } from 'shared/constants';
import type { Game, Player, PlayerStatus } from 'shared/types';

export const handleBarrelAttempt = (player: Player, points: number, game: Game, status: PlayerStatus): void => {
  const { isOnBarrel } = status;
  const { withEasyWin, barrelLimit } = game;

  const isFail = !withEasyWin || (withEasyWin && player.easyWinLog.length >= MAX_EASY_WIN_ATTEMPTS - 1);

  // если на бочке - начинаем анализировать
  if (!isOnBarrel) return;

  // отрицательные записи на бочке не засчитывам за попытку
  if (points < 0) return;

  // если ещё не победил
  if (player.score >= THOUSAND_WINNING_POINTS) return;

  if (isFail) {
    if (player.failsNumber < MAX_FAILS - 1) {
      player.failsNumber += 1;
      player.score = barrelLimit - ROLLBACK_POINTS;
      player.easyWinLog = [];
    } else {
      player.score = 0;
      player.boltsNumber = 0;
      player.failsNumber = 0;
      player.easyWinLog = [];
    }
  } else {
    if (withEasyWin && points >= 0) player.easyWinLog.push(points);
  }
};
