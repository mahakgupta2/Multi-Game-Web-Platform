import React, { useState, useEffect, useCallback } from 'react';

const CyberSplatt = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeNode, setActiveNode] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Initialize nodes (9 grid layout)
  const nodes = Array.from({ length: 9 }, (_, i) => i);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
  };

  const endGame = useCallback(() => {
    setGameActive(false);
    setActiveNode(null);
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  // Handle Timer
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [gameActive, timeLeft, endGame]);

  // Handle Node Jumping
  useEffect(() => {
    if (gameActive) {
      const jump = setInterval(() => {
        const randomNode = Math.floor(Math.random() * nodes.length);
        setActiveNode(randomNode);
      }, 800 - Math.min(score * 10, 400)); // Gets faster as you score!

      return () => clearInterval(jump);
    }
  }, [gameActive, score, nodes.length]);

  const handleSplat = (id) => {
    if (id === activeNode) {
      setScore(prev => prev + 1);
      setActiveNode(null); // Despawn immediately on hit
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2 tracking-widest">CYBER-SPLATT</h1>
        <p className="text-slate-400">Click the glowing nodes before they vanish!</p>
      </div>

      <div className="flex gap-8 mb-6 text-xl">
        <div className="bg-slate-800 p-3 rounded-lg border border-cyan-500/30">
          Score: <span className="text-cyan-400 font-mono">{score}</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-pink-500/30">
          Time: <span className="text-pink-500 font-mono">{timeLeft}s</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-yellow-500/30">
          Best: <span className="text-yellow-500 font-mono">{highScore}</span>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-4 bg-slate-800 p-6 rounded-xl shadow-2xl border-4 border-slate-700">
        {nodes.map((node) => (
          <button
            key={node}
            onClick={() => handleSplat(node)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-75 
              ${activeNode === node 
                ? 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] scale-105' 
                : 'bg-slate-700 hover:bg-slate-600'
              } border-4 border-slate-900 active:scale-90`}
          />
        ))}
      </div>

      {!gameActive && (
        <button
          onClick={startGame}
          className="mt-8 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-transform hover:scale-110 uppercase tracking-wider"
        >
          {timeLeft === 0 ? 'Play Again' : 'Start Mission'}
        </button>
      )}
    </div>
  );
};

export default CyberSplatt;