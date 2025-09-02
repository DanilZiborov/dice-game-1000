import type { JSX } from 'react';
import { CustomNumericInputWithSteps } from 'components';

type Props = {
  onLimitsChange: (newLimits: { enterLimit: number; barrelLimit: number }) => void;
  limits: { enterLimit: number; barrelLimit: number };
};

export const AddLimitsForm = ({ onLimitsChange, limits }: Props): JSX.Element => {
  return (
    <div className="flex h-full flex-col items-start justify-center">
      <p className="mb-8">укажи, сколько очков нужно...</p>
      <div className="mb-6 flex w-full items-center justify-between">
        <span className="text-white"> для входа в игру:</span>
        <CustomNumericInputWithSteps
          value={limits.enterLimit}
          onChange={(v) => onLimitsChange({ ...limits, enterLimit: v })}
          step={5}
          min={0}
          max={100}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-white">чтобы забраться на бочку:</span>
        <CustomNumericInputWithSteps
          value={limits.barrelLimit}
          onChange={(v) => onLimitsChange({ ...limits, barrelLimit: v })}
          step={10}
          min={0}
          max={950}
        />
      </div>
    </div>
  );
};
