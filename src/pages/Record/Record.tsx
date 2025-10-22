import type { JSX } from 'react';
import { PrimaryButton } from 'components';
import { RecordHeader } from 'pages/Record/RecordHeader';
import { RecordScore } from 'pages/Record/RecordScore';
import { RecordButtons } from 'pages/Record/RecordButtons';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useParams } from 'react-router-dom';

export const Record = (): JSX.Element => {
  const { playerId } = useParams();
  const {
    state: { players, game },
    dispatch,
  } = useCurrentGame();

  const player = players.find((p) => p.id.toString() === playerId);

  if (!player) throw new Error('Игрок не найден');

  return (
    <div className="flex h-full flex-col items-center justify-between px-4 pt-4 pb-25">
      <RecordHeader player={player} />
      <RecordScore />

      <div className="flex flex-col items-center">
        <RecordButtons />
        <PrimaryButton withDelay onClick={() => console.log('игра записана')}>
          Записать
        </PrimaryButton>
      </div>
    </div>
  );
};
