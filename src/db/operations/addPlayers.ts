import type { NewPlayerConfig, Player } from 'shared/types';
import { STORE_PLAYERS } from 'db/constants';
import { awaitRequest } from 'db/utils/awaitRequest';

type AddPlayersArgs = {
  db: IDBDatabase;
  gameId: number;
  playerNames: NewPlayerConfig;
};

export const addPlayers = async ({ db, gameId, playerNames }: AddPlayersArgs): Promise<IDBValidKey[]> => {
  const tx = db.transaction(STORE_PLAYERS, 'readwrite');
  const store = tx.objectStore(STORE_PLAYERS);

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
};
