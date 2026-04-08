import { type Game, gameSchema } from 'shared/types';
import { assertSchemaMatch } from 'shared/utils';
import { STORE_GAMES } from '../constants';
import { awaitRequest } from '../utils';

export const addAllGames = async (db: IDBDatabase, games: Game[]): Promise<void> => {
  games.forEach((game) => assertSchemaMatch(gameSchema, game));

  const tx = db.transaction(STORE_GAMES, 'readwrite');
  const store = tx.objectStore(STORE_GAMES);

  // чистим store
  await awaitRequest(store.clear());

  // добавляем новые записи
  for (const game of games) {
    await awaitRequest(store.add(game));
  }
};
