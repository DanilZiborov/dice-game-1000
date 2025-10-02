import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';
import { getObjectStore } from 'db/utils/getObjectSotre';
import { throwAssertedError } from 'shared/utils/throwAssertedError';
import { getGameById } from 'db/operations/getGameById';
import { assertSchemaMatch } from 'shared/utils/asssertSchemaMatch';
import { gameSchema } from 'shared/types';

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
