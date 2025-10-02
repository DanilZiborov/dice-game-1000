import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';
import { getObjectStore } from 'db/utils/getObjectSotre';
import { throwAssertedError } from 'shared/utils/throwAssertedError';
import { assertSchemaMatch } from 'shared/utils/asssertSchemaMatch';
import { gameSchema } from 'shared/types';

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
