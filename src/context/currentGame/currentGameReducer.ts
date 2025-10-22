import type { CurrentGameAction, CurrentGameState } from 'context/currentGame/types';

export const currentGameReducer = (state: CurrentGameState, action: CurrentGameAction): CurrentGameState => {
  switch (action.type) {
    case 'SET_GAME':
      return { ...state, game: action.payload };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        players: state.players.map((p) => (p.id === action.payload.id ? { ...p, ...action.payload.data } : p)),
      };
    default:
      return state;
  }
};
