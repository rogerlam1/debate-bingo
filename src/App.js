import React, { useState, useEffect } from 'react';
import './App.css';

const debateWords = [
  "Economy", "Healthcare", "Climate", "Jobs", "Taxes", "Immigration", "Education",
  "COVID-19", "China", "Russia", "NATO", "Trade", "Energy", "Infrastructure",
  "Social Security", "Medicare", "Supreme Court", "Gun Control", "Race Relations",
  "Fake News", "Corruption", "Wall Street", "Middle Class", "Minimum Wage",
  "Green New Deal", "Affordable Care Act", "Second Amendment", "Electoral College",
  "Socialism", "Capitalism", "Radical Left", "MAGA", "Antifa", "Black Lives Matter",
  "Law and Order", "Illegal Immigration", "Terrorism", "Veterans", "Foreign Policy",
  "Deficit", "National Debt", "Comrade", "Inflation", "Couch", "Unfair", "Electric Cars",
  "Boat", "Windmills", "Child Care", "Drill Baby Drill", "Tariffs", "Elon", "Nasty",
  "Weird", "Felon"
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
      <h1>Harris - Trump Debate Bingo</h1>
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