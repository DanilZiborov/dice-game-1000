import { type JSX } from 'react';
import { SecondaryButton } from 'components/actionButtons/SecondaryButton';
import { exportDBToFile } from './exportDBToFile';
import { importDBFromFile } from './importDBFromFile';
import { useDb } from '../../db/DbContext';
import { Dice1 } from '../../components/icons/dices/Dice1';
import { Dice2 } from '../../components/icons/dices/Dice2';
import { Dice3 } from '../../components/icons/dices/Dice3';
import { Dice4 } from '../../components/icons/dices/Dice4';
import { Dice5 } from '../../components/icons/dices/Dice5';
import { Dice6 } from '../../components/icons/dices/Dice6';

export const DataTransfer = (): JSX.Element => {
  const db = useDb();

  return (
    <div className="mx-auto mt-10 flex h-full max-w-[90%] flex-col font-info">
      <div className="mb-10">
        <p className="mb-4">
          Данные о партиях надежно хранятся вас на устройстве, но при очистке кеша браузера они будут удалены. Поэтому
          лучше сделать резервную копию в файл. Кроме того, с помощью резервных копий можно передавать историю партий на
          другие устройства. Это можно делать в любой момент, даже во время начатой партии, все данные сохранятся.{' '}
        </p>
        <p className="text-cyber-primary">
          Обратите внимание, что при экспорте из файла восстановленные данные полностью заменяют данные на устройстве.
        </p>
      </div>

      <div className="mx-auto">
        <SecondaryButton onClick={() => exportDBToFile({ db })} withDelay={false} className="mb-8 w-[220px]">
          Записать данные в файл
        </SecondaryButton>
        <SecondaryButton onClick={() => importDBFromFile({ db })} withDelay={false} className="w-[220px]">
          Достать данные из файла
        </SecondaryButton>
      </div>
      <Dice1 />
      <Dice2 />
      <Dice3 />
      <Dice4 />
      <Dice5 />
      <Dice6 />
    </div>
  );
};
