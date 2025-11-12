import type { JSX, ChangeEvent } from 'react';
import { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { CustomInput, IconButton } from 'components';
import { CloseIcon, PlusIcon } from 'components/icons';
import { clsx } from 'clsx';
import { PLAYER_NAME_MAXLENGTH } from 'shared/constants';
import { findDuplicates } from 'shared/utils/findDuplicates';

type Props = {
  initialPlayers: string[];
  onPlayersChange: (players: string[]) => void;
};

export const AddPlayerForm = ({ onPlayersChange, initialPlayers }: Props): JSX.Element => {
  const [players, setPlayers] = useState<string[]>(initialPlayers);
  const lastInputRef = useRef<HTMLInputElement | null>(null);
  const shouldFocusRef = useRef(false);

  const handleChange = (index: number, value: string): void => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      newPlayers[index] = value;

      return newPlayers;
    });
  };

  const addPlayer = (): void => {
    setPlayers((prev) => [...prev, '']);
    shouldFocusRef.current = true;
  };

  const removePlayer = (index: number): void => setPlayers((prev) => prev.filter((_, i) => i !== index));

  // фокусируемся после отрисовки DOM
  useLayoutEffect(() => {
    if (shouldFocusRef.current && lastInputRef.current) {
      lastInputRef.current.focus();
      shouldFocusRef.current = false;
    }
  }, [players]);

  // записываем игроков в общий стейт
  useEffect(() => {
    onPlayersChange(players);
  }, [onPlayersChange, players]);

  // вычисляем дубли (в нижнем регистре, чтобы не зависело от регистра)
  const playerDupes = useMemo(() => findDuplicates(players), [players]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <form
        className="w-full overflow-auto pb-10"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: тут надо понаблюдать, какое поведение лучше
          // addPlayer();
          lastInputRef.current?.blur();
        }}
      >
        {players.map((value, index) => {
          const duplicate = value && playerDupes.includes(value);

          return (
            /* eslint-disable-next-line react/no-array-index-key */
            <div key={index} className={clsx('flex items-center justify-center gap-2 pl-6', { 'pr-12': index < 2 })}>
              <CustomInput
                ref={index === players.length - 1 ? lastInputRef : null}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                label={`Игрок ${index + 1}`}
                placeholder="Введите имя игрока"
                className={clsx(
                  'mb-2',
                  duplicate && 'border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500',
                )}
                maxLength={PLAYER_NAME_MAXLENGTH}
              />
              {index > 1 && (
                <IconButton
                  onClick={() => removePlayer(index)}
                  className="relative top-[5px] border-transparent active:bg-transparent"
                >
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          );
        })}
        <button type="submit" className="hidden" />
      </form>

      <IconButton onClick={addPlayer} className="shrink-0">
        <PlusIcon />
      </IconButton>
    </div>
  );
};
