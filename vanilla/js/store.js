const initialState = {
  movesHistory: [], // squareID, player
};

export default class Store {
  #state = initialState;
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

  constructor(players) {
    this.players = players;
  }

  get game() {
    const state = this.#getState();

    const currentPlayer = this.players[this.#state.movesHistory.length % 2];

    let winner = null;
    for (const player of this.players) {
      //   console.log("Player: ", player);
      const selectedSquareIDs = state.movesHistory
        .filter((movesHistory) => movesHistory.player.id === player.id)
        .map((movesHistory) => movesHistory.squareID);

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
      movesHistory: state.movesHistory,
      status: {
        isComplete: winner != null || state.movesHistory.length === 9,
        winner,
      },
    };
  }

  playerMove(squareID) {
    const state = this.#getState();
    const stateClone = structuredClone(state);

    stateClone.movesHistory.push({
      squareID: +squareID, // Equivalent to squareID: squareID
      player: this.game.currentPlayer,
    });
    console.log("State Clone: ", stateClone);
    this.#saveState(stateClone);
  }

  resetGame() {
    this.#saveState(initialState);
  }

  #getState() {
    return this.#state;
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
    this.#state = newState;
  }
}
