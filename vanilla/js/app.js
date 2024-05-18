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
  const store = new Store("t3-storage-key", players);
  initView();
  window.addEventListener("storage", () => {
    console.log("State Changed from another window!");
    initView();
  });

  function initView() {
    view.closeAll();
    view.clearBoard();
    view.setTurnIndicator(store.game.currentPlayer);
    view.updateScoreBoard(
      store.stats.playerWithStats[0].wins,
      store.stats.ties,
      store.stats.playerWithStats[1].wins
    );
    console.log("Current Game Moves: ", store.game.currentGameMoves);
    view.initializeBoard(store.game.currentGameMoves);
  }

  view.bindGameResetEvent((event) => {
    store.resetGame();
    initView();
  });

  view.bindScoresResetEvent((event) => {
    store.resetScores();
    initView();
  });

  view.bindPlayerMoveEvent((square) => {
    const clickedSquare = square;
    const existingMove = store.game.currentGameMoves.find(
      (move) => move.squareID === +clickedSquare.id
    );
    // console.log("Clicked Square: ", clickedSquare);
    // console.log("Existing Move: ", existingMove);
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
      view.openModal(
        store.game.status.winner
          ? `${store.game.status.winner.name} won!`
          : "It's a draw!"
      );
      return;
    }

    // Set the next player turn indicator from the store since state has changed
    view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);
