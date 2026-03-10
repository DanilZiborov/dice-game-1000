import { CustomCheckbox } from 'components';
import { type JSX, useCallback, useEffect, useState } from 'react';
import { type TSettings } from 'shared/types';
import { DEFAULT_SETTINGS, LS_SETTINGS_KEY } from 'shared/constants';
import { loadSettingsFromLS } from 'shared/utils/loadSettingsFromLS';

export const Settings = (): JSX.Element => {
  const [settings, setSettings] = useState<TSettings>(DEFAULT_SETTINGS);

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const loaded = loadSettingsFromLS();
    setSettings(loaded);
  }, []);

  const handleUpdateSettings = useCallback((newSettings: TSettings) => {
    setSettings(newSettings);
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(newSettings));
  }, []);

  return (
    <div className="flex h-full items-center p-5 font-info">
      <CustomCheckbox
        checked={settings.playerAutoChange}
        onChange={(e) => {
          const newSettings: TSettings = { ...settings, playerAutoChange: e.target.checked };
          handleUpdateSettings(newSettings);
        }}
        label="Автоматически переходить к следующему игроку после записи результата"
      />
    </div>
  );
};
