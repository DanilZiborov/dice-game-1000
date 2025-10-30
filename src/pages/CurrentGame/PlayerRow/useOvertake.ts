import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { getUpdatedPlayer } from 'pages/CurrentGame/Record/getUpdatedPlayer';
import { updatePlayer } from 'db/operations';
import type { Player } from 'shared/types';
import { useDb } from 'db/DbContext';
import { usePlayerStatus } from 'shared/hooks/usePlayerStatus';
import { useEffect } from 'react';

type Props = {
  selectedPlayer: Player | null;
  currentPlayer: Player;
};

export const useOvertake = ({ selectedPlayer, currentPlayer }: Props): void => {
  const db = useDb();

  const {
    state: { players, game },
    dispatch,
  } = useCurrentGame();

  const status = usePlayerStatus({ player: currentPlayer });

  const selectedPlayerPrevScore = selectedPlayer?.score ?? null;
  const currentPlayerScore = currentPlayer.score ?? null;
  const selectedPlayerNewScore = players.find((p) => p.id === selectedPlayer?.id)?.score ?? null;

  useEffect(() => {
    // если обгоны отключены в конфигах партии или нет нужных данных для расчёта, ничего не делаем
    if (!game?.withOvertake || !selectedPlayer) return;

    // предотвращаем обгон игроком самого себя
    if (currentPlayer.id === selectedPlayer.id) return;

    if (selectedPlayerPrevScore === null || currentPlayerScore === null || selectedPlayerNewScore === null) return;

    // считаем, что игрока обогнали, если предыдущий счёт внешнего игрока был меньше текущего счёта игрока, а стал больше
    const needPenalty = currentPlayerScore > selectedPlayerPrevScore && currentPlayerScore < selectedPlayerNewScore;

    if (needPenalty) console.log('штраф', currentPlayer.name);

    // записываем новые данные в контекст и базу
    // TODO: запись игрока, возможно, стоит зарефакторить
    if (needPenalty) {
      const newPlayer = getUpdatedPlayer({ player: currentPlayer, points: -game.overtakeLimit, game, status });

      updatePlayer({ db, playerId: currentPlayer.id, gameId: game.id, playerConfig: newPlayer }).then(() => {
        dispatch({ type: 'UPDATE_PLAYER', payload: { id: newPlayer.id, data: newPlayer } });

        console.log('обгон записан');
      });
    }
    // TODO: разобраться, почему тут с другими зависимостями не работает
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayerNewScore]);
};
