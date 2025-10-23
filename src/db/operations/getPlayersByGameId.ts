import type { PlayerDTO } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { playerSchemaDTO } from 'shared/types';
import { awaitRequest, getObjectStore } from 'db/utils';
import { assertSchemaMatch, throwAssertedError } from 'shared/utils';

type GetPlayersByGameIdArgs = {
  db: IDBDatabase;
  gameId: IDBValidKey;
};

export const getPlayersByGameId = async ({ db, gameId }: GetPlayersByGameIdArgs): Promise<PlayerDTO[]> => {
  const store = getObjectStore(db, STORE_PLAYERS, 'readonly');

  try {
    const index = store.index('gameId');

    const players = await awaitRequest<PlayerDTO[]>(index.getAll(gameId));

    if (!players.length) throw Error(`В игре с id= ${gameId} нет игроков`);

    players.forEach((p) => assertSchemaMatch(playerSchemaDTO, p));

    return players;
  } catch (err) {
    throwAssertedError(err, `Ошибка при получении игроков для игры с id=${gameId}`);

    return undefined as never;
  }
};
