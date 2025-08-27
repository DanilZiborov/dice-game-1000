import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { CustomNumericInputWithSteps } from 'components';

type Props = {
  onLimitsChange: (limits: { enter: number; barrel: number }) => void;
};

export const AddLimitsForm = ({ onLimitsChange }: Props): JSX.Element => {
  const [enterLimit, setEnterLimit] = useState<number>(0);
  const [barrelLimit, setBarrelLimit] = useState<number>(0);

  useEffect(() => {
    onLimitsChange({ enter: enterLimit, barrel: barrelLimit });
  }, [enterLimit, barrelLimit, onLimitsChange]);

  return (
    <div className="flex h-full flex-col items-start justify-center">
      <p className="mb-8">укажи, сколько очков нужно...</p>
      <div className="mb-6 flex w-full items-center justify-between">
        <span className="text-white"> для входа в игру:</span>
        <CustomNumericInputWithSteps
          value={enterLimit}
          onChange={setEnterLimit}
          step={1}
          max={999}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-white">чтобы забраться на бочку:</span>
        <CustomNumericInputWithSteps
          value={barrelLimit}
          onChange={setBarrelLimit}
          step={1}
          max={999}
        />
      </div>
    </div>
  );
};
