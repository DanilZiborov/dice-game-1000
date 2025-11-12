import { THOUSAND_WINNING_POINTS } from 'shared/constants';
import type { Player } from 'shared/types';

export const updateWinner = (player: Player): Player => {
  // обрабатываем победу
  const isWinner = player.score === THOUSAND_WINNING_POINTS;

  return {
    ...player,
    isWinner,
  };
};
