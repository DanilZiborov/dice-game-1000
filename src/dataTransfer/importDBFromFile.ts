import { assertSchemaMatch, throwAssertedError } from '../shared/utils';
import { type Game, gameSchema, type Player, playerSchema } from '../shared/types';
import { addAllGames } from '../db/operations/addAllGames';
import { addAllPlayers } from '../db/operations/addAllPlayers';
import { backupDBShema } from './types';

type ImportDBArgs = {
  db: IDBDatabase;
};

type Returns = {
  games: Game[];
  players: Player[];
};

/**
 * Импортирует JSON в IndexedDB через диалог выбора файла и возвращает данные
 */
export const importDBFromFile = async ({ db }: ImportDBArgs): Promise<Returns | null> => {
  try {
    // открываем диалог выбора файла
    const file = await new Promise<File | null>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = () => resolve(input.files?.[0] ?? null);
      input.click();
    });

    if (!file) return null;

    // читаем содержимое файла
    const text = await file.text();
    const data = JSON.parse(text);

    // валидируем весь бэкап
    assertSchemaMatch(backupDBShema, data);

    // валидируем отдельные элементы
    for (const game of data.games) {
      assertSchemaMatch(gameSchema, game);
    }

    for (const player of data.players) {
      assertSchemaMatch(playerSchema, player);
    }

    // запись в IndexedDB
    await addAllGames(db, data.games);
    await addAllPlayers(db, data.players);

    return { games: data.games, players: data.players };
  } catch (err) {
    throwAssertedError(err, 'Ошибка при импорте бэкапа');
  }

  return null;
};
