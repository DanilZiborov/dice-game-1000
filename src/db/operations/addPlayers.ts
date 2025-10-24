import type { PlayerConfig } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { awaitRequest, getObjectStore } from 'db/utils';
import { assertSchemaMatch, throwAssertedError } from 'shared/utils';
import { playerNameSchema } from 'shared/types';

type AddPlayersArgs = {
  db: IDBDatabase;
  gameId: number;
  playerNames: string[];
};

export const addPlayers = async ({ db, gameId, playerNames }: AddPlayersArgs): Promise<IDBValidKey[]> => {
  playerNames.forEach((n) => assertSchemaMatch(playerNameSchema, n));

  const store = getObjectStore(db, STORE_PLAYERS, 'readwrite');

  try {
    const ids: IDBValidKey[] = [];

    for (const name of playerNames) {
      const player: PlayerConfig = {
        gameId,
        name,
        score: 0,
        boltsNumber: 0,
        failsNumber: 0,
        isWinner: false,
        log: [],
        easyWinLog: [],
        isEnterGame: false,
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
