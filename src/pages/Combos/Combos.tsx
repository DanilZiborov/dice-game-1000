import type { JSX } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'components/icons/dices';

type ComboRowProps = {
  label: string;
  dice: number[];
};

const diceComponents: Record<number, ({ className }: { className?: string }) => JSX.Element> = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

const ComboRow = ({ label, dice }: ComboRowProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="leading-tight">{label}</div>

      <div className="flex flex-nowrap items-center gap-2">
        {dice.map((d, i) => {
          const Icon = diceComponents[d];

          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`dice-${i}`} className="h-10 w-10 flex-shrink-0">
              <Icon />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Combos = (): JSX.Element => {
  const top = [
    {
      label: 'Комбинация 1-2-3-4-5 — 125 очков',
      dice: [1, 2, 3, 4, 5],
    },
    {
      label: 'Комбинация 2-3-4-5-6 — 250 очков',
      dice: [2, 3, 4, 5, 6],
    },
  ];

  const groups = [
    {
      title: 'Единицы',
      rows: [
        { label: '3 единицы — 100 очков.', dice: [1, 1, 1] },
        { label: '4 единицы — 200 очков.', dice: [1, 1, 1, 1] },
        { label: '5 единиц — 1000 очков.', dice: [1, 1, 1, 1, 1] },
      ],
    },
    {
      title: 'Двойки',
      rows: [
        { label: '3 двойки — 20 очков.', dice: [2, 2, 2] },
        { label: '4 двойки — 40 очков.', dice: [2, 2, 2, 2] },
        { label: '5 двоек — 200 очков.', dice: [2, 2, 2, 2, 2] },
      ],
    },
    {
      title: 'Тройки',
      rows: [
        { label: '3 тройки — 30 очков.', dice: [3, 3, 3] },
        { label: '4 тройки — 60 очков.', dice: [3, 3, 3, 3] },
        { label: '5 троек — 300 очков.', dice: [3, 3, 3, 3, 3] },
      ],
    },
    {
      title: 'Четвёрки',
      rows: [
        { label: '3 четвёрки — 40 очков.', dice: [4, 4, 4] },
        { label: '4 четвёрки — 80 очков.', dice: [4, 4, 4, 4] },
        { label: '5 четвёрок — 400 очков.', dice: [4, 4, 4, 4, 4] },
      ],
    },
    {
      title: 'Пятёрки',
      rows: [
        { label: '3 пятёрки — 50 очков.', dice: [5, 5, 5] },
        { label: '4 пятёрки — 100 очков.', dice: [5, 5, 5, 5] },
        { label: '5 пятёрок — 500 очков.', dice: [5, 5, 5, 5, 5] },
      ],
    },
    {
      title: 'Шестёрки',
      rows: [
        { label: '3 шестёрки — 60 очков.', dice: [6, 6, 6] },
        { label: '4 шестёрки — 120 очков.', dice: [6, 6, 6, 6] },
        { label: '5 шестёрок — 600 очков.', dice: [6, 6, 6, 6, 6] },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* --- TOP --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {top.map((c, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ComboRow key={`top-row-${i}`} label={c.label} dice={c.dice} />
        ))}
      </div>

      {/* --- GROUPS --- */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {groups.map((group, gi) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`group-${gi}`} className="flex flex-col gap-2">
            {group.rows.map((row, ri) => (
              // eslint-disable-next-line react/no-array-index-key
              <ComboRow key={`row-${gi}-${ri}`} label={row.label} dice={row.dice} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
