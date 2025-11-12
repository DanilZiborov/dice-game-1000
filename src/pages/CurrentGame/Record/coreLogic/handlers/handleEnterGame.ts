import type { Game, Player } from 'shared/types';

export const handleEnterGame = (player: Player, game: Game): Player => {
  // срабатывает один раз за партию
  if (player.isEnterGame) return player;

  const shouldEnter = player.score >= game.enterLimit;

  return {
    ...player,
    isEnterGame: shouldEnter,
  };
};
