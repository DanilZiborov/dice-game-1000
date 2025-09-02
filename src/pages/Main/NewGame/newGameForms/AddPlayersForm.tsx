import type { JSX, ChangeEvent } from 'react';
import { CustomInput, IconButton } from 'components';
import { useState, useRef, useEffect } from 'react';
import { CloseIcon, PlusIcon } from 'components/icons';
import clsx from 'clsx';

type Props = {
  initialPlayers: string[];
  onPlayersChange: (players: string[]) => void;
};

export const AddPlayerForm = ({ onPlayersChange, initialPlayers }: Props): JSX.Element => {
  const [players, setPlayers] = useState<string[]>(initialPlayers);
  const lastInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (index: number, value: string): void => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      newPlayers[index] = value;

      return newPlayers;
    });
  };

  const addPlayer = (): void => {
    setPlayers((prev) => [...prev, '']);
    lastInputRef?.current && lastInputRef.current?.focus();
  };

  const removePlayer = (index: number): void =>
    setPlayers((prev) => prev.filter((_, i) => i !== index));

  // записываем игроков в общий стейт
  useEffect(() => {
    onPlayersChange(players);
  }, [onPlayersChange, players]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-10 w-full overflow-auto">
        {players.map((value, index) => (
          <div
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
