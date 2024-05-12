class View {
  // Class properties
  $ = {};
  constructor() {
    this.$.menu = document.querySelector("[data-id='menu']");
    this.$.menuItems = document.querySelector(".items");
    this.$.resetBtn = document.querySelector("[data-id='reset-btn']");
    this.$.newRoundBtn = document.querySelector("[data-id='new-round-btn']");
    this.$.undoBtn = document.querySelector("[data-id='undo-btn']");
    this.$.redoBtn = document.querySelector("[data-id='redo-btn']");
    this.$.squares = document.querySelectorAll("[data-id='squares']");

    this.$.modal = document.querySelector("[data-id='modal']");
    this.$.modalText = document.querySelector("[data-id='modal-text']");
    this.$.modalBtn = document.querySelector("[data-id='modal-btn']");
    this.$.turn = document.querySelector("[data-id='turn']");
  }
}
