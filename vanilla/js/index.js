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
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
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
        console.log(`Current Player: ${App.state.currentPlayer}`);

        if (square.hasChildNodes()) {
          console.log("This square is already filled!");
          return;
        }

        const currentPlayer = App.state.currentPlayer;
        const icon = document.createElement("i");
        if (currentPlayer === "X") {
          icon.classList.add("fa", "fa-times");
          App.state.currentPlayer = "O";
        } else {
          icon.classList.add("fa", "fa-circle-o");
          App.state.currentPlayer = "X";
        }
        square.appendChild(icon);
      });
    });
  },
};

window.addEventListener("load", App.init);
