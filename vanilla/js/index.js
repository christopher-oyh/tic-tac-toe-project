console.log("Hello from vanilla/js/index.js!");

const App = {
  // Properties of Namespace
  // All of the selectors are stored here
  $: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector(".items"),
    resetBtn: document.querySelector("[data-id='reset-btn']"),
    newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
    squares: document.querySelectorAll("[data-id='squares']"),
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

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        console.log(`Square with id: ${event.target.id} clicked!`);
      });
    });
  },
};

window.addEventListener("load", App.init);
