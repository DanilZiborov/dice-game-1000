import type { Player } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { playerSchema } from 'shared/types';
import { awaitRequest, getObjectStore } from 'db/utils';
import { assertSchemaMatch, throwAssertedError } from 'shared/utils';

type GetPlayersByGameIdArgs = {
  db: IDBDatabase;
  gameId: IDBValidKey;
};

export const getPlayersByGameId = async ({ db, gameId }: GetPlayersByGameIdArgs): Promise<Player[]> => {
  const store = getObjectStore(db, STORE_PLAYERS, 'readonly');

  try {
    const index = store.index('gameId');

    const players = await awaitRequest<Player[]>(index.getAll(gameId));

    players.forEach((p) => assertSchemaMatch(playerSchema, p));

    return players;
  } catch (err) {
    throwAssertedError(err, `Ошибка при получении игроков для игры с id=${gameId}`);

    return undefined as never;
  }
};
