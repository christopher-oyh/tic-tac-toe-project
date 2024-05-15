const initialState = {
  movesHistory: [],
};

export default class Store {
  #state = initialState;

  constructor(players) {
    this.players = players;
  }

  get game() {
    const state = this.#getState();

    const currentPlayer = this.players[this.#state.movesHistory.length % 2];

    return {
      currentPlayer,
    };
  }

  playerMove(squareID) {
    const state = this.#getState();
    const stateClone = structuredClone(state);

    stateClone.movesHistory.push({
      squareID, // Equivalent to squareID: squareID
      player: this.game.currentPlayer,
    });

    this.#saveState(stateClone);
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
