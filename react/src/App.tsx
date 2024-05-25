import "./App.css";
import Footer from "./components/Footer";

export default function App() {
  // return (
  //   <div>
  //     <p>Hello World from React App</p>
  //   </div>
  // );

  return (
    <>
      <main>
        <div className="grid" data-id="grid">
          {/* <!-- Turn indicator --> */}
          <div className="turn" data-id="turn">
            <i className="fa fa-times turquoise"></i>
            <p className="turquoise">Player 1's turn</p>
          </div>

          {/* <!-- Dropdown menu --> */}
          <div className="menu" data-id="menu">
            <button className="menu-btn" data-id="menu-btn">
              Actions
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </button>

            <div className="items border hidden" data-id="menu-items">
              <button className="items-btn" data-id="reset-btn">
                Reset Game
              </button>
              <button className="items-btn" data-id="reset-scores-btn">
                Reset Scores
              </button>
            </div>
          </div>

          {/* <!-- Game board --> */}
          <div id="1" data-id="squares" className="squares shadow"></div>
          <div id="2" data-id="squares" className="squares shadow"></div>
          <div id="3" data-id="squares" className="squares shadow"></div>
          <div id="4" data-id="squares" className="squares shadow"></div>
          <div id="5" data-id="squares" className="squares shadow"></div>
          <div id="6" data-id="squares" className="squares shadow"></div>
          <div id="7" data-id="squares" className="squares shadow"></div>
          <div id="8" data-id="squares" className="squares shadow"></div>
          <div id="9" data-id="squares" className="squares shadow"></div>

          {/* <!-- Score board --> */}
          <div id="player1-box" className="score shadow">
            <p>Player 1</p>
            <span data-id="p1-wins">0 Wins</span>
          </div>
          <div id="ties-box" className="score shadow">
            <p>Draw</p>
            <span data-id="ties">0 </span>
          </div>
          <div id="player2-box" className="score shadow">
            <p>Player 2</p>
            <span data-id="p2-wins">0 Wins</span>
          </div>
        </div>
      </main>

      <Footer />

      {/* <!-- Modal when game ends --> */}
      <div className="modal hidden" data-id="modal">
        <div className="modal-content" data-id="modal-contents">
          <h1>Game Over</h1>
          <p data-id="modal-text">Player 1 Wins</p>
          <button data-id="modal-btn">Play Again</button>
        </div>
      </div>
      <script src="dist/app.js" type="module"></script>
      {/* <!-- <script src="js/index.js" type="module"></script> --> */}
      {/* <!-- <script src="js/view.js"></script> --> */}
    </>
  );
}
