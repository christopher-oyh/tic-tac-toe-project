import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import { Game, GameState, Player } from "./types";
import classnames from "classnames";
import { useLocalStorage } from "./components/useLocalStorage";
import { derivedGame, derivedStats } from "./utils";

export default function App() {
  const initialState: GameState = {
    currentGameMoves: [],
    history: {
      currentRoundGames: [],
      allGames: [],
    },
  };
  const [state, setState] = useLocalStorage("t3-storage-key", initialState);

  const game = derivedGame(state);
  const stats = derivedStats(state);

  // console.log(game);
  // console.log(stats);

  function handlePlayerMove(squareID: number, player: Player) {
    setState((prev) => {
      const stateClone = structuredClone(prev);
      stateClone.currentGameMoves.push({ squareID, player });
      return stateClone;
    });
  }

  function resetGame(resetScores: boolean) {
    // console.log("resetGame", resetScores);
    setState((prev) => {
      const stateClone = structuredClone(prev);

      const { status, currentGameMoves } = game;

      if (status.isComplete) {
        stateClone.history.currentRoundGames.push({
          currentGameMoves,
          status,
        });
      }
      stateClone.currentGameMoves = [];

      if (resetScores) {
        stateClone.history.allGames.push({
          currentGameMoves,
          status,
        });
        stateClone.history.currentRoundGames = [];
      }
      return stateClone;
    });
  }

  return (
    <>
      <main>
        <div className="grid">
          {/* <!-- Turn indicator --> */}
          <div className={classnames("turn", game.currentPlayer.colorClass)}>
            <i className={classnames("fa", game.currentPlayer.iconClass)}></i>
            <p>{game.currentPlayer.name}'s turn</p>
            {/* <i className="fa fa-times turquoise"></i>
            <p className="turquoise">Player 1's turn</p> */}
          </div>

          <Menu onAction={(action) => resetGame(action === "reset-scores")} />

          {/* <!-- Game board --> */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareID) => {
            const existingMove = game.currentGameMoves.find(
              (move) => move.squareID === squareID
            );

            return (
              <div
                key={squareID}
                className="squares shadow"
                onClick={() => {
                  if (existingMove) return;

                  handlePlayerMove(squareID, game.currentPlayer);
                }}
              >
                {existingMove && (
                  <i
                    className={classnames(
                      "fa",
                      existingMove.player.iconClass,
                      existingMove.player.colorClass
                    )}
                  ></i>
                )}
              </div>
            );
          })}

          {/* <!-- Score board --> */}
          <div id="player1-box" className="score shadow">
            <p>Player 1</p>
            <span>{stats.playerWithStats[0].wins} Wins</span>
          </div>
          <div id="ties-box" className="score shadow">
            <p>Draw</p>
            <span>{stats.ties}</span>
          </div>
          <div id="player2-box" className="score shadow">
            <p>Player 2</p>
            <span>{stats.playerWithStats[1].wins} Wins</span>
          </div>
        </div>
      </main>

      <Footer />
      {game.status.isComplete && (
        <Modal
          message={
            game.status.winner
              ? `${game.status.winner.name} won!`
              : "It's a Draw!"
          }
          onClick={() => resetGame(false)}
        />
      )}

      <script src="dist/app.js" type="module"></script>
      {/* <!-- <script src="js/index.js" type="module"></script> --> */}
      {/* <!-- <script src="js/view.js"></script> --> */}
    </>
  );
}
