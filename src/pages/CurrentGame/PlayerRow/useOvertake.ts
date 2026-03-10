import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { getUpdatedPlayer } from 'pages/CurrentGame/Record/coreLogic/getUpdatedPlayer';
import { updatePlayer } from 'db/operations';
import type { Player } from 'shared/types';
import { useDb } from 'db/DbContext';
import { useEffect } from 'react';
import { countPlayerStaus } from 'shared/playerStatus/countPlayerStatus';
import { ROLLBACK_POINTS } from 'shared/constants';

type Props = {
  selectedPlayer: Player | null;
  currentPlayer: Player;
};

export const useOvertake = ({ selectedPlayer: selectedPlayerPrev, currentPlayer }: Props): void => {
  const db = useDb();

  const {
    state: { players, game },
    dispatch,
  } = useCurrentGame();

  const selectedPlayerNew = players.find((p) => p.id === selectedPlayerPrev?.id);

  const selectedPlayerPrevScore = selectedPlayerPrev?.score ?? null;
  const currentPlayerScore = currentPlayer.score ?? null;
  const selectedPlayerNewScore = players.find((p) => p.id === selectedPlayerPrev?.id)?.score ?? null;

  useEffect(() => {
    // если обгоны отключены в конфигах партии или нет нужных данных для расчёта, ничего не делаем
    if (!game?.withOvertake || !selectedPlayerPrev) return;

    const currentPlayerStatus = countPlayerStaus({ game, player: currentPlayer });
    const selectedPlayerNewStatus = countPlayerStaus({ game, player: selectedPlayerNew });

    if (!currentPlayerStatus) return;

    // предотвращаем обгон игроком самого себя
    if (currentPlayer.id === selectedPlayerPrev.id) return;

    if (selectedPlayerPrevScore === null || currentPlayerScore === null || selectedPlayerNewScore === null) return;

    // Обрабатываем ситуацию "скидывания с бочки". На бочке не могут находиться оба игрока одновременно.
    // Если текущий игрок взобрался на бочку, а там уже сидел кто-то из игроков, то он падает с бочки, но не получает штраф barrelAttempt.
    // Это правило обсуждаемо, поэтому, если нужен штраф в этом случае, то включить его здесь.

    // если выбранный игрок на бочке и любой из игроков на бочке
    if (selectedPlayerNewStatus?.isOnBarrel && currentPlayerStatus.isOnBarrel && !currentPlayer.isWinner) {
      const updatedPlayer = getUpdatedPlayer({
        player: currentPlayer,
        points: -ROLLBACK_POINTS,
        game,
        status: currentPlayerStatus,
      });

      updatePlayer({ db, playerId: currentPlayer.id, gameId: game.id, playerConfig: updatedPlayer }).then(() => {
        dispatch({ type: 'UPDATE_PLAYER', payload: { id: updatedPlayer.id, data: updatedPlayer } });
      });
    }

    // считаем, что игрока обогнали, если предыдущий счёт внешнего игрока был меньше текущего счёта игрока, а стал больше
    const needPenalty = currentPlayerScore > selectedPlayerPrevScore && currentPlayerScore < selectedPlayerNewScore;

    // записываем новые данные в контекст и базу
    // TODO: запись игрока, возможно, стоит зарефакторить
    if (needPenalty) {
      const newPlayer = getUpdatedPlayer({
        player: currentPlayer,
        points: -game.overtakeLimit,
        game,
        status: currentPlayerStatus,
      });

      updatePlayer({ db, playerId: currentPlayer.id, gameId: game.id, playerConfig: newPlayer }).then(() => {
        dispatch({ type: 'UPDATE_PLAYER', payload: { id: newPlayer.id, data: newPlayer } });
      });
    }
    // TODO: разобраться, почему тут с другими зависимостями не работает
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayerNewScore]);
};
