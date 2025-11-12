import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { gameSchema } from 'shared/types';
import { awaitRequest, getObjectStore } from 'db/utils';
import { assertSchemaMatch, throwAssertedError } from 'shared/utils';

type GetCurrentGameArgs = {
  db: IDBDatabase;
};

export const getCurrentGame = async ({ db }: GetCurrentGameArgs): Promise<Game | null> => {
  const store = getObjectStore(db, STORE_GAMES, 'readonly');

  try {
    const games = await awaitRequest<Game[]>(store.getAll());

    const activeGames = games.filter((g) => g.started && !g.ended);

    // отсутствие активной игры - это не ошибка
    if (activeGames.length === 0) {
      return null;
    }

    const currentGame = activeGames.sort((a, b) => new Date(b.started).getTime() - new Date(a.started).getTime())[0];

    assertSchemaMatch(gameSchema, currentGame);

    return currentGame;
  } catch (err) {
    throwAssertedError(err, 'Ошибка при получении текущей игры');

    return undefined as never;
  }
};
