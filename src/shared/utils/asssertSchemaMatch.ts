import { parse } from 'valibot';
import type { BaseSchema, BaseIssue } from 'valibot';
import { throwAssertedError } from 'shared/utils/throwAssertedError';

/**
 * Проверяет данные по схеме и выбрасывает ошибку с понятным сообщением,
 * если валидация не пройдена.
 */
export const assertSchemaMatch = (schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>, data: unknown): void => {
  try {
    parse(schema, data);
  } catch (err) {
    throwAssertedError(
      err,
      `
Ошибка валидации данных.
Данные: ${JSON.stringify(data)}
Схема: ${schema.type}
`,
    );
  }
};
