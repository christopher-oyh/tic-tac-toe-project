import { GameState, Player } from "./types";
const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-times",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-circle-o",
    colorClass: "yellow",
  },
];

export function derivedGame(state: GameState) {
  const currentPlayer = players[state.currentGameMoves.length % 2];

  const winningCombination = [
    // Horizontal
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // Vertical
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    // Diagonal
    [1, 5, 9],
    [3, 5, 7],
  ];

  let winner = null;
  for (const player of players) {
    //   console.log("Player: ", player);
    const selectedSquareIDs = state.currentGameMoves
      .filter((currentGameMoves) => currentGameMoves.player.id === player.id)
      .map((currentGameMoves) => currentGameMoves.squareID);

    // Check if the player has won
    for (const pattern of winningCombination) {
      // console.log("Pattern: ", pattern);
      if (pattern.every((squareID) => selectedSquareIDs.includes(squareID))) {
        winner = player;
        //   console.log("Winner: ", winner);
        break;
      }
    }
  }

  return {
    currentPlayer,
    currentGameMoves: state.currentGameMoves,
    status: {
      isComplete: winner != null || state.currentGameMoves.length === 9,
      winner,
    },
  };
}

export function derivedStats(state: GameState) {
  return {
    playerWithStats: players.map((player) => {
      const wins = state.history.currentRoundGames.filter(
        (game) => game.status.winner?.id == player.id
      ).length;

      return {
        ...player,
        wins,
      };
    }),
    ties: state.history.currentRoundGames.filter(
      (game) => game.status.winner === null
    ).length,
  };
}
