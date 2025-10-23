import type { Game, Player, PlayerDTO } from 'shared/types';

type Props = {
  playerDTO: PlayerDTO;
  game: Game;
};

// Вычисляет статусы игрока при записи данных в контекст
export const getPlayerWithStatus = ({ playerDTO }: Props): Player => {
  return {
    data: playerDTO,
    status: { isInPit: true, isEnterGame: true, isOnBarrel: true },
  };
};
