import { safeParse } from 'valibot';
import { settingsSchema, type TSettings } from 'shared/types';
import { DEFAULT_SETTINGS, LS_SETTINGS_KEY } from 'shared/constants';

/**
 * Загружает настройки из localStorage, валидирует их с помощью схемы Valibot.
 * Если данные отсутствуют, повреждены или не проходят валидацию,
 * возвращает значение по умолчанию.
 */
export function loadSettingsFromLS(): TSettings {
  const stored = localStorage.getItem(LS_SETTINGS_KEY);
  if (!stored) return DEFAULT_SETTINGS;

  const parsed = JSON.parse(stored);
  const result = safeParse(settingsSchema, parsed);

  if (result.success) {
    return result.output;
  }

  return DEFAULT_SETTINGS;
}
