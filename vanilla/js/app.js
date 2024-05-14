import View from "./view.js";

function init() {
  const view = new View();
  view.bindGameResetEvent((event) => {
    console.log("Game Reset Event");
    console.log(event);
  });
  view.bindNewRoundEvent((event) => {
    console.log("New Round Event");
    console.log(event);
  });
  view.bindPlayerMoveEvent((event) => {
    console.log("Player Move Event");
    console.log(event);
  });
  console.log(view);
}

window.addEventListener("load", init);
