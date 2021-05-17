import "./App.css";
import logo from "./logo.svg";
import { useState } from "react";

const listOfCards = [
  { id: "Red", key: 1 },
  { id: "Green", key: 2 },
  { id: "Orange", key: 3 },
  { id: "Blue", key: 4 },
  { id: "Red", key: 5 },
  { id: "Green", key: 6 },
  { id: "Orange", key: 7 },
  { id: "Blue", key: 8 }
];

function App() {
  const [turn, setTurn] = useState(true);
  const [cardsSelected, setCardsSelected] = useState([]);
  const [guessCards, setGuessCards] = useState([]);

  const onClickCard = item => {
    setCardsSelected([...cardsSelected, item]);
    setTimeout(() => {
      if (cardsSelected.length === 1) {
        setTurn(!turn);
        setCardsSelected([]);
        if (cardsSelected[0].id === item.id) {
          setGuessCards([...guessCards, item.id]);
        }
      }
    }, 1000);
  };

  const restartGame = () => {
    setTurn(true);
    setCardsSelected([]);
    setGuessCards([]);
  };

  const gameIsFinished = guessCards.length * 2 === listOfCards.length;

  return (
    <div>
      <p>Memory Game</p>
      <button>Arrancar de vuelta</button>
      <p>Turno del color {turn ? "Red" : "Azul"}</p>
      {gameIsFinished && <div onClick={restartGame}>TERMINO</div>}
      {listOfCards.map((item, idx) => {
        const alreadyGuess = guessCards.includes(item.id);
        const isBeingSelcted = cardsSelected.some(x => x.key === item.key);
        return (
          <button
            key={idx}
            onClick={() => onClickCard(item)}
            style={{ backgroundColor: "blue", margin: 5 }}
            disabled={alreadyGuess || isBeingSelcted}
          >
            {isBeingSelcted
              ? "LA ELIGIERON"
              : alreadyGuess
              ? "YA LA ADIVINARON"
              : "NADA"}
          </button>
        );
      })}
    </div>
  );
}

export default App;
