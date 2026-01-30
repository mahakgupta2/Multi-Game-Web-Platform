import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SnakeGame = () => {
  const GRID_SIZE = 16;
  const [snake, setSnake] = useState([[8, 8], [8, 9], [8, 10]]);
  const [food, setFood] = useState([4, 4]);
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [status, setStatus] = useState('START'); // START, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  // Keyboard Support
  useEffect(() => {
    const handleKey = (e) => {
      if (status !== 'PLAYING') return;
      const key = e.key.toLowerCase();
      if ((key === 'arrowup' || key === 'w') && direction.y === 0) setDirection({ x: 0, y: -1 });
      if ((key === 'arrowdown' || key === 's') && direction.y === 0) setDirection({ x: 0, y: 1 });
      if ((key === 'arrowleft' || key === 'a') && direction.x === 0) setDirection({ x: -1, y: 0 });
      if ((key === 'arrowright' || key === 'd') && direction.x === 0) setDirection({ x: 1, y: 0 });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction, status]);

  // Movement Logic
  useEffect(() => {
    if (status !== 'PLAYING') return;
    const moveInterval = setInterval(() => {
      setSnake((prev) => {
        const head = [prev[0][0] + direction.x, prev[0][1] + direction.y];
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE || 
            prev.some(s => s[0] === head[0] && s[1] === head[1])) {
          setStatus('GAMEOVER');
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head[0] === food[0] && head[1] === food[1]) {
          setScore(s => s + 1);
          setFood([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 140);
    return () => clearInterval(moveInterval);
  }, [snake, direction, status, food]);

  const startGame = () => {
    setSnake([[8, 8], [8, 9], [8, 10]]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setStatus('PLAYING');
  };

  return (
    <div className="relative h-screen w-full bg-black flex justify-center items-start p-2 select-none">
      
      {/* Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 z-50 bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 text-white font-bold"
      >
        Dashboard
      </button>

      {/* Game Card */}
      <div className="relative w-full max-w-[480px] h-full flex flex-col shadow-2xl rounded-3xl overflow-hidden border border-white/10">
        
        {/* Floating Score */}
        <div className="absolute top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="bg-blue-600/20 backdrop-blur-md border border-blue-500/30 px-3 py-0.5 rounded-full">
            <span className="text-blue-400 font-black text-[10px] tracking-widest uppercase mr-2">Score</span>
            <span className="text-white font-black text-sm">{score}</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 relative m-2 rounded-[2rem] overflow-hidden bg-black/20">
          {/* Grid */}
          <div className="absolute inset-0 grid opacity-5" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
              <div key={i} className="border-[0.2px] border-blue-400" />
            ))}
          </div>

          {/* Snake & Food */}
          <div className="absolute inset-0">
            {snake.map((segment, i) => (
              <div key={i} className="absolute rounded-sm"
                style={{
                  width: `${100/GRID_SIZE}%`, height: `${100/GRID_SIZE}%`,
                  left: `${segment[0] * (100/GRID_SIZE)}%`, top: `${segment[1] * (100/GRID_SIZE)}%`,
                  backgroundColor: i === 0 ? '#3b82f6' : '#1d4ed8',
                  boxShadow: i === 0 ? '0 0 10px #3b82f6' : 'none',
                  zIndex: i === 0 ? 10 : 5
                }}
              />
            ))}
            <div className="absolute bg-rose-500 rounded-full shadow-[0_0_12px_#f43f5e]"
              style={{
                width: `${100/GRID_SIZE}%`, height: `${100/GRID_SIZE}%`,
                left: `${food[0] * (100/GRID_SIZE)}%`, top: `${food[1] * (100/GRID_SIZE)}%`
              }}
            />
          </div>

          {/* Start/GameOver Overlay */}
          {status !== 'PLAYING' && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#050810]/90 backdrop-blur-sm p-4 text-center">
              <button 
                onClick={startGame}
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 mb-4"
              >
                <span className="text-white text-2xl ml-1">▶</span>
              </button>
              <h2 className="text-sm font-black text-white tracking-[0.3em] uppercase">
                {status === 'START' ? 'Snake.io' : 'Game Over'}
              </h2>
              {status === 'GAMEOVER' && <p className="text-blue-400 text-[10px] mt-1 font-bold">POINTS: {score}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pb-3 text-center">
          <p className="text-[8px] font-bold text-white/10 uppercase tracking-[0.4em]">Retro Console v2</p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
