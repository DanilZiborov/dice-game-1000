import type { Game, Player, PlayerStatus } from 'shared/types';
import {
  MAX_BOLTS,
  MAX_EASY_WIN_ATTEMPTS,
  MAX_FAILS,
  ROLLBACK_POINTS,
  THOUSAND_WINNING_POINTS,
  TRUCK_POINTS,
} from 'shared/constants';

type Args = {
  game: Game;
  player: Player;
  points: number;
  status: PlayerStatus;
};

export const getUpdatedPlayer = ({ player, points, game, status }: Args): Player => {
  // TODO: тут нужен большой рефакторинг

  const { isInPit, isOnBarrel } = status;

  const { boltsLimit, withEasyWin, enterLimit, truck, barrelLimit } = game;
  const { score, boltsNumber, isEnterGame, easyWinLog, failsNumber } = player;

  const playerCopy = structuredClone(player);

  let resultScore = score + points;

  // нельзя записать больше 1000
  if (resultScore > THOUSAND_WINNING_POINTS) resultScore = 1000;

  // нельзя записать больше 900, когда садишься на бочку
  if (score < barrelLimit && resultScore > barrelLimit) resultScore = barrelLimit;

  // нельзя записать меньше паспорта при входе в игру
  if (!isEnterGame && resultScore < enterLimit) resultScore = 0;

  // сидя в яме нельзя записывать меньше, чем нужно для прыжка
  // только если это не обгоны
  // штраф за обгон может выбросить из ямы
  if (isInPit && typeof status.pitPointsLeft === 'number' && points < status.pitPointsLeft && points > 0)
    resultScore = score;

  // нельзя уйти в минус
  if (resultScore < 0) resultScore = 0;

  // обновляем счёт
  playerCopy.score = resultScore;

  // обновляем лог
  playerCopy.log.push(resultScore);

  // обрабатываем болты
  // болт назначается игроку, который выкинул 0, вошёл в игру, не находится на бочке и не находится в яме
  // в противном случае болт не записывается
  const needBolt = points === 0 && !isInPit && !isOnBarrel && isEnterGame;

  if (needBolt) {
    if (boltsNumber < MAX_BOLTS - 1) {
      // если количество болтов не привысило лимит, добавляем болт
      // иначе - списываем очки и обнуляем болты
      playerCopy.boltsNumber = boltsNumber + 1;
    } else {
      // болты не могут увести игрока в минус
      playerCopy.score = score < 0 ? 0 : score - boltsLimit;
      playerCopy.boltsNumber = 0;
    }
  }

  const isFail = !withEasyWin || (withEasyWin && easyWinLog.length > MAX_EASY_WIN_ATTEMPTS - 1);

  // обрабатываем падения с бочки
  if (isOnBarrel) {
    // если ещё не победил
    if (resultScore < THOUSAND_WINNING_POINTS) {
      // проверяем, ставить ли фолл. Отдельная логика для easyWin.
      if (isFail) {
        if (failsNumber < MAX_FAILS - 1) {
          playerCopy.failsNumber = failsNumber + 1;
          playerCopy.score = barrelLimit - ROLLBACK_POINTS;
          playerCopy.easyWinLog = [];
        } else {
          playerCopy.score = 0;
          playerCopy.boltsNumber = 0;
          playerCopy.failsNumber = 0;
          playerCopy.easyWinLog = [];
        }
      } else {
        if (withEasyWin) easyWinLog.push(points);
      }
    }
  }

  // обрабатываем вход в игру.
  // срабатывает один раз за партию

  if (!isEnterGame) {
    playerCopy.isEnterGame = resultScore >= enterLimit;
  }

  // обрабатываем самосвал
  if (truck && resultScore === TRUCK_POINTS) playerCopy.score = 0;

  return playerCopy;
};
