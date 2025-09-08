import type { JSX, ChangeEvent } from 'react';
import { clsx } from 'clsx';
import { CustomCheckbox } from 'components/CustomCheckbox';
import { CustomNumericInputWithSteps } from 'components';
import type { GameConfig } from 'pages/Main/NewGame/types';
import { MIN_MAX_GAME_CONFIGS } from 'pages/Main/NewGame/constants';

type Rules = Pick<
  GameConfig,
  'withBolts' | 'boltsLimit' | 'withOvertake' | 'overtakeLimit' | 'pit200' | 'pit700' | 'truck'
>;

type Props = {
  onConfigChange: (newRules: Partial<Rules>) => void;
  rules: Rules;
};

const BOLTS_LIMIT_STEP = 5;
const OVERTAKE_LIMIT_STEP = 5;

export const AddRulesForm = ({ onConfigChange, rules }: Props): JSX.Element => {
  return (
    <div className="flex h-full flex-none flex-col items-start justify-around">
      {/* --- Болты --- */}
      <div className="flex flex-col items-start gap-6">
        <CustomCheckbox
          checked={rules.withBolts}
          label="болты"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onConfigChange({ withBolts: e.target.checked })
          }
        />

        <div className="flex items-center gap-6">
          <span className={clsx(rules.withBolts ? 'text-white' : 'text-cyber-disabled')}>
            3 болта снимают
          </span>
          <CustomNumericInputWithSteps
            value={rules.boltsLimit}
            step={BOLTS_LIMIT_STEP}
            min={MIN_MAX_GAME_CONFIGS.boltsLimit.min}
            max={MIN_MAX_GAME_CONFIGS.boltsLimit.max}
            disabled={!rules.withBolts}
            onChange={(value) => onConfigChange({ boltsLimit: value })}
          />
          <span className={clsx('ml-2', rules.withBolts ? 'text-white' : 'text-cyber-disabled')}>
            очков
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start gap-6">
        <CustomCheckbox
          checked={rules.withOvertake}
          label="правило обгона"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onConfigChange({ withOvertake: e.target.checked })
          }
        />

        <div className="flex items-center gap-6">
          <span className={clsx(rules.withOvertake ? 'text-white' : 'text-cyber-disabled')}>
            при обгоне снимается
          </span>
          <CustomNumericInputWithSteps
            value={rules.overtakeLimit}
            step={OVERTAKE_LIMIT_STEP}
            min={MIN_MAX_GAME_CONFIGS.overtakeLimit.min}
            max={MIN_MAX_GAME_CONFIGS.overtakeLimit.max}
            disabled={!rules.withOvertake}
            onChange={(value) => onConfigChange({ overtakeLimit: value })}
          />
          <span className={clsx('ml-2', rules.withOvertake ? 'text-white' : 'text-cyber-disabled')}>
            очков
          </span>
        </div>
      </div>

      {/* --- Ямы и самосвал --- */}
      <div className="flex flex-col items-start gap-6">
        <CustomCheckbox
          checked={rules.pit200}
          label="яма 200-300"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onConfigChange({ pit200: e.target.checked })
          }
        />

        <CustomCheckbox
          checked={rules.pit700}
          label="яма 700-800"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onConfigChange({ pit700: e.target.checked })
          }
        />

        <CustomCheckbox
          checked={rules.truck}
          label="самосвал"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onConfigChange({ truck: e.target.checked })
          }
        />
      </div>
    </div>
  );
};
