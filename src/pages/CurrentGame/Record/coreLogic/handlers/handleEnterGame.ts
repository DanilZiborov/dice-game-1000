import type { Game, Player } from 'shared/types';

export const handleEnterGame = (player: Player, game: Game): void => {
  // срабатывает один раз за партию
  if (!player.isEnterGame) {
    player.isEnterGame = player.score >= game.enterLimit;
  }
};
