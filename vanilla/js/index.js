console.log("Hello from vanilla/js/index.js!");

const menu = document.querySelector(".menu");
const menuItems = menu.querySelector(".items");

menu.addEventListener("click", (event) => {
  console.log(event.target);
  menuItems.classList.toggle("hidden");
});
