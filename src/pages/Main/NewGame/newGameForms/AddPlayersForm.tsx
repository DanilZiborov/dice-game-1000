import type { JSX, ChangeEvent } from 'react';
import { CustomInput, IconButton } from 'components';
import { useState } from 'react';
import { CloseIcon, PlusIcon } from 'components/icons';

export const AddPlayerForm = (): JSX.Element => {
  const [players, setPlayers] = useState<string[]>(['', '']);

  const handleChange = (index: number, value: string) => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      newPlayers[index] = value;

      return newPlayers;
    });
  };

  const addPlayer = () => setPlayers((prev) => [...prev, '']);

  const removePlayer = (index: number) =>
    setPlayers((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        {players.map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-2 pl-6"
          >
            <CustomInput
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              label={`Игрок ${index + 1}`}
              placeholder="Введите имя игрока"
              className="mb-3"
            />
            <IconButton
              onClick={() => removePlayer(index)}
              className="active: border-transparent bg-transparent"
            >
              <CloseIcon />
            </IconButton>
          </div>
        ))}
      </div>

      {/* Кнопка добавления нового игрока */}
      <div className="mt-6 mb-8">
        <IconButton onClick={addPlayer}>
          <PlusIcon />
        </IconButton>
      </div>
    </div>
  );
};
