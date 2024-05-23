type Player = {
  id: number;
  name: string;
  iconClass: string;
  colorClass: string;
};

type GameMove = {
  squareID: number;
  player: Player;
};

type GameStatus = {
  isComplete: boolean;
  winner: Player | null;
};

type Game = {
  moves: GameMove[];
  status: GameStatus;
};

type GameState = {
  currentGameMoves: GameMove[];
  history: {
    currentRoundGames: Game[];
    allGames: Game[];
  };
};
