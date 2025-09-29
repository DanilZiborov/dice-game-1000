import type { Game } from 'shared/types';
import { STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';

type GetCurrentGameArgs = {
  db: IDBDatabase;
};

export const getCurrentGame = async ({ db }: GetCurrentGameArgs): Promise<Game | undefined> => {
  const tx = db.transaction(STORE_GAMES, 'readonly');
  const store = tx.objectStore(STORE_GAMES);

  const games = await awaitRequest<Game[]>(store.getAll());

  // Берём только начатые и незавершённые
  const activeGames = games.filter((g) => g.started && !g.ended);

  if (activeGames.length === 0) {
    return undefined;
  }

  // Сортируем по дате начала (по убыванию — самая новая первая)
  // Если начатых игр несколько - берём последнюю
  return activeGames.sort((a, b) => new Date(b.started).getTime() - new Date(a.started).getTime())[0];
};
