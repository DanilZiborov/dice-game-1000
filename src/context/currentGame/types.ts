import type { Game, Player } from 'shared/types';

export type CurrentGameState = {
  game: Game | null;
  players: Player[];
};

export type CurrentGameAction =
  | { type: 'SET_GAME'; payload: Game }
  | { type: 'SET_PLAYERS'; payload: Player[] }
  | { type: 'UPDATE_PLAYER'; payload: { id: number; data: Partial<Player> } };
