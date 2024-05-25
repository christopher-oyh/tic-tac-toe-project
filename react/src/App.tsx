import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import { Game, GameState, Player } from "./types";
import classnames from "classnames";
import { stat } from "fs";

const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-times",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-circle-o",
    colorClass: "yellow",
  },
];

function derivedGame(state: GameState) {
  const currentPlayer = players[state.currentGameMoves.length % 2];

  const winningCombination = [
    // Horizontal
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // Vertical
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    // Diagonal
    [1, 5, 9],
    [3, 5, 7],
  ];

  let winner = null;
  for (const player of players) {
    //   console.log("Player: ", player);
    const selectedSquareIDs = state.currentGameMoves
      .filter((currentGameMoves) => currentGameMoves.player.id === player.id)
      .map((currentGameMoves) => currentGameMoves.squareID);

    // Check if the player has won
    for (const pattern of winningCombination) {
      // console.log("Pattern: ", pattern);
      if (pattern.every((squareID) => selectedSquareIDs.includes(squareID))) {
        winner = player;
        //   console.log("Winner: ", winner);
        break;
      }
    }
  }

  return {
    currentPlayer,
    currentGameMoves: state.currentGameMoves,
    status: {
      isComplete: winner != null || state.currentGameMoves.length === 9,
      winner,
    },
  };
}
function derivedStats(state: GameState) {
  return {
    playerWithStats: players.map((player) => {
      const wins = state.history.currentRoundGames.filter(
        (game) => game.status.winner?.id == player.id
      ).length;

      return {
        ...player,
        wins,
      };
    }),
    ties: state.history.currentRoundGames.filter(
      (game) => game.status.winner === null
    ).length,
  };
}

export default function App() {
  const [state, setState] = useState<GameState>({
    currentGameMoves: [], // squareID, player
    history: {
      currentRoundGames: [],
      allGames: [],
    },
  });

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
        <div className="grid" data-id="grid">
          {/* <!-- Turn indicator --> */}
          <div className="turn" data-id="turn">
            <i className="fa fa-times turquoise"></i>
            <p className="turquoise">Player 1's turn</p>
          </div>

          <Menu onAction={(action) => resetGame(action === "reset-game")} />

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
            <span data-id="p1-wins">{stats.playerWithStats[0].wins} Wins</span>
          </div>
          <div id="ties-box" className="score shadow">
            <p>Draw</p>
            <span data-id="ties">{stats.ties}</span>
          </div>
          <div id="player2-box" className="score shadow">
            <p>Player 2</p>
            <span data-id="p2-wins">{stats.playerWithStats[1].wins} Wins</span>
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
