console.log("Hello from vanilla/js/index.js!");

const App = {
  // Properties of Namespace
  // All of the selectors are stored here
  $: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector(".items"),
    resetBtn: document.querySelector("[data-id='reset-btn']"),
    newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
    undoBtn: document.querySelector("[data-id='undo-btn']"),
    redoBtn: document.querySelector("[data-id='redo-btn']"),
    squares: document.querySelectorAll("[data-id='squares']"),
  },

  // States of the application
  state: {
    currentPlayer: "X",
    movesHistory: [],
    roundsHistory: [],
  },

  config: {
    winningCombination: [
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
    ],
  },

  getGameStatus(moves) {
    const xMoves = moves
      .filter((move) => move.playerID === "X")
      .map((move) => parseInt(move.squareID));
    const oMoves = moves
      .filter((move) => move.playerID === "O")
      .map((move) => parseInt(move.squareID));
    // console.log("X Moves: ", xMoves);
    // console.log("O Moves: ", oMoves);

    // Check if one of the players won
    let winner = null;
    App.config.winningCombination.forEach((pattern) => {
      const xWins = pattern.every((squareID) => xMoves.includes(squareID));
      const oWins = pattern.every((squareID) => oMoves.includes(squareID));
      if (xWins) {
        winner = "X";
      }
      if (oWins) {
        winner = "O";
      }
    });

    return {
      status:
        moves.length === 9 || winner !== null ? "complete" : "in-progress",
      winner: winner,
    };
  },

  // es6 init function
  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    App.$.menu.addEventListener("click", (event) => {
      // console.log(event.target);
      App.$.menuItems.classList.toggle("hidden");
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("Reset Button Clicked!");
    });

    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("New Round Button Clicked!");
    });

    App.$.undoBtn.addEventListener("click", (event) => {
      console.log("Undo Button Clicked!");
    });

    App.$.redoBtn.addEventListener("click", (event) => {
      console.log("Redo Button Clicked!");
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        console.log(`Square with id: ${event.target.id} clicked!`);
        console.log(
          `Moves History: ${JSON.stringify(App.state.movesHistory, null, 2)}`
        );

        // Check if the current square is already filled from the moves history
        const getMoveFromSquare = (squareID) => {
          return App.state.movesHistory.find(
            (move) => move.squareID === squareID
          );
        };

        if (getMoveFromSquare(square.id)) {
          console.log("Square already filled!");
          // console.log("Move: ", getMoveFromSquare(square.id));
          return;
        }

        const lastPlayer = App.state.movesHistory.at(-1);
        const currentPlayer = lastPlayer
          ? lastPlayer.playerID === "X"
            ? "O"
            : "X"
          : "X";
        console.log("Last Player: ", lastPlayer);
        console.log("Current Player: ", currentPlayer);

        const icon = document.createElement("i");
        if (currentPlayer === "X") {
          icon.classList.add("fa", "fa-times");
        } else {
          icon.classList.add("fa", "fa-circle-o");
        }
        square.appendChild(icon);
        // Save the move to the history
        App.state.movesHistory.push({
          squareID: square.id,
          playerID: currentPlayer,
        });

        // Get the game status
        const gameStatus = App.getGameStatus(App.state.movesHistory);
        if (gameStatus.status === "complete") {
          if (gameStatus.winner) {
            console.log(`Player ${gameStatus.winner} won!`);
          } else {
            console.log("It's a draw!");
          }
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
