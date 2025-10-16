import type { JSX } from 'react';
import { ArrowIcon } from 'components/icons';
import { clsx } from 'clsx';

type Props = {
  disableRecordMode: () => void;
};

const cellBase =
  'flex h-[16px] w-[36px] items-center justify-center font-mono text-[10px] leading-none tracking-widest';
const cellBorder = 'border border-cyber-text-secondary border-r';
const cellLast = 'border border-cyber-text-secondary';

export const RecordHeader = ({ disableRecordMode }: Props): JSX.Element => {
  return (
    <div className="w-full">
      {/*Игрок*/}
      <div className="flex items-center justify-between">
        <div onClick={disableRecordMode}>
          <ArrowIcon direction="left" />
        </div>
        <h1 className="text-[24px]">Пантелеймон</h1>
        <div className="w-[20px]" />
      </div>

      <div className="flex flex-col items-center gap-1">
        {/*Статусы*/}
        <div className="flex gap-1">
          {/*TODO: тут иконки*/}
          <div className="h-4 w-4 bg-gray-400" />
          <div className="h-4 w-4 bg-gray-400" />
          <div className="h-4 w-4 bg-gray-400" />
        </div>

        {/*Доп. инфо*/}
        <p className="text-cyber-text-secondary text-center font-mono text-xs">прыжок из ямы: 75</p>

        {/*Сетка для easyWin*/}
        <div className="mb-2 flex">
          <div className={clsx(cellBase, cellBorder)}>12</div>
          <div className={clsx(cellBase, cellBorder)}>68</div>
          <div className={clsx(cellBase, cellLast)}>-</div>
        </div>
      </div>
    </div>
  );
};
