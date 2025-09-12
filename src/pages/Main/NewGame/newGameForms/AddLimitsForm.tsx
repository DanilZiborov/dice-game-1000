import type { JSX } from 'react';
import { CustomNumericInputWithSteps } from 'components';
import type { NewGameConfig } from 'shared/types';
import { MIN_MAX_GAME_CONFIGS } from 'pages/Main/NewGame/constants';

type Props = {
  onConfigChange: (newConfig: Partial<NewGameConfig>) => void;
  currentConfig: NewGameConfig;
};

export const AddLimitsForm = ({ onConfigChange, currentConfig }: Props): JSX.Element => {
  // тут просто сложная деструктуризация
  const {
    barrelLimit: { max: barrelLimitMax, min: barrelLimitMin },
    enterLimit: { max: enterLimitMax, min: enterLimitMin },
  } = MIN_MAX_GAME_CONFIGS;

  const { enterLimit, barrelLimit } = currentConfig;

  return (
    <div className="flex h-full flex-col items-start justify-center">
      <p className="mb-8">укажите, сколько очков нужно...</p>
      <div className="mb-6 flex w-full items-center justify-between">
        <span className="text-white"> для входа в игру:</span>
        <CustomNumericInputWithSteps
          value={enterLimit}
          onChange={(v) => onConfigChange({ ...currentConfig, enterLimit: v })}
          step={5}
          min={enterLimitMin}
          max={enterLimitMax}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-white">чтобы забраться на бочку:</span>
        <CustomNumericInputWithSteps
          value={barrelLimit}
          onChange={(v) => onConfigChange({ ...currentConfig, barrelLimit: v })}
          step={10}
          min={barrelLimitMin}
          max={barrelLimitMax}
        />
      </div>
    </div>
  );
};
