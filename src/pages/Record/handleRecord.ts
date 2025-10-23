import type { Game, Player } from 'shared/types';
import { MAX_BOLT_NUMBER } from 'shared/constants';

type Args = {
  game: Game;
  player: Player;
  points: number;
};

export const handleRecord = ({ player, points, game }: Args): void => {
  const { boltsLimit } = game;
  const {
    data: { score, boltsNumber, barrelAttempts },
    status: { isInPit, isOnBarrel, isEnterGame },
  } = player;

  let newScore = score + points;
  let newBoltNumber = boltsNumber;
  let newBarrelAttempts = barrelAttempts;
  let easyWinAttempts =

  // проверяем болты
  const needBolt = points === 0 && !isInPit && !isOnBarrel && isEnterGame;

  if (needBolt) {
    if (boltsNumber < MAX_BOLT_NUMBER) {
      newBoltNumber++;
    } else if (boltsNumber === MAX_BOLT_NUMBER) newScore = newScore - boltsLimit;
  }

  // проверяем падения с бочки
  // если
  if(isOnBarrel) {
    if(newScore < 1000) {

    }
  }


};
