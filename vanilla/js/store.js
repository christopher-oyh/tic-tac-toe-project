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
    // Temp hardcoded value
    const currentPlayer = this.players[0];
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
