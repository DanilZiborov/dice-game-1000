import type { Game, Player, PlayerStatus } from 'shared/types';
import { PIT_200, PIT_700, THOUSAND_WINNING_POINTS } from 'shared/constants';

type Args = { player?: Player | null; game: Game | null };

export const countPlayerStaus = ({ player, game }: Args): PlayerStatus | null => {
  if (!player || !game) return null;

  const { score } = player;

  const { pit200, pit700, barrelLimit } = game;

  const status: PlayerStatus = {
    isInPit: false,
    pitPointsLeft: null,
    isOnBarrel: false,
    barrelPointsLeft: null,
  };

  const countPit = (start: number, end: number): void => {
    const isInPit = score >= start && score <= end;
    status.isInPit = isInPit;
    // Считаем, сколько очков нужно, чтобы выпрыгнуть из ямы.
    // Поскольку для освобождения из ямы нужно выбросить больше, чем край ямы (end), а минимальное возможное значение для записи = 5.
    // Поэтому добавляем 5 очков к pitPointsLeft.
    status.pitPointsLeft = isInPit ? end - score + 5 : null;
  };

  // считаем яму
  if (pit200) countPit(PIT_200.start, PIT_200.end);
  if (pit700 && !status.isInPit) countPit(PIT_700.start, PIT_700.end);

  // считаем бочку
  const isOnBarrel = score >= barrelLimit;
  status.isOnBarrel = isOnBarrel;

  status.barrelPointsLeft = isOnBarrel ? THOUSAND_WINNING_POINTS - score : null;

  return status;
};
