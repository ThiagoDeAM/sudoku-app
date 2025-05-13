import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sudoku from '../utils/sudoku';
import '../styles/SudokuBoard.css';

function SudokuBoard({ token }) {
  const [board, setBoard] = useState([]);
  const [initialSetup, setInitialSetup] = useState([]);
  const [sudoku, setSudoku] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedGame = localStorage.getItem('sudokuGame');
    if (savedGame) {
      const { savedBoard, savedInitialSetup, savedElapsedTime, savedIsPaused } = JSON.parse(savedGame);
      setBoard(savedBoard);
      setInitialSetup(savedInitialSetup);
      setElapsedTime(savedElapsedTime);
      setIsPaused(savedIsPaused);
      setSudoku(new Sudoku(9, 3));
      if (!savedIsPaused) {
        startTimer();
      }
    } else {
      startNewGame();
    }
    return () => {
      clearInterval(timerRef.current);
      pauseTimer();
    };
  }, []);

  useEffect(() => {
    const gameState = {
      savedBoard: board,
      savedInitialSetup: initialSetup,
      savedElapsedTime: elapsedTime,
      savedIsPaused: isPaused
    };
    localStorage.setItem('sudokuGame', JSON.stringify(gameState));
  }, [board, initialSetup, elapsedTime, isPaused]);

  const startNewGame = () => {
    clearInterval(timerRef.current);
    const newSudoku = new Sudoku(9, 3);
    newSudoku.fillValues();
    setBoard(newSudoku.mat.map(row => row.slice()));
    setInitialSetup(newSudoku.mat.map(row => row.map(cell => cell !== 0)));
    setSudoku(newSudoku);
    setElapsedTime(0);
    setIsPaused(false);
    startTimer();
    localStorage.removeItem('sudokuGame');
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
  };

  const handlePause = () => {
    setIsPaused(true);
    pauseTimer();
  };

  const handleContinue = () => {
    setIsPaused(false);
    startTimer();
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    if (isPaused) return;
    const num = parseInt(value) || 0;
    if (!initialSetup[rowIndex][colIndex] && (num === 0 || (sudoku && sudoku.checkIfSafe(rowIndex, colIndex, num)))) {
      setBoard(currentBoard => currentBoard.map((row, ri) =>
        row.map((cell, ci) => (ri === rowIndex && ci === colIndex ? num : cell))
      ));
    }
  };

  const handleSubmit = async () => {
    if (isPaused) return;
    const isComplete = board.every(row => row.every(cell => cell !== 0));
    if (isComplete) {
      pauseTimer();
      const completionTime = elapsedTime;
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${API_URL}/api/games/complete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ completionTime })
        });
        const data = await response.json();
        if (response.ok) {
          alert('Tabuleiro completo! Tempo de conclusão: ' + completionTime + ' segundos');
          localStorage.removeItem('sudokuGame');
          navigate('/user-games');
        } else {
          alert('Erro ao registrar tempo de conclusão: ' + data.message);
        }
      } catch (error) {
        alert('Erro ao registrar tempo de conclusão: ' + error.message);
      }
    } else {
      alert('Complete o tabuleiro antes de submeter.');
    }
  };

  const handleSuggestion = () => {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        if (board[rowIndex][colIndex] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (sudoku.checkIfSafe(rowIndex, colIndex, num)) {
              setBoard(currentBoard => {
                const newBoard = currentBoard.map((row, ri) =>
                  row.map((cell, ci) => (ri === rowIndex && ci === colIndex ? num : cell))
                );
                return newBoard;
              });
              return;
            }
          }
        }
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Sudoku</h1>
        <div className="board" style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 40px)', gap: '5px' }}>
          {board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                min="1"
                max="9"
                value={cell || ''}
                onChange={e => handleCellChange(rowIndex, colIndex, e.target.value)}
                className={`input ${initialSetup[rowIndex][colIndex] ? 'is-static' : ''}`}
                readOnly={initialSetup[rowIndex][colIndex]}
              />
            ))
          ))}
        </div>
        <div className="buttons mt-4">
          <button className="button is-primary" onClick={handleSubmit}>Submit</button>
          {!isPaused ? (
            <button className="button is-warning ml-2" onClick={handlePause}>Pause</button>
          ) : (
            <button className="button is-success ml-2" onClick={handleContinue}>Continue</button>
          )}
          <button className="button is-info ml-2" onClick={handleSuggestion} disabled={isPaused}>Suggestion</button>
          <button className="button is-danger ml-2" onClick={startNewGame}>New Game</button>
        </div>
        <div className="mt-4">Tempo: {elapsedTime} segundos</div>
      </div>
    </section>
  );
}

export default SudokuBoard;