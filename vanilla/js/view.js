export default class View {
  // Class properties
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qsCheck("[data-id='menu']");
    this.$.menuBtn = this.#qsCheck("[data-id='menu-btn']");
    this.$.menuItems = this.#qsCheck("[data-id='menu-items']");
    this.$.resetBtn = this.#qsCheck("[data-id='reset-btn']");
    this.$.resetScoresBtn = this.#qsCheck("[data-id='reset-scores-btn']");
    this.$.undoBtn = this.#qsCheck("[data-id='undo-btn']");
    this.$.redoBtn = this.#qsCheck("[data-id='redo-btn']");

    this.$$.squares = this.#qsAllCheck("[data-id='squares']");

    this.$.modal = this.#qsCheck("[data-id='modal']");
    this.$.modalText = this.#qsCheck("[data-id='modal-text']");
    this.$.modalBtn = this.#qsCheck("[data-id='modal-btn']");
    this.$.turn = this.#qsCheck("[data-id='turn']");

    this.$.p1Wins = this.#qsCheck("[data-id='p1-wins']");
    this.$.ties = this.#qsCheck("[data-id='ties']");
    this.$.p2Wins = this.#qsCheck("[data-id='p2-wins']");

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
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindScoresResetEvent(handler) {
    this.$.resetScoresBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      // Pass the square element to the handler instead of the event
      square.addEventListener("click", () => handler(square));
    });
  }

  /**
   *  DOM Helper Methods
   */
  updateScoreBoard(p1Wins, ties, p2Wins) {
    this.$.p1Wins.innerText = `${p1Wins} Wins`;
    this.$.ties.innerText = `${ties}`;
    this.$.p2Wins.innerText = `${p2Wins} Wins`;
  }

  openModal(message) {
    this.$.modalText.innerText = message;
    this.$.modal.classList.remove("hidden");
  }

  closeAll() {
    this.#closeModal();
    this.#closeMenu();
  }

  clearBoard() {
    this.$$.squares.forEach((sq) => {
      sq.innerHTML = "";
    });
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.remove("fa-caret-up");
    icon.classList.add("fa-caret-down");
  }
  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("fa-caret-down");
    icon.classList.toggle("fa-caret-up");
  }

  setTurnIndicator(player) {
    // Player could be 1 or 2
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa", player.iconClass, player.colorClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}'s Turn`;
    this.$.turn.replaceChildren(icon, label);
  }

  handlePlayerMove(squareElement, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa", player.iconClass, player.colorClass);
    squareElement.replaceChildren(icon);
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
