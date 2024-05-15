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
  const store = new Store();

  view.bindGameResetEvent((event) => {
    console.log("Game Reset Event");
    console.log(event);
  });

  view.bindNewRoundEvent((event) => {
    console.log("New Round Event");
    console.log(event);
  });

  view.bindPlayerMoveEvent((event) => {
    // console.log("Player Move Event");

    view.setTurnIndicator(players[0]);
    view.handlePlayerMove(event.target, players[0]);
  });
  console.log(view);
}

window.addEventListener("load", init);
