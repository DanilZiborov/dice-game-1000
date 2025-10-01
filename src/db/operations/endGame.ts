import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';
import { getObjectStore } from 'db/utils/getObjectSotre';
import { throwAssertedError } from 'shared/utils/throwAssertedError';

type EndGameArgs = {
  db: IDBDatabase;
  gameId: number;
};

export const endGame = async ({ db, gameId }: EndGameArgs): Promise<void> => {
  const store = getObjectStore(db, STORE_GAMES, 'readwrite');

  try {
    const game = await awaitRequest<Game | undefined>(store.get(gameId));

    if (!game) {
      throw new Error(`Игра с id=${gameId} не найдена`);
    }

    const updatedGame: Game = {
      ...game,
      ended: new Date().toISOString(),
    };

    await awaitRequest(store.put(updatedGame));
  } catch (err) {
    throwAssertedError(err, 'Ошибка при завершении игры');
  }
};
