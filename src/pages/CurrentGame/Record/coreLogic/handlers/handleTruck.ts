import { TRUCK_POINTS } from 'shared/constants';
import type { Game, Player } from 'shared/types';

/**
 * Спецслучай: самосвал
 *
 * Если игрок набирает оговоренное количество очков (555 в классике),
 * его счёт обнуляется.
 */
export const handleTruck = (player: Player, game: Game): Player => {
  // если самосвал не активирован или условие не выполнено — возвращаем игрока без изменений
  if (!game.truck || player.score !== TRUCK_POINTS) {
    return player;
  }

  // возвращаем обновлённого игрока (immutable)
  return {
    ...player,
    score: 0,
  };
};
