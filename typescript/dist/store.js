var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Store_instances, _Store_winningCombination, _Store_getState, _Store_saveState;
const initialState = {
    currentGameMoves: [], // squareID, player
    history: {
        currentRoundGames: [],
        allGames: [],
    },
};
class Store extends EventTarget {
    constructor(storageKey, players) {
        super();
        _Store_instances.add(this);
        this.storageKey = storageKey;
        this.players = players;
        _Store_winningCombination.set(this, [
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
        ]);
    }
    get stats() {
        const state = __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
        // console.log("Stats: ", this.#getState());
        return {
            playerWithStats: this.players.map((player) => {
                const wins = state.history.currentRoundGames.filter((game) => { var _a; return ((_a = game.status.winner) === null || _a === void 0 ? void 0 : _a.id) == player.id; }).length;
                return Object.assign(Object.assign({}, player), { wins });
            }),
            ties: state.history.currentRoundGames.filter((game) => game.status.winner === null).length,
        };
    }
    get game() {
        const state = __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
        const currentPlayer = this.players[state.currentGameMoves.length % 2];
        let winner = null;
        for (const player of this.players) {
            //   console.log("Player: ", player);
            const selectedSquareIDs = state.currentGameMoves
                .filter((currentGameMoves) => currentGameMoves.player.id === player.id)
                .map((currentGameMoves) => currentGameMoves.squareID);
            // Check if the player has won
            for (const pattern of __classPrivateFieldGet(this, _Store_winningCombination, "f")) {
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
        const stateClone = structuredClone(__classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this));
        stateClone.currentGameMoves.push({
            squareID: +squareID, // Equivalent to squareID: squareID
            player: this.game.currentPlayer,
        });
        // console.log("State Clone: ", stateClone);
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_saveState).call(this, stateClone);
    }
    resetGame() {
        const { currentPlayer, currentGameMoves, status } = this.game;
        const stateClone = structuredClone(__classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this));
        // Check if game is complete
        if (status.isComplete) {
            stateClone.history.currentRoundGames.push({ currentGameMoves, status });
        }
        stateClone.currentGameMoves = [];
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_saveState).call(this, stateClone);
    }
    resetScores() {
        this.resetGame();
        const stateClone = structuredClone(__classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this));
        stateClone.history.allGames.push(...stateClone.history.currentRoundGames);
        stateClone.history.currentRoundGames = [];
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_saveState).call(this, stateClone);
    }
}
_Store_winningCombination = new WeakMap(), _Store_instances = new WeakSet(), _Store_getState = function _Store_getState() {
    const item = window.localStorage.getItem(this.storageKey);
    return item ? JSON.parse(item) : initialState;
}, _Store_saveState = function _Store_saveState(stateOrCallback) {
    const prevState = __classPrivateFieldGet(this, _Store_instances, "m", _Store_getState).call(this);
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
};
export default Store;
