import type { JSX, ChangeEvent } from 'react';
import { clsx } from 'clsx';
import { CustomCheckbox } from 'components/CustomCheckbox';
import { CustomNumericInputWithSteps } from 'components';
import type { NewGameConfig } from 'shared/types';
import { MIN_MAX_GAME_CONFIGS } from 'pages/NewGame/constants';
import { MAX_BOLT_NUMBER } from 'shared/constants';

type Props = {
  onConfigChange: (newRules: Partial<NewGameConfig>) => void;
  currentConfig: NewGameConfig;
};

const BOLTS_LIMIT_STEP = 5;
const OVERTAKE_LIMIT_STEP = 5;

export const AddRulesForm = ({ onConfigChange, currentConfig }: Props): JSX.Element => {
  const { withBolts, withOvertake, boltsLimit, overtakeLimit, pit200, pit700, truck } = currentConfig;

  return (
    <div className="flex h-full flex-none flex-col items-start justify-around">
      {/* --- Болты --- */}
      <div className="flex flex-col items-start gap-6">
        <CustomCheckbox
          checked={withBolts}
          label="болты"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onConfigChange({ withBolts: e.target.checked })}
        />

        <div className="flex items-center gap-6">
          <span className={clsx(withBolts ? 'text-white' : 'text-cyber-disabled')}>
            {MAX_BOLT_NUMBER} болта снимают
          </span>
          <CustomNumericInputWithSteps
            value={boltsLimit}
            step={BOLTS_LIMIT_STEP}
            min={MIN_MAX_GAME_CONFIGS.boltsLimit.min}
            max={MIN_MAX_GAME_CONFIGS.boltsLimit.max}
            disabled={!withBolts}
            onChange={(value) => onConfigChange({ boltsLimit: value })}
          />
          <span className={clsx('ml-2', withBolts ? 'text-white' : 'text-cyber-disabled')}>очков</span>
        </div>
      </div>
      <div className="flex flex-col items-start gap-6">
        <CustomCheckbox
          checked={withOvertake}
          label="правило обгона"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onConfigChange({ withOvertake: e.target.checked })}
        />

        <div className="flex items-center gap-6">
          <span className={clsx(withOvertake ? 'text-white' : 'text-cyber-disabled')}>при обгоне снимается</span>
          <CustomNumericInputWithSteps
            value={overtakeLimit}
            step={OVERTAKE_LIMIT_STEP}
            min={MIN_MAX_GAME_CONFIGS.overtakeLimit.min}
            max={MIN_MAX_GAME_CONFIGS.overtakeLimit.max}
            disabled={!withOvertake}
            onChange={(value) => onConfigChange({ overtakeLimit: value })}
          />
          <span className={clsx('ml-2', withOvertake ? 'text-white' : 'text-cyber-disabled')}>очков</span>
        </div>
      </div>

      {/* --- Ямы и самосвал --- */}
      <div className="flex flex-col items-start gap-6">
        <CustomCheckbox
          checked={pit200}
          label="яма 200-300"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onConfigChange({ pit200: e.target.checked })}
        />

        <CustomCheckbox
          checked={pit700}
          label="яма 700-800"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onConfigChange({ pit700: e.target.checked })}
        />

        <CustomCheckbox
          checked={truck}
          label="самосвал"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onConfigChange({ truck: e.target.checked })}
        />
      </div>
    </div>
  );
};
