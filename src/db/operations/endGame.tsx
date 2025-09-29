import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';

type EndGameArgs = {
  db: IDBDatabase;
  gameId: number;
};

export const endGame = async ({ db, gameId }: EndGameArgs): Promise<void> => {
  const tx = db.transaction(STORE_GAMES, 'readwrite');
  const store = tx.objectStore(STORE_GAMES);

  // 1. Проверяем, что игра существует
  const game = await awaitRequest<Game | undefined>(store.get(gameId));

  if (!game) {
    throw new Error(`Игра с id=${gameId} не найдена`);
  }

  // 2. Обновляем поле ended
  const updatedGame: Game = {
    ...game,
    ended: new Date().toISOString(),
  };

  await awaitRequest(store.put(updatedGame));
};
