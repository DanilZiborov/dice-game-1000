import { type JSX, useMemo } from 'react';
import { PrimaryButton } from 'components';
import { RecordHeader } from 'pages/CurrentGame/Record/RecordHeader';
import { RecordScore } from 'pages/CurrentGame/Record/RecordScore';
import { RecordButtons } from 'pages/CurrentGame/Record/RecordButtons';
import { useCurrentGame } from 'context/currentGame/CurrentGameContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { updatePlayer } from 'db/operations';
import { useDb } from 'db/DbContext';
import { usePlayerStatus } from 'shared/playerStatus/usePlayerStatus';
import { getUpdatedPlayer } from 'pages/CurrentGame/Record/coreLogic/getUpdatedPlayer';
import { loadSettingsFromLS } from 'shared/utils/loadSettingsFromLS';

export const Record = (): JSX.Element => {
  const db = useDb();

  const { playerId } = useParams();

  const navigate = useNavigate();

  const {
    state: { game, players },
    dispatch,
  } = useCurrentGame();

  const player = playerId ? players.find(({ id }) => id === Number(playerId)) : null;

  if (!game || !playerId || !player)
    throw new Error('Ошибка интерфейса записи игрока. Не найдено: game и/или player и/или playerId');

  const status = usePlayerStatus({ player });

  const [points, setPoints] = useState(0);

  const nextPlayerId = useMemo(() => {
    const nextPlayerIndex = players.findIndex((p) => p.id === +playerId) + 1;

    return players[nextPlayerIndex]?.id ?? players[0].id;
  }, [playerId, players]);

  const handleRecord = (): void => {
    if (!status) return;
    const newPlayer = getUpdatedPlayer({ player, points, game, status });
    updatePlayer({ db, playerId: Number(player.id), gameId: game.id, playerConfig: newPlayer }).then(() => {
      dispatch({ type: 'UPDATE_PLAYER', payload: { id: newPlayer.id, data: newPlayer } });
      setPoints(0);

      const { playerAutoChange } = loadSettingsFromLS();

      navigate(playerAutoChange ? `/app/game/current/${nextPlayerId}` : '/app/game/current/', { replace: true });
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between px-4 pb-25">
      <RecordHeader player={player} />
      <RecordScore points={points} player={player} truck={game.truck} />

      <div className="flex flex-col items-center">
        <RecordButtons score={player.score} points={points} onSetPoints={(newPoints) => setPoints(newPoints)} />
        <PrimaryButton
          key={playerId}
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
