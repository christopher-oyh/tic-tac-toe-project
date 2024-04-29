console.log("Hello from vanilla/js/index.js!");

const App = {
  // Properties of Namespace
  // All of the selectors are stored here
  $: {
    menu: document.querySelector(".menu"),
    menuItems: document.querySelector(".items"),
  },
};

// const menu = document.querySelector(".menu");
// const menuItems = menu.querySelector(".items");

App.$.menu.addEventListener("click", (event) => {
  // console.log(event.target);
  App.$.menuItems.classList.toggle("hidden");
});
