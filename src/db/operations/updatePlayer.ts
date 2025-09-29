import type { Player, Game } from 'shared/types';
import { STORE_PLAYERS, STORE_GAMES } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';

type UpdatePlayerArgs = {
  db: IDBDatabase;
  playerId: number;
  gameId: number;
  playerConfig: Partial<Omit<Player, 'id' | 'gameId'>>;
};

export const updatePlayer = async ({ db, playerId, gameId, playerConfig }: UpdatePlayerArgs): Promise<void> => {
  // 1. Проверяем игру
  const gameTx = db.transaction(STORE_GAMES, 'readonly');
  const gameStore = gameTx.objectStore(STORE_GAMES);
  const game = await awaitRequest<Game | undefined>(gameStore.get(gameId));

  if (!game) {
    throw new Error(`Ошибка чтения из базы. Игра с id=${gameId} не найдена`);
  }

  if (!game.started || game.ended) {
    throw new Error(`Игра с id=${gameId} найдена в базе, но уже завершена`);
  }

  // 2. Проверяем игрока
  const playerTx = db.transaction(STORE_PLAYERS, 'readwrite');
  const store = playerTx.objectStore(STORE_PLAYERS);

  const existingPlayer = await awaitRequest<Player | undefined>(store.get(playerId));

  if (!existingPlayer || existingPlayer.gameId !== gameId) {
    throw new Error(`Игрок с id=${playerId} не найден в игре ${gameId}`);
  }

  // 3. Обновляем
  const updatedPlayer: Player = {
    ...existingPlayer,
    ...playerConfig,
  };

  await awaitRequest(store.put(updatedPlayer));
};
