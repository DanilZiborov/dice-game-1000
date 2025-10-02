import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { getGameById } from 'db/operations/getGameById';
import { gameSchema } from 'shared/types';
import { awaitRequest, getObjectStore } from 'db/utils';
import { assertSchemaMatch, throwAssertedError } from 'shared/utils';

type EndGameArgs = {
  db: IDBDatabase;
  gameId: number;
};

export const endGame = async ({ db, gameId }: EndGameArgs): Promise<IDBValidKey> => {
  const store = getObjectStore(db, STORE_GAMES, 'readwrite');

  try {
    const game = await getGameById({ db, gameId });

    assertSchemaMatch(gameSchema, game);

    const updatedGame: Game = {
      ...game,
      ended: new Date().toISOString(),
    };

    return await awaitRequest<IDBValidKey>(store.put(updatedGame));
  } catch (err) {
    throwAssertedError(err, 'Ошибка при завершении игры');

    return undefined as never;
  }
};
