import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TicTacToe = ({ goToDashboard }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState('PLAYING'); // PLAYING, DRAW, WIN
  const [score, setScore] = useState({ player: 0, cpu: 0 });

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (squares) => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'DRAW';
  };

  const handleClick = (i) => {
    if (board[i] || status !== 'PLAYING' || !isXNext) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  // CPU Move
  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      handleEndGame(winner);
      return;
    }

    if (!isXNext && status === 'PLAYING') {
      const timer = setTimeout(() => {
        const emptyIndices = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[randomIndex] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext]);

  const handleEndGame = (winner) => {
    if (winner === 'X') {
      setScore(s => ({ ...s, player: s.player + 1 }));
      setStatus('WIN_X');
    } else if (winner === 'O') {
      setScore(s => ({ ...s, cpu: s.cpu + 1 }));
      setStatus('WIN_O');
    } else if (winner === 'DRAW') {
      setStatus('DRAW');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus('PLAYING');
  };
  const navigate=useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0b0f1a] p-4 font-sans select-none">

      {/* Top Dashboard Button */}
      <div className="w-full flex justify-start mb-4">
        <button 
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 z-50 bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 text-white font-bold"
      >
        Dashboard
      </button>
      </div>

      {/* Scoreboard */}
      <div className="w-full max-w-md flex justify-between px-5 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl mb-4">
        <div className="text-center">
          <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">You (X)</p>
          <p className="text-2xl font-black">{score.player}</p>
        </div>
        <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black border border-white/10 italic self-center">BATTLE</div>
        <div className="text-center">
          <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">CPU (O)</p>
          <p className="text-2xl font-black">{score.cpu}</p>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center relative">
        <div className="grid grid-cols-3 gap-2 w-full aspect-square">
          {board.map((val, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`h-full aspect-square rounded-2xl flex items-center justify-center text-3xl font-black transition-all border border-white/10
                ${!val ? 'bg-white/5 hover:bg-blue-600/20 active:scale-90' : 'bg-slate-800'}
                ${val === 'X' ? 'text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.5)]'}
              `}
            >
              {val}
            </button>
          ))}
        </div>

        {/* Turn Indicator */}
        <p className="mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          {status === 'PLAYING' ? (isXNext ? "Your Turn" : "CPU Thinking...") : "Round Over"}
        </p>

        {/* Result Overlay */}
        {status !== 'PLAYING' && (
          <div className="absolute inset-0 z-20 bg-[#0b0f1a]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <h2 className={`text-4xl font-black mb-2 italic tracking-tighter 
              ${status === 'WIN_X' ? 'text-blue-500' : status === 'WIN_O' ? 'text-rose-500' : 'text-slate-400'}`}>
              {status === 'WIN_X' ? 'VICTORY!' : status === 'WIN_O' ? 'DEFEATED' : 'TIE GAME'}
            </h2>
            <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-8">
              {status === 'WIN_X' ? 'Humanity wins again' : status === 'WIN_O' ? 'Machines are taking over' : 'It\'s a draw!'}
            </p>
            <button 
              onClick={resetGame}
              className="w-full py-3 bg-blue-600 text-white font-black rounded-xl text-[11px] tracking-widest uppercase hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-95 mb-2"
            >
              Next Round
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="w-full max-w-md mt-4 text-center">
        <button 
          onClick={() => { setScore({ player: 0, cpu: 0 }); resetGame(); }}
          className="text-[10px] font-bold text-slate-400 hover:text-rose-400 uppercase tracking-tighter"
        >
          Reset Tournament
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
