import { Player } from "./types";

const initialState = {
  currentGameMoves: [], // squareID, player
  history: {
    currentRoundGames: [],
    allGames: [],
  },
};

export default class Store extends EventTarget {
  #winningCombination = [
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

  constructor(
    private readonly storageKey: string,
    private readonly players: Player[]
  ) {
    super();
  }

  get stats() {
    const state = this.#getState();
    // console.log("Stats: ", this.#getState());
    return {
      playerWithStats: this.players.map((player) => {
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

  get game() {
    const state = this.#getState();

    const currentPlayer = this.players[state.currentGameMoves.length % 2];

    let winner = null;
    for (const player of this.players) {
      //   console.log("Player: ", player);
      const selectedSquareIDs = state.currentGameMoves
        .filter((currentGameMoves) => currentGameMoves.player.id === player.id)
        .map((currentGameMoves) => currentGameMoves.squareID);

      // Check if the player has won
      for (const pattern of this.#winningCombination) {
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

  playerMove(squareID) {
    const stateClone = structuredClone(this.#getState());

    stateClone.currentGameMoves.push({
      squareID: +squareID, // Equivalent to squareID: squareID
      player: this.game.currentPlayer,
    });
    // console.log("State Clone: ", stateClone);
    this.#saveState(stateClone);
  }

  resetGame() {
    const { currentPlayer, currentGameMoves, status } = this.game;
    const stateClone = structuredClone(this.#getState());

    // Check if game is complete
    if (status.isComplete) {
      stateClone.history.currentRoundGames.push({ currentGameMoves, status });
    }
    stateClone.currentGameMoves = [];
    this.#saveState(stateClone);
  }

  resetScores() {
    this.resetGame();
    const stateClone = structuredClone(this.#getState());
    stateClone.history.allGames.push(...stateClone.history.currentRoundGames);
    stateClone.history.currentRoundGames = [];
    this.#saveState(stateClone);
  }

  #getState() {
    const item = window.localStorage.getItem(this.storageKey);
    return item ? JSON.parse(item) : initialState;
  }

  #saveState(stateOrCallback) {
    const prevState = this.#getState();

    let newState;
    switch (typeof stateOrCallback) {
      case "function":
        newState = stateOrCallback(prevState);
        break;
      case "object":
        newState = stateOrCallback;
        break;
      default:
        throw new Error("Invalid state or callback provided to saveState");
    }
    window.localStorage.setItem(this.storageKey, JSON.stringify(newState));

    this.dispatchEvent(new Event("stateChange"));
  }
}
