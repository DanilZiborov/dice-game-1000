import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';
import { getObjectStore } from 'db/utils/getObjectSotre';
import { throwAssertedError } from 'shared/utils/throwAssertedError';

type GetCurrentGameArgs = {
  db: IDBDatabase;
};

export const getCurrentGame = async ({ db }: GetCurrentGameArgs): Promise<Game | undefined> => {
  const store = getObjectStore(db, STORE_GAMES, 'readonly');

  try {
    const games = await awaitRequest<Game[]>(store.getAll());

    const activeGames = games.filter((g) => g.started && !g.ended);

    if (activeGames.length === 0) {
      return undefined;
    }

    return activeGames.sort((a, b) => new Date(b.started).getTime() - new Date(a.started).getTime())[0];
  } catch (err: unknown) {
    throwAssertedError(err, 'Ошибка при получении текущей игры');

    return undefined as never; // TS больше не ругается
  }
};
