import { TRUCK_POINTS } from 'shared/constants';
import type { Game, Player } from 'shared/types';

// Спецслучай: самосвал
// Если игрок набирает оговоренное количество очков (555 в классивке), его счёт обнуляется
export const handleTruck = (player: Player, game: Game): void => {
  if (game.truck && player.score === TRUCK_POINTS) {
    player.score = 0;
  }
};
