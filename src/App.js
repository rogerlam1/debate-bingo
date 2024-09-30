import React, { useState, useEffect } from 'react';
import './App.css';

const debateWords = [
  "Inflation", "Immigration", "Climate", "Bipartisanship", "Healthcare",
  "Jobs", "Education", "Taxes", "Infrastructure", "Security",
  "Justice", "Equality", "Freedom", "Leadership", "Unity",
  "Reform", "Innovation", "Growth", "Policy", "Democracy",
  "Values", "Coach", "Stolen Valor", "Mainstream Media", "Abortion Access",
  "Corporate Accountability", "Military Service", "Family Values", "Racism", "Project 2025"
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BingoCard = ({ word, isMarked, onClick }) => (
  <button 
    className={`bingo-card ${isMarked ? 'marked' : ''}`} 
    onClick={onClick}
    style={{
      transition: 'background-color 0.3s, color 0.3s',
    }}
  >
    {word}
  </button>
);

const BingoBoard = () => {
  const [board, setBoard] = useState([]);
  const [markedSquares, setMarkedSquares] = useState({});

  useEffect(() => {
    const shuffledWords = shuffleArray(debateWords);
    setBoard(shuffledWords.slice(0, 25));
  }, []);

  const handleSquareClick = (index) => {
    setMarkedSquares(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const checkBingo = () => {
    // Check rows and columns
    for (let i = 0; i < 5; i++) {
      if (
        (markedSquares[i*5] && markedSquares[i*5+1] && markedSquares[i*5+2] && markedSquares[i*5+3] && markedSquares[i*5+4]) ||
        (markedSquares[i] && markedSquares[i+5] && markedSquares[i+10] && markedSquares[i+15] && markedSquares[i+20])
      ) {
        return true;
      }
    }
    
    // Check diagonals
    if (
      (markedSquares[0] && markedSquares[6] && markedSquares[12] && markedSquares[18] && markedSquares[24]) ||
      (markedSquares[4] && markedSquares[8] && markedSquares[12] && markedSquares[16] && markedSquares[20])
    ) {
      return true;
    }
    
    return false;
  };

  return (
    <div className="bingo-container">
      <h1>Walz - Vance Debate Bingo</h1>
      <div className="bingo-board">
        {board.map((word, index) => (
          <BingoCard
            key={index}
            word={word}
            isMarked={markedSquares[index]}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>
      {checkBingo() && (
        <div className="bingo-win">BINGO!</div>
      )}
      <button 
        className="new-game-btn"
        onClick={() => {
          const shuffledWords = shuffleArray(debateWords);
          setBoard(shuffledWords.slice(0, 25));
          setMarkedSquares({});
        }}
      >
        New Game
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BingoBoard />
    </div>
  );
}

export default App;