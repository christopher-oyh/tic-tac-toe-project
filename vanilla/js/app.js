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

  view.bindPlayerMoveEvent((event) => {
    const clickedSquare = event.target;

    view.handlePlayerMove(clickedSquare, store.game.currentPlayer);
    store.playerMove(clickedSquare.id);
    // Update the turn indicator from the store since state has changed
    view.setTurnIndicator(store.game.currentPlayer);
  });
  console.log(view);
}

window.addEventListener("load", init);
