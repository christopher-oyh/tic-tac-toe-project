var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _View_instances, _View_updateScoreBoard, _View_openModal, _View_closeAll, _View_clearBoard, _View_initializeBoard, _View_closeModal, _View_closeMenu, _View_toggleMenu, _View_setTurnIndicator, _View_handlePlayerMove, _View_qsCheck, _View_qsAllCheck, _View_delegate;
class View {
    constructor() {
        _View_instances.add(this);
        // Class properties
        this.$ = {}; // Using typescript generics
        this.$$ = {};
        this.$.menu = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='menu']");
        this.$.menuBtn = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='menu-btn']");
        this.$.menuItems = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='menu-items']");
        this.$.resetBtn = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='reset-btn']");
        this.$.resetScoresBtn = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='reset-scores-btn']");
        // this.$.undoBtn = this.#qsCheck("[data-id='undo-btn']");
        // this.$.redoBtn = this.#qsCheck("[data-id='redo-btn']");
        this.$.grid = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='grid']");
        this.$$.squares = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAllCheck).call(this, "[data-id='squares']");
        this.$.modal = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='modal']");
        this.$.modalText = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='modal-text']");
        this.$.modalBtn = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='modal-btn']");
        this.$.turn = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='turn']");
        this.$.p1Wins = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='p1-wins']");
        this.$.ties = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='ties']");
        this.$.p2Wins = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "[data-id='p2-wins']");
        // UI Only event listeners
        this.$.menuBtn.addEventListener("click", (e) => {
            __classPrivateFieldGet(this, _View_instances, "m", _View_toggleMenu).call(this);
        });
    }
    // Showcasing possible way to get typescript to recognize the properties
    render(game, stats) {
        const { playerWithStats, ties } = stats;
        const { currentGameMoves, currentPlayer, status: { isComplete, winner }, } = game;
        __classPrivateFieldGet(this, _View_instances, "m", _View_closeAll).call(this);
        __classPrivateFieldGet(this, _View_instances, "m", _View_clearBoard).call(this);
        __classPrivateFieldGet(this, _View_instances, "m", _View_updateScoreBoard).call(this, playerWithStats[0].wins, ties, playerWithStats[1].wins);
        __classPrivateFieldGet(this, _View_instances, "m", _View_initializeBoard).call(this, currentGameMoves);
        if (isComplete) {
            __classPrivateFieldGet(this, _View_instances, "m", _View_openModal).call(this, winner ? `${winner.name} won!` : "It's a draw!");
        }
        __classPrivateFieldGet(this, _View_instances, "m", _View_setTurnIndicator).call(this, currentPlayer);
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
        __classPrivateFieldGet(this, _View_instances, "m", _View_delegate).call(this, this.$.grid, "[data-id='squares']", "click", handler);
        // this.$$.squares.forEach((square) => {
        //   // Pass the square element to the handler instead of the event
        //   square.addEventListener("click", () => handler(square));
        // });
    }
}
_View_instances = new WeakSet(), _View_updateScoreBoard = function _View_updateScoreBoard(p1Wins, ties, p2Wins) {
    this.$.p1Wins.textContent = `${p1Wins} Wins`;
    this.$.ties.textContent = `${ties}`;
    this.$.p2Wins.textContent = `${p2Wins} Wins`;
}, _View_openModal = function _View_openModal(message) {
    this.$.modalText.textContent = message;
    this.$.modal.classList.remove("hidden");
}, _View_closeAll = function _View_closeAll() {
    __classPrivateFieldGet(this, _View_instances, "m", _View_closeModal).call(this);
    __classPrivateFieldGet(this, _View_instances, "m", _View_closeMenu).call(this);
}, _View_clearBoard = function _View_clearBoard() {
    this.$$.squares.forEach((sq) => {
        sq.innerHTML = "";
    });
}, _View_initializeBoard = function _View_initializeBoard(moves) {
    // console.log("Moves: ", moves);
    this.$$.squares.forEach((square) => {
        const existingMove = moves.find((move) => move.squareID === +square.id);
        if (existingMove) {
            __classPrivateFieldGet(this, _View_instances, "m", _View_handlePlayerMove).call(this, square, existingMove.player);
        }
    });
}, _View_closeModal = function _View_closeModal() {
    this.$.modal.classList.add("hidden");
}, _View_closeMenu = function _View_closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");
    // const icon = this.$.menuBtn.querySelector("i");
    const icon = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "i", this.$.menuBtn); // type narrowing
    icon.classList.remove("fa-caret-up");
    icon.classList.add("fa-caret-down");
}, _View_toggleMenu = function _View_toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");
    // const icon = this.$.menuBtn.querySelector("i");
    const icon = __classPrivateFieldGet(this, _View_instances, "m", _View_qsCheck).call(this, "i", this.$.menuBtn); // type narrowing
    icon.classList.toggle("fa-caret-down");
    icon.classList.toggle("fa-caret-up");
}, _View_setTurnIndicator = function _View_setTurnIndicator(player) {
    // Player could be 1 or 2
    const icon = document.createElement("i");
    const label = document.createElement("p");
    icon.classList.add("fa", player.iconClass, player.colorClass);
    label.classList.add(player.colorClass);
    label.innerText = `${player.name}'s Turn`;
    this.$.turn.replaceChildren(icon, label);
}, _View_handlePlayerMove = function _View_handlePlayerMove(squareElement, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa", player.iconClass, player.colorClass);
    squareElement.replaceChildren(icon);
}, _View_qsCheck = function _View_qsCheck(selector, parent) {
    const ele = parent
        ? parent.querySelector(selector)
        : document.querySelector(selector);
    if (!ele) {
        throw new Error(`Element with selector ${selector} not found`);
    }
    return ele;
}, _View_qsAllCheck = function _View_qsAllCheck(selector) {
    const eleList = document.querySelectorAll(selector);
    if (!eleList.length) {
        throw new Error(`Element with selector ${selector} not found`);
    }
    return eleList;
}, _View_delegate = function _View_delegate(el, selector, eventKey, handler) {
    el.addEventListener(eventKey, (event) => {
        if (!(event.target instanceof Element)) {
            throw new Error("Event Target not found");
        }
        if (event.target.matches(selector)) {
            handler(event.target);
        }
    });
};
export default View;
