import type { Game, Player, PlayerStatus } from 'shared/types';
import {
  calculateScore,
  handleBarrelAttempt,
  handleBolts,
  handleEnterGame,
  handleTruck,
  updateWinner,
} from 'pages/CurrentGame/Record/coreLogic/handlers';

export const getUpdatedPlayer = ({
  player,
  points,
  game,
  status,
}: {
  player: Player;
  points: number;
  game: Game;
  status: PlayerStatus;
}): Player => {
  const playerCopy = structuredClone(player);

  // 1. Обновляем базовый счёт
  playerCopy.score = calculateScore(player, points, game, status);
  playerCopy.log.push(playerCopy.score);

  // 2. Победа
  updateWinner(playerCopy);

  // 3. Обработка болтов
  handleBolts(playerCopy, points, status, game);

  // 4. Падения с бочки
  handleBarrelAttempt(playerCopy, points, game, status);

  // 5. Вход в игру
  handleEnterGame(playerCopy, game);

  // 6. Спецслучай: самосвал
  handleTruck(playerCopy, game);

  return playerCopy;
};
