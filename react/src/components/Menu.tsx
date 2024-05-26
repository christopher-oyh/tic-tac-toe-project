import { useState } from "react";
import classnames from "classnames";
import "./Menu.css";

type Props = {
  onAction(action: "reset-game" | "reset-scores"): void;
  //   onResetGame(): void;
  //   onResetScores(): void;
};

export default function Menu({ onAction }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    //   {/* <!-- Dropdown menu --> */}
    <div className="menu" data-id="menu">
      <button className="menu-btn" onClick={() => setMenuOpen((prev) => !prev)}>
        Actions
        <i
          className={classnames(
            "fa",
            menuOpen ? "fa-chevron-up" : "fa-chevron-down"
          )}
        ></i>
        {/* {menuOpen ? (
          <i className="fa fa-chevron-up"></i>
        ) : (
          <i className="fa fa-chevron-down"></i>
        )} */}
      </button>
      {menuOpen && (
        <div className="items border ">
          <button onClick={() => onAction("reset-game")}>Reset Game</button>
          <button onClick={() => onAction("reset-scores")}>Reset Scores</button>
        </div>
      )}
    </div>
  );
}
