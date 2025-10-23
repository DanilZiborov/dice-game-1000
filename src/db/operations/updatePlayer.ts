import type { PlayerConfig, PlayerDTO } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { getGameById } from 'db/operations/getGameById';
import { getPlayersByGameId } from 'db/operations/getPlayersByGameId';
import { awaitRequest, getObjectStore } from 'db/utils';
import { throwAssertedError } from 'shared/utils';

type UpdatePlayerArgs = {
  db: IDBDatabase;
  gameId: number;
  playerId: number;
  playerConfig: Partial<PlayerConfig>;
};

export const updatePlayer = async ({ db, gameId, playerId, playerConfig }: UpdatePlayerArgs): Promise<IDBValidKey> => {
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

    const updatedPlayer: PlayerDTO = {
      ...existingPlayer,
      ...playerConfig, // можно частично обновлять поля
    };

    const playerStore = getObjectStore(db, STORE_PLAYERS, 'readwrite');

    return await awaitRequest(playerStore.put(updatedPlayer));
  } catch (err) {
    throwAssertedError(err, 'Ошибка при обновлении игрока');

    return undefined as never;
  }
};
