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
  const base = structuredClone(player);

  // 1. Обновляем базовый счёт
  const updatedScore = calculateScore(base, points, game, status);
  let updated: Player = {
    ...base,
    score: updatedScore,
    log: [...base.log, updatedScore],
  };

  // 2. Победа
  updated = updateWinner(updated);

  // 3. Обработка болтов
  updated = handleBolts(updated, points, status, game);

  // 4. Падения с бочки
  updated = handleBarrelAttempt(updated, points, game, status);

  // 5. Вход в игру
  updated = handleEnterGame(updated, game);

  // 6. Спецслучай: самосвал
  updated = handleTruck(updated, game);

  return updated;
};
