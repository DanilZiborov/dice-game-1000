import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { gameSchema } from 'shared/types';
import { awaitRequest, getObjectStore } from 'db/utils';
import { assertSchemaMatch, throwAssertedError } from 'shared/utils';

type GetGameArgs = {
  db: IDBDatabase;
  gameId: IDBValidKey;
};

export const getGameById = async ({ db, gameId }: GetGameArgs): Promise<Game> => {
  const store = getObjectStore(db, STORE_GAMES, 'readonly');

  try {
    const game = await awaitRequest<Game>(store.get(gameId));

    assertSchemaMatch(gameSchema, game);

    return game;
  } catch (err) {
    throwAssertedError(err, `Ошибка при получении игры с id=${gameId}`);

    return undefined as never;
  }
};
