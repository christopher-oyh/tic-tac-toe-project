export type Player = {
  id: number;
  name: string;
  iconClass: string;
  colorClass: string;
};

export type GameMove = {
  squareID: number;
  player: Player;
};

export type GameStatus = {
  isComplete: boolean;
  winner: Player | null;
};

export type Game = {
  moves: GameMove[];
  status: GameStatus;
};

export type GameState = {
  currentGameMoves: GameMove[];
  history: {
    currentRoundGames: Game[];
    allGames: Game[];
  };
};
