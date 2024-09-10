import React, { useState, useEffect } from 'react';
import './App.css';

const debateWords = [
  "Economy", "Healthcare", "Climate", "Jobs", "Taxes", "Immigration", "Education",
  "COVID-19", "China", "Russia", "NATO", "Trade", "Energy", "Infrastructure",
  "Social Security", "Medicare", "Supreme Court", "Gun Control", "Race Relations",
  "Fake News", "Corruption", "Illegals", "Border", "Wall Street", "Middle Class", "Minimum Wage",
  "Green New Deal", "Affordable Care Act", "Second Amendment", "Electoral College",
  "Socialism", "Capitalism", "Radical Left", "MAGA", "Antifa", "Black Lives Matter",
  "Law and Order", "Illegal Immigration", "Terrorism", "Veterans", "Foreign Policy",
  "Deficit", "National Debt", "Tariffs", "Paris Agreement", "Iran Deal", "North Korea",
  "Space Force", "Opioid Crisis", "Cyber Security", "Big Tech"
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
  <div 
    className={`bingo-card ${isMarked ? 'marked' : ''}`} 
    onClick={onClick}
  >
    {word}
  </div>
);

const BingoBoard = () => {
  const [board, setBoard] = useState([]);
  const [markedSquares, setMarkedSquares] = useState({});

  useEffect(() => {
    const shuffledWords = shuffleArray(debateWords);
    setBoard(shuffledWords.slice(0, 49));
  }, []);

  const handleSquareClick = (index) => {
    setMarkedSquares(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const checkBingo = () => {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 7; i++) {
      if (
        (markedSquares[i*7] && markedSquares[i*7+1] && markedSquares[i*7+2] && markedSquares[i*7+3] && markedSquares[i*7+4] && markedSquares[i*7+5] && markedSquares[i*7+6]) ||
        (markedSquares[i] && markedSquares[i+7] && markedSquares[i+14] && markedSquares[i+21] && markedSquares[i+28] && markedSquares[i+35] && markedSquares[i+42])
      ) {
        return true;
      }
    }
    if (
      (markedSquares[0] && markedSquares[8] && markedSquares[16] && markedSquares[24] && markedSquares[32] && markedSquares[40] && markedSquares[48]) ||
      (markedSquares[6] && markedSquares[12] && markedSquares[18] && markedSquares[24] && markedSquares[30] && markedSquares[36] && markedSquares[42])
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="bingo-container">
      <h1>Trump-Biden Debate Bingo</h1>
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
          setBoard(shuffledWords.slice(0, 49));
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