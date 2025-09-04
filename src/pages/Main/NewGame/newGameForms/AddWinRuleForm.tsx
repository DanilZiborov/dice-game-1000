import type { JSX, ChangeEvent } from 'react';
import { CustomCheckbox } from 'components/CustomCheckbox';
import type { GameConfig } from 'pages/Main/NewGame/types';

type Rules = Pick<GameConfig, 'withEasyWin'>;

type Props = {
  onConfigChange: (newRules: Partial<Rules>) => void;
  rules: Rules;
};

export const AddWinRuleForm = ({ onConfigChange, rules }: Props): JSX.Element => {
  return (
    <div className="h-full">
      <div className="mb-10 flex flex-col gap-4 text-slate-300">
        <p>
          В классическом варианте игры, игроку, сидящему на бочке, даётся один ход, чтобы выбросить
          недостающие до 1000 очки. Если не получилось - он падает с бочки.
        </p>
        <p>
          Режим &quot;Быстрая победа&quot; выходит за рамки классических правил игры. В этом режиме
          у игрока есть не один, а три хода, чтобы выбросить победные очки, которые не сгорают в
          течение этих трёх попыток. Остальные правила остаются без изменений.
        </p>
      </div>

      <div className="flex justify-center">
        <CustomCheckbox
          checked={rules.withEasyWin}
          label='включить "Быструю победу"'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onConfigChange({ withEasyWin: e.target.checked })
          }
        />
      </div>
    </div>
  );
};
