import type { CurrentGameAction, CurrentGameState } from 'context/currentGame/types';
import type { Game } from 'shared/types';

/**
 * Проверяет, что игра существует. Если нет — выбрасывает ошибку.
 * Это защищает от вызова игровых экшенов до инициализации игры.
 */
const ensureGame = (state: CurrentGameState): Game => {
  if (!state.game) {
    throw new Error('Попытка записи в контекст players при game === null');
  }

  return state.game;
};

export const currentGameReducer = (state: CurrentGameState, action: CurrentGameAction): CurrentGameState => {
  switch (action.type) {
    case 'SET_GAME':
      return {
        ...state,
        game: action.payload,
      };

    case 'SET_PLAYERS': {
      ensureGame(state);

      return {
        ...state,
        players: action.payload,
      };
    }

    case 'UPDATE_PLAYER': {
      ensureGame(state);

      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.id ? { ...player, ...action.payload.data } : player,
        ),
      };
    }

    default:
      return state;
  }
};
