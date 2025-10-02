import type { NewPlayerConfig, Player } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { awaitRequest, getObjectStore } from 'db/utils';
import { throwAssertedError } from 'shared/utils';

type AddPlayersArgs = {
  db: IDBDatabase;
  gameId: number;
  playerNames: NewPlayerConfig;
};

export const addPlayers = async ({ db, gameId, playerNames }: AddPlayersArgs): Promise<IDBValidKey[]> => {
  const store = getObjectStore(db, STORE_PLAYERS, 'readwrite');

  try {
    const ids: IDBValidKey[] = [];

    for (const name of playerNames) {
      const player: Omit<Player, 'id'> = {
        gameId,
        name,
        score: 0,
        boltsNumber: 0,
        barrelAttempts: 0,
        isWinner: false,
        isInPit: false,
        log: [],
      };

      const id = await awaitRequest<IDBValidKey>(store.add(player));
      ids.push(id);
    }

    return ids;
  } catch (err) {
    throwAssertedError(err, 'Ошибка при добавлении игроков');

    return undefined as never;
  }
};
