import type { Player, PlayerConfig } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { getGameById } from 'db/operations/getGameById';
import { getPlayersByGameId } from 'db/operations/getPlayersByGameId';
import { awaitRequest, getObjectStore } from 'db/utils';
import { assertSchemaMatch, throwAssertedError } from 'shared/utils';
import { playerConfigSchema } from 'shared/types';

type UpdatePlayerArgs = {
  db: IDBDatabase;
  playerId: number;
  playerConfig: PlayerConfig;
};

export const updatePlayer = async ({ db, playerId, playerConfig }: UpdatePlayerArgs): Promise<IDBValidKey> => {
  assertSchemaMatch(playerConfigSchema, playerConfig);

  const playerStore = getObjectStore(db, STORE_PLAYERS, 'readonly');

  const { gameId } = playerConfig;

  try {
    const game = await getGameById({ db, gameId: gameId });

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
