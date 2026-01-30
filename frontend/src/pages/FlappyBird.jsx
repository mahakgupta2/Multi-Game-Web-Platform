import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FlappyBird = () => {
  const BIRD_SIZE = 20;
  const GAME_WIDTH = 480; // Full width max
  const GAME_HEIGHT = 600; // Full height
  const GRAVITY = 2;
  const JUMP_STRENGTH = -18;
  const PIPE_WIDTH = 40;
  const PIPE_GAP = 150;

  const [birdPos, setBirdPos] = useState(300);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [status, setStatus] = useState('START'); // START, PLAYING, GAMEOVER
  const [pipes, setPipes] = useState([]);

  const navigate = useNavigate();

  // Game Loop
  useEffect(() => {
    let loop;
    if (status === 'PLAYING') {
      loop = setInterval(() => {
        setBirdPos((pos) => pos + GRAVITY);

        setPipes((prevPipes) => {
          const movedPipes = prevPipes.map(p => ({ ...p, x: p.x - 4 }));

          // Remove off-screen pipes
          if (movedPipes.length > 0 && movedPipes[0].x < -PIPE_WIDTH) {
            setScore(s => s + 1);
            movedPipes.shift();
          }

          // Add new pipe
          if (movedPipes.length === 0 || movedPipes[movedPipes.length - 1].x < GAME_WIDTH - 200) {
            movedPipes.push({
              x: GAME_WIDTH,
              topHeight: Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 100)) + 50
            });
          }

          return movedPipes;
        });
      }, 24);
    }
    return () => clearInterval(loop);
  }, [status]);

  // Collision Detection
  useEffect(() => {
    if (birdPos <= 0 || birdPos >= GAME_HEIGHT - BIRD_SIZE) handleGameOver();
    pipes.forEach(pipe => {
      const birdRight = 50 + BIRD_SIZE;
      const pipeRight = pipe.x + PIPE_WIDTH;
      if (birdRight > pipe.x && 50 < pipeRight) {
        if (birdPos < pipe.topHeight || birdPos + BIRD_SIZE > pipe.topHeight + PIPE_GAP) handleGameOver();
      }
    });
  }, [birdPos, pipes]);

  const jump = () => {
    if (status === 'START' || status === 'GAMEOVER') startGame();
    else if (status === 'PLAYING') setBirdPos(pos => pos + JUMP_STRENGTH);
  };

  const startGame = () => {
    setBirdPos(300);
    setPipes([]);
    setScore(0);
    setStatus('PLAYING');
  };

  const handleGameOver = () => {
    setStatus('GAMEOVER');
    if (score > highScore) setHighScore(score);
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-start bg-black select-none"
         onMouseDown={jump} onTouchStart={jump}>
      
      {/* Dashboard Button */}
      <button 
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 z-50 bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 text-white font-bold"
      >
        Dashboard
      </button>

      <div className="relative w-full max-w-[480px] h-full flex flex-col shadow-2xl rounded-3xl overflow-hidden border border-white/10">
        
        {/* Score Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-900 px-6 py-4 flex justify-between items-center text-white z-50">
          <div className="leading-tight">
            <p className="text-[10px] font-bold opacity-60 uppercase">Score</p>
            <p className="text-xl font-black">{score}</p>
          </div>
          <div className="text-right leading-tight">
            <p className="text-[10px] font-bold opacity-60 uppercase">Best</p>
            <p className="text-xl font-black text-blue-200">{highScore}</p>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 relative bg-black overflow-hidden">
          {/* Bird */}
          <div 
            className="absolute left-[50px] bg-blue-500 rounded-sm shadow-[0_0_15px_#3b82f6] transition-all duration-75"
            style={{ top: birdPos, width: BIRD_SIZE, height: BIRD_SIZE }}
          />

          {/* Pipes */}
          {pipes.map((pipe, i) => (
            <React.Fragment key={i}>
              <div className="absolute bg-indigo-900/40 border-b-4 border-blue-500/50"
                   style={{ left: pipe.x, top: 0, width: PIPE_WIDTH, height: pipe.topHeight }} />
              <div className="absolute bg-indigo-900/40 border-t-4 border-blue-500/50"
                   style={{ left: pipe.x, top: pipe.topHeight + PIPE_GAP, width: PIPE_WIDTH, height: GAME_HEIGHT }} />
            </React.Fragment>
          ))}

          {/* Overlays */}
          {status !== 'PLAYING' && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(37,99,235,0.4)] mb-6">
                <span className="text-white text-2xl">▲</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-widest uppercase italic">
                {status === 'START' ? 'NEON WINGS' : 'ENGINE FAILURE'}
              </h2>
              <p className="text-blue-400 text-[10px] font-bold mt-2 tracking-widest uppercase opacity-60">
                Click / Tap to Fly
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="py-4 bg-[#050810] text-center border-t border-white/5">
          <p className="text-[8px] font-black text-slate-700 tracking-[0.5em] uppercase">Arcade Protocol v.4</p>
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;
