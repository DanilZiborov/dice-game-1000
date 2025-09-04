import type { JSX } from 'react';
import { CustomNumericInputWithSteps } from 'components';
import type { GameConfig } from 'pages/Main/NewGame/types';
import { MIN_MAX_GAME_CONFIGS } from 'pages/Main/NewGame/constants';

type Limits = Pick<GameConfig, 'barrelLimit' | 'enterLimit'>;

type Props = {
  onConfigChange: (newConfig: Partial<Limits>) => void;
  limits: Limits;
};

export const AddLimitsForm = ({ onConfigChange, limits }: Props): JSX.Element => {
  const {
    barrelLimit: { max: barrelLimitMax, min: barrelLimitMin },
    enterLimit: { max: enterLimitMax, min: enterLimitMin },
  } = MIN_MAX_GAME_CONFIGS;

  return (
    <div className="flex h-full flex-col items-start justify-center">
      <p className="mb-8">укажите, сколько очков нужно...</p>
      <div className="mb-6 flex w-full items-center justify-between">
        <span className="text-white"> для входа в игру:</span>
        <CustomNumericInputWithSteps
          value={limits.enterLimit}
          onChange={(v) => onConfigChange({ ...limits, enterLimit: v })}
          step={5}
          min={enterLimitMin}
          max={enterLimitMax}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-white">чтобы забраться на бочку:</span>
        <CustomNumericInputWithSteps
          value={limits.barrelLimit}
          onChange={(v) => onConfigChange({ ...limits, barrelLimit: v })}
          step={10}
          min={barrelLimitMin}
          max={barrelLimitMax}
        />
      </div>
    </div>
  );
};
