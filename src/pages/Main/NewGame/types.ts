export type Player = { name: string; score: number };

export type GameConfig = {
  enterLimit: number;
  barrelLimit: number;
  withBolts: boolean;
  withOvertake: boolean;
  boltsLimit: number;
  pit200: boolean;
  pit700: boolean;
  overtakeLimit: number;
  truck: boolean;
  withEasyWin: boolean;
};

export type Game = GameConfig & {
  players: Player[];
  started: string;
  finished: string;
};
