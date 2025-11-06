import { THOUSAND_WINNING_POINTS } from 'shared/constants';
import type { Player } from 'shared/types';

export const updateWinner = (player: Player): void => {
  // обрабатываем победу
  player.isWinner = player.score === THOUSAND_WINNING_POINTS;
};
