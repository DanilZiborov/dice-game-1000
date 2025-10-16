import type { JSX } from 'react';
import type { Game, Player } from 'shared/types';
import { useState } from 'react';
import { Record } from 'pages/Main/CurrentGame/Record';
import { PlayersList } from 'pages/Main/CurrentGame/PlayersList';

type CurrentGameProps = {
  game: Game;
  players: Player[];
};

export const CurrentGame = ({ players, game }: CurrentGameProps): JSX.Element => {
  const [isRecordMode, setIsRecordMode] = useState(false);

  return (
    <div className="align-center flex h-full flex-col justify-center">
      {isRecordMode ? (
        <Record disableRecordMode={() => setIsRecordMode(false)} />
      ) : (
        <PlayersList players={players} enableRecordMode={() => setIsRecordMode(true)} />
      )}
    </div>
  );
};

// TODO: переписать всё-таки через роутер, чтобы работала навигация по тапу на кнопку назад
