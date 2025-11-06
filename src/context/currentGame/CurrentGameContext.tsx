import { createContext, useContext, useReducer, type JSX, type Dispatch } from 'react';
import { currentGameReducer } from './currentGameReducer';
import type { CurrentGameState, CurrentGameAction } from './types';

const initialState: CurrentGameState = {
  game: null,
  players: [],
};

export const CurrentGameContext = createContext<{
  state: CurrentGameState;
  dispatch: Dispatch<CurrentGameAction>;
} | null>(null);

export const CurrentGameProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatch] = useReducer(currentGameReducer, initialState);

  return <CurrentGameContext.Provider value={{ state, dispatch }}>{children}</CurrentGameContext.Provider>;
};

export const useCurrentGame = () => {
  const context = useContext(CurrentGameContext);
  if (!context) throw new Error('редьюсер useCurrentGame должен быть использован только с провайдером контекста');

  return context;
};
