import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Modal from "./components/Modal";

export default function App() {
  const showModal = false;

  return (
    <>
      <main>
        <div className="grid" data-id="grid">
          {/* <!-- Turn indicator --> */}
          <div className="turn" data-id="turn">
            <i className="fa fa-times turquoise"></i>
            <p className="turquoise">Player 1's turn</p>
          </div>

          <Menu onAction={(action) => console.log(action)} />

          {/* <!-- Game board --> */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareID) => (
            <div key={squareID} className="squares shadow">
              <i className="fa fa-times turquoise"></i>
            </div>
          ))}

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
      {showModal && <Modal message="Player 1 Wins" />}

      <script src="dist/app.js" type="module"></script>
      {/* <!-- <script src="js/index.js" type="module"></script> --> */}
      {/* <!-- <script src="js/view.js"></script> --> */}
    </>
  );
}
