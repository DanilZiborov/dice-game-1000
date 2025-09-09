import type { JSX } from 'react';
import { PrimaryButton } from 'components';

type Props = {
  onStart: () => void;
};

export const StartGameForm = ({ onStart }: Props): JSX.Element => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 text-center">
      <h1 className="text-3xl font-extrabold tracking-wide text-white">ГОТОВЫ НАЧАТЬ ПАРТИЮ?</h1>
      <PrimaryButton onClick={onStart}>Погнали!</PrimaryButton>
    </div>
  );
};
