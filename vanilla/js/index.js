console.log("Hello from vanilla/js/index.js!");

const App = {
  // Properties of Namespace
  // All of the selectors are stored here
  $: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector(".items"),
  },
  // es6 init function
  init() {
    App.$.menu.addEventListener("click", (event) => {
      // console.log(event.target);
      App.$.menuItems.classList.toggle("hidden");
    });
  },
};

window.addEventListener("load", App.init);
