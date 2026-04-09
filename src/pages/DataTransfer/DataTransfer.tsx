import { type JSX } from 'react';
import { SecondaryButton } from 'components/actionButtons/SecondaryButton';
import { useDb } from 'db/DbContext';
import { exportDBToFile } from './exportDBToFile';
import { importDBFromFile } from './importDBFromFile';

export const DataTransfer = (): JSX.Element => {
  const db = useDb();

  return (
    <div className="mx-auto flex flex-col py-4 font-info">
      <div className="mb-10">
        <p className="mb-4">
          Данные о партиях хранятся у вас на устройстве. Учитывайте, что при очистке данных браузера они будут удалены.
          Поэтому лучше сделать резервную копию в файл. Кроме того, с помощью резервных копий можно передавать историю
          партий на другие устройства. Это можно делать в любой момент, даже во время начатой партии, все данные
          сохранятся.{' '}
        </p>
        <p className="text-cyber-primary">
          Обратите внимание, что при экспорте из файла восстановленные данные полностью заменяют данные на устройстве.
        </p>
      </div>

      <div className="mx-auto">
        <SecondaryButton onClick={() => exportDBToFile({ db })} withDelay={false} className="mb-8 w-55">
          Записать данные в файл
        </SecondaryButton>
        <SecondaryButton onClick={() => importDBFromFile({ db })} withDelay={false} className="w-55">
          Достать данные из файла
        </SecondaryButton>
      </div>
    </div>
  );
};
