import { MAX_BOLTS } from 'shared/constants';
import type { Game, Player, PlayerStatus } from 'shared/types';

export const handleBolts = (player: Player, points: number, status: PlayerStatus, game: Game): void => {
  const { isInPit, isOnBarrel } = status;
  const { boltsLimit } = game;

  // записываем болт, если игрок выкинул 0, не на бочке, не в яме и вошёл в игру
  const needBolt = points === 0 && !isInPit && !isOnBarrel && player.isEnterGame;

  if (!needBolt) return;

  if (player.boltsNumber < MAX_BOLTS - 1) {
    // если количество болтов не превысило лимит, добавляем болт
    player.boltsNumber += 1;
  } else {
    // иначе - списываем очки и обнуляем болты
    player.score = player.score - boltsLimit < 0 ? 0 : player.score - boltsLimit;
    player.boltsNumber = 0;
  }
};
