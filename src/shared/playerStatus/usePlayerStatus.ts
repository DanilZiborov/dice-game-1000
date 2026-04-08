import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import type { Player, PlayerStatus } from 'shared/types';
import { useMemo } from 'react';
import { countPlayerStaus } from 'shared/playerStatus/countPlayerStatus';

type Props = {
  player?: Player | null;
};

export const usePlayerStatus = ({ player }: Props): PlayerStatus | null => {
  const {
    state: { game },
  } = useCurrentGame();

  return useMemo(() => {
    if (!game || !player) throw new Error('Попытка изменения статуса игрока при game === null');

    return countPlayerStaus({ game, player });
  }, [game, player]);
};
