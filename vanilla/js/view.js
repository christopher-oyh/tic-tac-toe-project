export default class View {
  // Class properties
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qsCheck("[data-id='menu']");
    this.$.menuBtn = this.#qsCheck("[data-id='menu-btn']");
    this.$.menuItems = this.#qsCheck("[data-id='menu-items']");
    this.$.resetBtn = this.#qsCheck("[data-id='reset-btn']");
    this.$.newRoundBtn = this.#qsCheck("[data-id='new-round-btn']");
    this.$.undoBtn = this.#qsCheck("[data-id='undo-btn']");
    this.$.redoBtn = this.#qsCheck("[data-id='redo-btn']");

    this.$$.squares = this.#qsAllCheck("[data-id='squares']");

    this.$.modal = this.#qsCheck("[data-id='modal']");
    this.$.modalText = this.#qsCheck("[data-id='modal-text']");
    this.$.modalBtn = this.#qsCheck("[data-id='modal-btn']");
    this.$.turn = this.#qsCheck("[data-id='turn']");

    // UI Only event listeners
    this.$.menuBtn.addEventListener("click", (e) => {
      this.#toggleMenu();
    });
  }

  /**
   *  Register all the event listeners
   */
  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", handler);
    });
  }

  /**
   *  DOM Helper Methods
   */
  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("fa-caret-down");
    icon.classList.toggle("fa-caret-up");
  }

  #qsCheck(selector, parent) {
    const ele = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);
    if (!ele) {
      throw new Error(`Element with selector ${selector} not found`);
    }
    return ele;
  }

  #qsAllCheck(selector) {
    const eleList = document.querySelectorAll(selector);
    if (!eleList.length) {
      throw new Error(`Element with selector ${selector} not found`);
    }
    return eleList;
  }
}
