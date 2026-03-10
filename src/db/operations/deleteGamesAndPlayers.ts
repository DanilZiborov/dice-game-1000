import { STORE_PLAYERS } from 'db/constants';
import { awaitRequest, getObjectStore } from 'db/utils';
import { throwAssertedError } from 'shared/utils';
import type { Player } from '../../shared/types';
import { deleteGames } from './deleteGames';
import { deletePlayers } from './deletePlayers';

type DeleteGamesAndPlayersArgs = {
  db: IDBDatabase;
  gameIds: IDBValidKey[];
};

/**
 * Удаляет игры и связанных с ними игроков из indexedDB
 * 1. Получает список ID игроков, связанных с указанными играми
 * 2. Удаляет игры по ID
 * 3. Удаляет игроков по ID
 * @param db - экземпляр IDBDatabase
 * @param gameIds - массив ID игр для удаления
 * @returns Promise<void>
 */
export const deleteGamesAndPlayers = async ({ db, gameIds }: DeleteGamesAndPlayersArgs): Promise<void> => {
  if (!gameIds.length) {
    return;
  }

  try {
    // 1. Получаем ID всех игроков, связанных с указанными играми
    const playersStore = getObjectStore(db, STORE_PLAYERS, 'readonly');
    const allPlayersRequest = playersStore.getAll();
    const allPlayers = await awaitRequest<Player[]>(allPlayersRequest);

    const playerIdsToDelete = allPlayers.filter((player) => gameIds.includes(player.gameId)).map((player) => player.id); // предполагаем, что у PlayerConfig есть поле id

    // 2. Удаляем игры
    await deleteGames({ db, gameIds });

    // 3. Удаляем игроков
    if (playerIdsToDelete.length > 0) {
      await deletePlayers({ db, playerIds: playerIdsToDelete });
    }
  } catch (err) {
    throwAssertedError(err, 'Ошибка при удалении игр и игроков');
  }
};
