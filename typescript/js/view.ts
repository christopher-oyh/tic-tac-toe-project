import Store, { DerivedStats, DerivedGame } from "./store";
import { Game, GameStatus, GameMove, Player } from "./types";

export default class View {
  // Class properties
  $: Record<string, Element> = {}; // Using typescript generics
  $$: Record<string, NodeListOf<Element>> = {};

  constructor() {
    this.$.menu = this.#qsCheck("[data-id='menu']");
    this.$.menuBtn = this.#qsCheck("[data-id='menu-btn']");
    this.$.menuItems = this.#qsCheck("[data-id='menu-items']");
    this.$.resetBtn = this.#qsCheck("[data-id='reset-btn']");
    this.$.resetScoresBtn = this.#qsCheck("[data-id='reset-scores-btn']");
    // this.$.undoBtn = this.#qsCheck("[data-id='undo-btn']");
    // this.$.redoBtn = this.#qsCheck("[data-id='redo-btn']");

    this.$.grid = this.#qsCheck("[data-id='grid']");
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

  // Showcasing possible way to get typescript to recognize the properties
  render(game: DerivedGame, stats: DerivedStats) {
    const { playerWithStats, ties } = stats;
    const {
      currentGameMoves,
      currentPlayer,
      status: { isComplete, winner },
    } = game;

    this.#closeAll();
    this.#clearBoard();
    this.#updateScoreBoard(
      playerWithStats[0].wins,
      ties,
      playerWithStats[1].wins
    );
    this.#initializeBoard(currentGameMoves);

    if (isComplete) {
      this.#openModal(winner ? `${winner.name} won!` : "It's a draw!");
    }

    this.#setTurnIndicator(currentPlayer);
  }

  /**
   *  Register all the event listeners
   */
  bindGameResetEvent(handler: EventListener) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindScoresResetEvent(handler: EventListener) {
    this.$.resetScoresBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler: (el: Element) => void) {
    this.#delegate(this.$.grid, "[data-id='squares']", "click", handler);
    // this.$$.squares.forEach((square) => {
    //   // Pass the square element to the handler instead of the event
    //   square.addEventListener("click", () => handler(square));
    // });
  }

  /**
   *  DOM Helper Methods
   */
  #updateScoreBoard(p1Wins: number, ties: number, p2Wins: number) {
    this.$.p1Wins.textContent = `${p1Wins} Wins`;
    this.$.ties.textContent = `${ties}`;
    this.$.p2Wins.textContent = `${p2Wins} Wins`;
  }

  #openModal(message: string) {
    this.$.modalText.textContent = message;
    this.$.modal.classList.remove("hidden");
  }

  #closeAll() {
    this.#closeModal();
    this.#closeMenu();
  }

  #clearBoard() {
    this.$$.squares.forEach((sq) => {
      sq.innerHTML = "";
    });
  }

  #initializeBoard(moves: GameMove[]) {
    // console.log("Moves: ", moves);
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareID === +square.id);
      if (existingMove) {
        this.#handlePlayerMove(square, existingMove.player);
      }
    });
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    // const icon = this.$.menuBtn.querySelector("i");
    const icon = this.#qsCheck("i", this.$.menuBtn); // type narrowing

    icon.classList.remove("fa-caret-up");
    icon.classList.add("fa-caret-down");
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    // const icon = this.$.menuBtn.querySelector("i");
    const icon = this.#qsCheck("i", this.$.menuBtn); // type narrowing

    icon.classList.toggle("fa-caret-down");
    icon.classList.toggle("fa-caret-up");
  }

  #setTurnIndicator(player: Player) {
    // Player could be 1 or 2
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa", player.iconClass, player.colorClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}'s Turn`;
    this.$.turn.replaceChildren(icon, label);
  }

  #handlePlayerMove(squareElement: Element, player: Player) {
    const icon = document.createElement("i");
    icon.classList.add("fa", player.iconClass, player.colorClass);
    squareElement.replaceChildren(icon);
  }

  #qsCheck(selector: string, parent?: Element) {
    const ele = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);
    if (!ele) {
      throw new Error(`Element with selector ${selector} not found`);
    }
    return ele;
  }

  #qsAllCheck(selector: string) {
    const eleList = document.querySelectorAll(selector);
    if (!eleList.length) {
      throw new Error(`Element with selector ${selector} not found`);
    }
    return eleList;
  }

  /**
   * Rather than registering event listeners on every child element in our Tic Tac Toe grid, we can
   * listen to the grid container and derive which square was clicked using the matches() function.
   *
   * @param {*} el the "container" element you want to listen for events on
   * @param {*} selector the "child" elements within the "container" you want to handle events for
   * @param {*} eventKey the event type you are listening for (e.g. "click" event)
   * @param {*} handler the callback function that is executed when the specified event is triggered on the specified children
   */
  #delegate(
    el: Element,
    selector: string,
    eventKey: string,
    handler: (el: Element) => void
  ) {
    el.addEventListener(eventKey, (event) => {
      if (!(event.target instanceof Element)) {
        throw new Error("Event Target not found");
      }

      if (event.target.matches(selector)) {
        handler(event.target);
      }
    });
  }
}
