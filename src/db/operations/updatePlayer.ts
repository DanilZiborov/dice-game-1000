import type { Player } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { getGameById } from 'db/operations/getGameById';
import { getPlayersByGameId } from 'db/operations/getPlayersByGameId';
import { awaitRequest, getObjectStore } from 'db/utils';
import { throwAssertedError } from 'shared/utils';

type UpdatePlayerArgs = {
  db: IDBDatabase;
  playerId: number;
  gameId: number;
  playerConfig: Partial<Omit<Player, 'id' | 'gameId'>>;
};

export const updatePlayer = async ({ db, playerId, gameId, playerConfig }: UpdatePlayerArgs): Promise<IDBValidKey> => {
  const playerStore = getObjectStore(db, STORE_PLAYERS, 'readonly');

  try {
    const game = await getGameById({ db, gameId });

    if (game.ended) {
      throw new Error(`Игра с id=${gameId} уже завершена`);
    }

    const players = await getPlayersByGameId({ db, gameId });

    const existingPlayer = players.find((p) => p.id === playerId);

    if (!existingPlayer) {
      throw new Error(`Игрок с id=${playerId} не найден в игре с id=${gameId}`);
    }

    const updatedPlayer: Player = {
      ...existingPlayer,
      ...playerConfig,
    };

    return await awaitRequest(playerStore.put(updatedPlayer));
  } catch (err) {
    throwAssertedError(err, 'Ошибка при обновлении игрока');

    return undefined as never;
  }
};
