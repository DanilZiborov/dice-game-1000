import type { JSX } from 'react';
import { PrimaryButton } from 'components';
import { RecordHeader } from 'pages/CurrentGame/Record/RecordHeader';
import { RecordScore } from 'pages/CurrentGame/Record/RecordScore';
import { RecordButtons } from 'pages/CurrentGame/Record/RecordButtons';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { updatePlayer } from 'db/operations';
import { useDb } from 'db/DbContext';
import { usePlayerStatus } from 'shared/hooks/usePlayerStatus';
import { getUpdatedPlayer } from 'pages/CurrentGame/Record/coreLogic/getUpdatedPlayer';
import type { Player } from 'shared/types';

type Props = {
  player: Player;
};

export const Record = ({ player }: Props): JSX.Element => {
  const db = useDb();

  const navigate = useNavigate();

  const {
    state: { game },
    dispatch,
  } = useCurrentGame();
  if (!game) throw new Error('Игра не найдена');

  const status = usePlayerStatus({ player });

  const [points, setPoints] = useState(0);

  const handleRecord = (): void => {
    const newPlayer = getUpdatedPlayer({ player, points, game, status });

    updatePlayer({ db, playerId: Number(player.id), gameId: game.id, playerConfig: newPlayer }).then(() => {
      dispatch({ type: 'UPDATE_PLAYER', payload: { id: newPlayer.id, data: newPlayer } });
      setPoints(0);
      navigate('/game');
    });
  };

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
          }}
        >
          Записать
        </PrimaryButton>
      </div>
    </div>
  );
};
