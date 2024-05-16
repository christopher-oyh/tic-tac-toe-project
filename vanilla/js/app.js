import View from "./view.js";
import Store from "./store.js";

const players = [
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

function init() {
  const view = new View();
  const store = new Store(players);

  view.bindGameResetEvent((event) => {
    console.log("Game Reset Event");
    console.log(event);
  });

  view.bindNewRoundEvent((event) => {
    console.log("New Round Event");
    console.log(event);
  });

  view.bindPlayerMoveEvent((square) => {
    const clickedSquare = square;
    const existingMove = store.game.movesHistory.find(
      (move) => move.squareID === clickedSquare.id
    );
    if (existingMove) {
      console.log("Square already filled!");
      return;
    }

    // Place icon on the square
    view.handlePlayerMove(clickedSquare, store.game.currentPlayer);
    // Update the game state with the move
    store.playerMove(clickedSquare.id);
    // Check if the game is over
    if (store.game.status.isComplete) {
      view.openModal("Game Over!");
      return;
    }
    // Set the next player turn indicator from the store since state has changed
    view.setTurnIndicator(store.game.currentPlayer);
  });
  console.log(view);
}

window.addEventListener("load", init);
