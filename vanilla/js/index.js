console.log("Hello from vanilla/js/index.js!");
import View from "./view.js";

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

    modal: document.querySelector("[data-id='modal']"),
    modalText: document.querySelector("[data-id='modal-text']"),
    modalBtn: document.querySelector("[data-id='modal-btn']"),

    turn: document.querySelector("[data-id='turn']"),
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

  /**
   * Get the game status
   * @param {Array} moves
   * @returns {Object} gameStatus
   * @returns {String} gameStatus.status
   * @returns {String} gameStatus.winner
   * */
  getGameStatus(moves) {
    const xMoves = moves
      .filter((move) => move.playerID === "X")
      .map((move) => parseInt(move.squareID));
    const oMoves = moves
      .filter((move) => move.playerID === "O")
      .map((move) => parseInt(move.squareID));
    // console.log("X Moves: ", xMoves);
    // console.log("O Moves: ", oMoves);

    // Check if one of the players won using the winning combination from the config
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

    App.$.modalBtn.addEventListener("click", (event) => {
      App.state.movesHistory = [];
      App.$.squares.forEach((square) => {
        square.innerHTML = "";
      });
      App.$.modal.classList.add("hidden");
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        // console.log(`Square with id: ${event.target.id} clicked!`);
        // console.log(
        //   `Moves History: ${JSON.stringify(App.state.movesHistory, null, 2)}`
        // );

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

        const turnLabel = document.createElement("p");
        const turnIcon = document.createElement("i");
        const squareIcon = document.createElement("i");
        nextPlayer = currentPlayer === "X" ? "O" : "X";
        turnLabel.textContent = `Player ${currentPlayer}'s turn`;
        if (currentPlayer === "X") {
          turnIcon.classList.add("fa", "fa-times");
          squareIcon.classList.add("fa", "fa-circle-o");
          turnLabel.classList = "turquoise";
        } else {
          turnIcon.classList.add("fa", "fa-circle-o");
          squareIcon.classList.add("fa", "fa-times");
          turnLabel.classList = "yellow";
        }

        App.$.turn.replaceChildren(turnIcon, turnLabel);
        square.appendChild(squareIcon);

        // Save the move to the history
        App.state.movesHistory.push({
          squareID: square.id,
          playerID: currentPlayer,
        });

        // Get the game status
        const gameStatus = App.getGameStatus(App.state.movesHistory);
        if (gameStatus.status === "complete") {
          let text = "";
          // Check if the winner is X or O
          if (gameStatus.winner) {
            text = `Player ${gameStatus.winner} won!`;

            console.log(`Player ${gameStatus.winner} won!`);
          } else {
            text = "It's a draw!";
            console.log("It's a draw!");
          }
          // Show the modal
          App.$.modalText.textContent = text;
          App.$.modal.classList.remove("hidden");
        }
      });
    });
  },
};

// window.addEventListener("load", App.init);

function init() {
  const view = new View();
  console.log(view);
}

window.addEventListener("load", init);
