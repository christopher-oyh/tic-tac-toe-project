import "./Modal.css";

type Props = {
  message: string;
  onClick(): void;
};

export default function Modal({ message, onClick }: Props) {
  return (
    // {/* <!-- Modal when game e nds --> */}
    <div className="modal" data-id="modal">
      <div className="modal-content" data-id="modal-contents">
        <h1>Game Over</h1>
        <p>{message}</p>
        <button onClick={onClick}>Play Again</button>
      </div>
    </div>
  );
}
