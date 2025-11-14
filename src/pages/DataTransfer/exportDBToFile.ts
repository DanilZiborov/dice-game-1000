import { getAllGames } from '../../db/operations/getAllGames';
import { getAllPlayers } from '../../db/operations/getAllPlayers';
import { throwAssertedError } from '../../shared/utils';

/** Аргументы для экспорта */
type ExportDBArgs = {
  db: IDBDatabase;
};

/**
 * Создаёт JSON из данных и триггерит скачивание файла
 */
export const exportDBToFile = async ({ db }: ExportDBArgs): Promise<void> => {
  try {
    const [games, players] = await Promise.all([getAllGames(db), getAllPlayers(db)]);

    const exportData = {
      games,
      players,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Партии_${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    throwAssertedError(err, 'Ошибка при экспорте IndexedDB');
  }
};
