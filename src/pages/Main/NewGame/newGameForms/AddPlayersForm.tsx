import type { JSX, ChangeEvent } from 'react';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { CustomInput, IconButton } from 'components';
import { CloseIcon, PlusIcon } from 'components/icons';
import { clsx } from 'clsx';
import type { NewPlayerConfig } from 'shared/types';

type Props = {
  initialPlayers: NewPlayerConfig;
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
    shouldFocusRef.current = true; // помечаем, что нужно фокусироваться
  };

  const removePlayer = (index: number): void => setPlayers((prev) => prev.filter((_, i) => i !== index));

  // фокусируемся после отрисовки DOM
  useLayoutEffect(() => {
    if (shouldFocusRef.current && lastInputRef.current) {
      lastInputRef.current.focus();
      shouldFocusRef.current = false; // сбрасываем фокус
    }
  }, [players]);

  // записываем игроков в общий стейт
  useEffect(() => {
    onPlayersChange(players);
  }, [onPlayersChange, players]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="w-full overflow-auto pb-10">
        {players.map((value, index) => (
          <div
            /* тут это безопасно */
            /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            className={clsx('flex items-center justify-center gap-2 pl-6', { 'pr-12': index < 2 })}
          >
            <CustomInput
              ref={index === players.length - 1 ? lastInputRef : null}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
              label={`Игрок ${index + 1}`}
              placeholder="Введите имя игрока"
              className="mb-2"
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
        ))}
      </div>

      <IconButton onClick={addPlayer} className="shrink-0">
        <PlusIcon />
      </IconButton>
    </div>
  );
};
