import { PIT_200, PIT_700 } from 'shared/constants';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import type { Player, PlayerStatus } from 'shared/types';
import { useMemo } from 'react';

type Props = {
  player: Player;
};

export const usePlayerStatus = ({ player }: Props): PlayerStatus => {
  const {
    state: { game },
  } = useCurrentGame();

  return useMemo(() => {
    if (!game) throw new Error('Попытка изменения статуса игрока при game === null');

    const { score } = player;

    const { pit200, pit700, barrelLimit } = game;

    const status: PlayerStatus = {
      isInPit: false,
      pitPointsLeft: null,
      isOnBarrel: false,
      barrelPointsLeft: null,
    };

    const countPit = (start: number, end: number): void => {
      const isInPit = score >= start && score < end;
      status.isInPit = isInPit;
      status.pitPointsLeft = isInPit ? end - score : null;
    };

    // считаем яму
    if (pit200) countPit(PIT_200.start, PIT_200.end);
    if (pit700) countPit(PIT_700.start, PIT_700.end);

    // считаем бочку
    const isOnBarrel = score >= barrelLimit;
    status.isOnBarrel = isOnBarrel;

    status.barrelPointsLeft = isOnBarrel ? barrelLimit - score : null;

    return status;
  }, [game, player]);
};
