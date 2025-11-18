import { type JSX } from 'react';
import { SecondaryButton } from 'components/actionButtons/SecondaryButton';
import { useDb } from 'db/DbContext';
import { exportDBToFile } from './exportDBToFile';
import { importDBFromFile } from './importDBFromFile';

export const DataTransfer = (): JSX.Element => {
  const db = useDb();

  return (
    <div className="mx-auto flex flex-col font-info">
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
    </div>
  );
};
