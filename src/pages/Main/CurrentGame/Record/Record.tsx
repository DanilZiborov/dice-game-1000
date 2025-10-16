import type { JSX } from 'react';
import { useState } from 'react';
import { ArrowIcon } from 'components/icons';
import { PrimaryButton } from 'components';

type Props = {
  disableRecordMode: () => void;
};

export const Record = ({ disableRecordMode }: Props): JSX.Element => {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      {/* Заголовок */}
      <div>
        <div className="flex items-center justify-between">
          <div onClick={disableRecordMode}>
            <ArrowIcon direction="left" />
          </div>
          <h1 className="text-[24px]">Пантелеймон</h1>
          <div className="w-[20px]"></div>
        </div>

        {/* Контейнер со статус-баром и ячейками */}
        <div className="flex flex-col items-center gap-1">
          {/* Статус-бар (3 иконки-заглушки) */}
          <div className="flex gap-1">
            <div className="h-4 w-4 bg-gray-400" />
            <div className="h-4 w-4 bg-gray-400" />
            <div className="h-4 w-4 bg-gray-400" />
          </div>
          <p className="text-cyber-text-secondary text-center font-mono text-xs">прыжок из ямы: 75</p>
          <div className="border-cyber-text-secondary mb-2 flex border font-mono text-[10px] leading-none tracking-widest">
            <div className="border-cyber-text-secondary flex h-[16px] w-[36px] items-center justify-center border-r">
              12
            </div>
            <div className="border-cyber-text-secondary flex h-[16px] w-[36px] items-center justify-center border-r">
              68
            </div>
            <div className="flex h-[16px] w-[36px] items-center justify-center">-</div>
          </div>
        </div>
      </div>

      {/* Счёт */}
      <div className="flex flex-col items-center">
        <div className="text-center text-[64px] leading-none">115</div>
        <p className="text-cyber-text-secondary mb-3 text-center font-mono text-xs tracking-wider">325 + 115 = 440</p>
      </div>

      {/* Кнопки */}
      <div className="flex flex-col items-center pb-20">
        <div className="mb-16">
          <div className="mb-5 flex justify-center gap-6">
            <button
              type="button"
              className="border-cyber-primary text-color-cyber-primary active:bg-cyber-secondary shadow-[0_0_10px_theme(colors.cyber-primary)] flex h-[80px] w-[80px] items-center justify-center rounded-full border-2 bg-transparent text-2xl transition-colors active:text-black"
            >
              +5
            </button>

            <button
              type="button"
              className="border-cyber-primary text-color-cyber-primary active:bg-cyber-secondary shadow-[0_0_10px_theme(colors.cyber-primary)] flex h-[80px] w-[80px] items-center justify-center rounded-full border-2 bg-transparent text-2xl transition-colors active:text-black"
            >
              +10
            </button>

            <button
              type="button"
              className="border-cyber-primary text-color-cyber-primary active:bg-cyber-secondary shadow-[0_0_10px_theme(colors.cyber-primary)] flex h-[80px] w-[80px] items-center justify-center rounded-full border-2 bg-transparent text-2xl transition-colors active:text-black"
            >
              +50
            </button>
          </div>
          <div className="flex justify-evenly px-6">
            <button
              type="button"
              className="border-cyber-secondary text-color-cyber-primary active:bg-cyber-secondary shadow-[0_0_10px_theme(colors.cyber-primary)] mb-4 flex h-[35px] w-[80px] items-center justify-center rounded-full border-2 bg-transparent px-2 text-lg transition-colors active:text-black"
            >
              +
            </button>
            <button
              type="button"
              className="border-cyber-secondary text-color-cyber-primary active:bg-cyber-secondary shadow-[0_0_10px_theme(colors.cyber-primary)] mb-4 flex h-[35px] w-20 items-center justify-center rounded-full border-2 bg-transparent px-2 font-mono text-lg text-sm transition-colors active:text-black"
            >
              сброс
            </button>
          </div>
        </div>
        <PrimaryButton onClick={() => console.log('игра записана')}>Записать</PrimaryButton>
      </div>
    </div>
  );
};
