import type { CurrentGameAction, CurrentGameState } from 'context/currentGame/types';
import type { Game } from 'shared/types';
import { getPlayerWithStatus } from 'context/currentGame/getPlayerWithStatus';

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
      return { ...state, game: action.payload };

    case 'SET_PLAYERS': {
      const game = ensureGame(state);

      return {
        ...state,
        players: action.payload.map((playerDTO) => getPlayerWithStatus({ playerDTO, game })),
      };
    }

    case 'UPDATE_PLAYER': {
      const game = ensureGame(state);
      const updatedPlayers = state.players.map((player) => {
        if (player.data.id === action.payload.id) {
          const updatedPlayerDTO = { ...player.data, ...action.payload.data };

          return getPlayerWithStatus({ playerDTO: updatedPlayerDTO, game });
        }

        return getPlayerWithStatus({ playerDTO: player.data, game });
      });

      return { ...state, players: updatedPlayers };
    }

    default:
      return state;
  }
};
