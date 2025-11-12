import { THOUSAND_WINNING_POINTS } from 'shared/constants';
import type { Game, Player, PlayerStatus } from 'shared/types';

export const calculateScore = (player: Player, points: number, game: Game, status: PlayerStatus): number => {
  const { isInPit } = status;
  const { barrelLimit, enterLimit } = game;
  const { score, isEnterGame } = player;

  let resultScore = score + points;

  // нельзя записать больше 1000
  if (resultScore >= THOUSAND_WINNING_POINTS) resultScore = THOUSAND_WINNING_POINTS;

  // нельзя записать больше 900, когда садишься на бочку
  if (score < barrelLimit && resultScore > barrelLimit) resultScore = barrelLimit;

  // нельзя записать меньше паспорта при входе в игру
  if (!isEnterGame && resultScore < enterLimit) resultScore = 0;

  // сидя в яме нельзя записывать меньше, чем нужно для прыжка
  // только если это не обгоны
  // штраф за обгон может выбросить из ямы
  if (isInPit && typeof status.pitPointsLeft === 'number' && points < status.pitPointsLeft && points > 0)
    resultScore = score;

  // нельзя уйти в минус
  if (resultScore < 0) resultScore = 0;

  return resultScore;
};
