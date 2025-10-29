import type { JSX } from 'react';
import { PrimaryButton } from 'components';
import { RecordHeader } from 'pages/Record/RecordHeader';
import { RecordScore } from 'pages/Record/RecordScore';
import { RecordButtons } from 'pages/Record/RecordButtons';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updatePlayer } from 'db/operations';
import { useDb } from 'db/DbContext';
import { usePlayerStatus } from 'shared/hooks/usePlayerStatus';
import { getUpdatedPlayer } from 'pages/Record/handleRecord';

export const Record = (): JSX.Element => {
  const db = useDb();

  const navigate = useNavigate();

  const { playerId } = useParams();
  if (!playerId) throw new Error('Не задан playerId');

  // const navigate = useNavigate();

  const {
    state: { players, game },
    dispatch,
  } = useCurrentGame();
  if (!game) throw new Error('Игра c не найдена');

  const player = players.find((p) => p.id.toString() === playerId);

  if (!player) throw new Error(`Игрок c id === ${playerId} не найден`);

  const status = usePlayerStatus({ player });

  const [points, setPoints] = useState(0);

  useEffect(() => {
    console.log(points);
  }, [points]);

  const handleRecord = (): void => {
    const newPlayer = getUpdatedPlayer({ player, points, game, status });

    updatePlayer({ db, playerId: Number(playerId), gameId: game.id, playerConfig: newPlayer }).then(() => {
      dispatch({ type: 'UPDATE_PLAYER', payload: { id: newPlayer.id, data: newPlayer } });
      setPoints(0);
      navigate('/game');
    });
  };

  // console.log(player);
  // console.log(status);
  // console.log(points);

  return (
    <div className="flex h-full flex-col items-center justify-between px-4 pt-4 pb-25">
      <RecordHeader player={player} />
      <RecordScore points={points} player={player} truck={game.truck} />

      <div className="flex flex-col items-center">
        <RecordButtons score={player.score} points={points} onSetPoints={(newPoints) => setPoints(newPoints)} />
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
