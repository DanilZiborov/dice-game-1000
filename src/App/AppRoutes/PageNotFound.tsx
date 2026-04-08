import { type JSX, useMemo } from 'react';
import { ArrowIcon } from 'components/icons';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'components/icons/dices';

/**
 * Генерирует массив из 5 значений для костей (от 2 до 6, исключая 1 и 5),
 * в котором ни одно значение не повторяется больше двух раз.
 */
const generateDiceValues = (): number[] => {
  const allowed = [2, 3, 4, 6];
  const results: number[] = [];
  const count: Record<number, number> = {};

  while (results.length < 5) {
    const value = allowed[Math.floor(Math.random() * allowed.length)];

    if ((value in count && count[value] < 2) || !(value in count)) {
      results.push(value);
      if (value in count) {
        count[value] = count[value] + 1;
      } else count[value] = 1;
    }
  }

  return results;
};

/** Компонент, отображающий игральную кость по её значению */
const DiceIcon = ({ value, className }: { value: number; className?: string }): JSX.Element | null => {
  switch (value) {
    case 1:
      return <Dice1 className={className} />;
    case 2:
      return <Dice2 className={className} />;
    case 3:
      return <Dice3 className={className} />;
    case 4:
      return <Dice4 className={className} />;
    case 5:
      return <Dice5 className={className} />;
    case 6:
      return <Dice6 className={className} />;
    default:
      return null;
  }
};

export const PageNotFound = (): JSX.Element => {
  const diceValues = useMemo(() => generateDiceValues(), []);

  // Координаты для каждой кости (left, top)
  const positions = [
    ['45%', '35%'],
    ['13%', '74%'],
    ['76%', '67%'],
    ['56%', '10%'],
    ['5%', '29%'],
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* Крупный заголовок */}
      <h1 className="mb-12 text-center text-2xl font-bold">страница не найдена</h1>

      {/* Контейнер для костей с относительным позиционированием */}
      <div className="relative mb-16 h-50 w-full max-w-75">
        {diceValues.map((value, index) => (
          <div
            /* eslint-disable-next-line react/no-array-index-key */
            key={index + value}
            className="absolute"
            style={{
              top: positions[index][0],
              left: positions[index][1],
            }}
          >
            <DiceIcon value={value} />
          </div>
        ))}
      </div>

      {/* Блок «назад» */}
      <div className="flex cursor-pointer items-baseline gap-3 text-2xl" onClick={() => window.history.back()}>
        <ArrowIcon direction="left" />
        <p className="relative bottom-1">назад</p>
      </div>
    </div>
  );
};
