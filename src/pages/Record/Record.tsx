import type { JSX } from 'react';
import { PrimaryButton } from 'components';
import { RecordHeader } from 'pages/Record/RecordHeader';
import { RecordScore } from 'pages/Record/RecordScore';
import { RecordButtons } from 'pages/Record/RecordButtons';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { updatePlayer } from 'db/operations';
import { useDb } from 'db/DbContext';

export const Record = (): JSX.Element => {
  const db = useDb();

  const { playerId } = useParams();

  const navigate = useNavigate();

  const {
    state: { players },
    dispatch,
  } = useCurrentGame();

  const player = players.find((p) => p.data.id.toString() === playerId);

  if (!player) throw new Error('Игрок не найден');

  const [points, setPoints] = useState(0);

  console.log(points);

  // Пока тестово
  const handleRecord = (): void => {
    const newScore = player.data.score + points;

    void updatePlayer({
      db,
      gameId: player.data.gameId,
      playerId: Number(playerId),
      playerConfig: { score: newScore },
    });
    dispatch({ type: 'UPDATE_PLAYER', payload: { id: Number(playerId), data: { score: newScore } } });
    navigate('/game')
  };

  return (
    <div className="flex h-full flex-col items-center justify-between px-4 pt-4 pb-25">
      <RecordHeader player={player} />
      <RecordScore points={points} player={player} />

      <div className="flex flex-col items-center">
        <RecordButtons score={player.data.score} points={points} onSetPoints={(newPoints) => setPoints(newPoints)} />
        <PrimaryButton
          withDelay
          onClick={() => {
            handleRecord();
            console.log('игра записана');
          }}
        >
          Записать
        </PrimaryButton>
      </div>
    </div>
  );
};
