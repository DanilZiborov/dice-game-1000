import type { JSX } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { CustomCheckbox } from 'components/CustomCheckbox';
import { CustomNumericInputWithSteps } from 'components';

type Props = {
  onRulesChange: (rules: {
    boltsEnabled: boolean;
    boltsValue: number;
    pit200Enabled: boolean;
    pit700Enabled: boolean;
  }) => void;
  initialRules: {
    boltsEnabled: boolean;
    boltsValue: number;
    pit200Enabled: boolean;
    pit700Enabled: boolean;
  };
};

export const AddRulesForm = ({ onRulesChange, initialRules }: Props): JSX.Element => {
  const [rules, setRules] = useState(initialRules);

  const handleChange = (newState: Partial<typeof rules>): void => {
    const updated = { ...rules, ...newState };
    setRules(updated);
    onRulesChange(updated);
  };

  return (
    <div className="flex h-full flex-col items-start justify-start">
      <p className="mb-8">Шаг 3. Добавь дополнительные правила</p>

      {/* --- Болты --- */}
      <div className="mb-6 w-full">
        <div className="mb-2 flex items-center gap-2">
          <CustomCheckbox
            checked={rules.boltsEnabled}
            onChange={(e) => handleChange({ boltsEnabled: e.target.checked })}
            label="болты"
          />
        </div>

        <div className="flex w-full items-center justify-between">
          <span className={clsx('text-sm', rules.boltsEnabled ? 'text-white' : 'text-slate-500')}>
            3 болта снимают
          </span>
          <CustomNumericInputWithSteps
            value={rules.boltsValue}
            onChange={(v) => handleChange({ boltsValue: v as number })}
            step={5}
            min={25}
            max={100}
            className={clsx(!rules.boltsEnabled && 'opacity-50')}
          />
          <span
            className={clsx('ml-2 text-sm', rules.boltsEnabled ? 'text-white' : 'text-slate-500')}
          >
            очков
          </span>
        </div>
      </div>

      {/* --- Ямы --- */}
      <div className="flex flex-col gap-3">
        <label
          className={clsx('flex items-center gap-2', !rules.pit200Enabled && 'text-slate-500')}
        >
          <CustomCheckbox
            checked={rules.pit200Enabled}
            onChange={(e) => handleChange({ pit200Enabled: e.target.checked })}
          />
          <span>яма 200-300</span>
        </label>

        <label
          className={clsx('flex items-center gap-2', !rules.pit700Enabled && 'text-slate-500')}
        >
          <CustomCheckbox
            checked={rules.pit700Enabled}
            onChange={(e) => handleChange({ pit700Enabled: e.target.checked })}
          />
          <span>яма 700-800</span>
        </label>
      </div>
    </div>
  );
};
