import type { JSX } from 'react';
import { AddPlayerForm } from 'pages/Main/NewGame/newGameForms/AddPlayersForm';
import { PrimaryButton, SecondaryButton } from 'components';

export const NewGameFormContainer = (): JSX.Element => {
  return (
    <div className="flex h-full flex-col justify-between px-1 pb-4">
      <div className="flex flex-col">
        <p className="mb-1 text-center">Шаг 1. Добавь игроков</p>
        <p className="mb-4 font-mono text-slate-300">
          Дополнительный текст, который поясняет, что нужно сделать
        </p>
      </div>
      <AddPlayerForm />

      <div className="flex items-center justify-between">
        <SecondaryButton onClick={() => {}}>Назад</SecondaryButton>
        <PrimaryButton onClick={() => {}}>Далее</PrimaryButton>
      </div>
    </div>
  );
};
