import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RockPaperScissors = () => {
  const [view, setView] = useState('menu'); 
  const [userChoice, setUserChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, cpu: 0 });

  const navigate = useNavigate();

  const choices = [
    { id: 'rock', emoji: '✊', beats: 'scissors', color: 'bg-blue-500' },
    { id: 'paper', emoji: '✋', beats: 'rock', color: 'bg-indigo-500' },
    { id: 'scissors', emoji: '✌️', beats: 'paper', color: 'bg-sky-500' }
  ];

  const handlePlay = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setCpuChoice(randomChoice);

    if (choice.id === randomChoice.id) {
      setResult("DRAW");
    } else if (choice.beats === randomChoice.id) {
      setResult("WINNER!");
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult("LOST");
      setScore(prev => ({ ...prev, cpu: prev.cpu + 1 }));
    }
    setView('result');
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-start bg-black select-none p-2">
      
      {/* Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 z-50 bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 text-white font-bold"
      >
        Dashboard
      </button>

      {/* Game Card */}
      <div className="relative w-full max-w-[480px] h-full flex flex-col shadow-2xl rounded-3xl overflow-hidden border border-white/5">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-5 py-3 flex justify-between items-center text-white">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Player</span>
            <span className="text-lg font-black leading-none">{score.player}</span>
          </div>
          <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black border border-white/10 tracking-widest uppercase">SCORE</div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">CPU</span>
            <span className="text-lg font-black leading-none">{score.cpu}</span>
          </div>
        </div>

        {view === 'menu' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <h2 className="text-lg font-black text-white mb-6 tracking-widest">GAME ON!</h2>
            <div className="grid grid-cols-3 gap-4 w-full">
              {choices.map(item => (
                <button
                  key={item.id}
                  onClick={() => handlePlay(item)}
                  className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-95"
                >
                  <div className={`w-14 h-14 ${item.color} text-white rounded-xl flex items-center justify-center text-2xl shadow-inner`}>{item.emoji}</div>
                  <span className="text-[12px] font-black tracking-widest">{item.id.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-black">
            <div className={`text-4xl font-black mb-6 ${result === 'WINNER!' ? 'text-blue-400' : 'text-rose-500'}`}>{result}</div>
            <div className="flex items-center justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl ring-2 ring-blue-100 ring-offset-2">{userChoice?.emoji}</div>
                <p className="mt-2 text-[10px] text-blue-400 font-black uppercase tracking-widest">You</p>
              </div>
              <div className="text-white/20 font-black text-xl italic">VS</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl ring-2 ring-slate-100 ring-offset-2">{cpuChoice?.emoji}</div>
                <p className="mt-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">CPU</p>
              </div>
            </div>

            <button
              onClick={() => setView('menu')}
              className="w-full py-3 bg-blue-600 text-white font-black rounded-2xl text-[11px] tracking-widest hover:bg-blue-700 active:scale-95 shadow-lg mb-2"
            >
              Play Again
            </button>

            <button
              onClick={() => { setScore({ player: 0, cpu: 0 }); setView('menu'); }}
              className="w-full py-3 bg-gray-700 text-white font-black rounded-2xl text-[11px] tracking-widest hover:bg-gray-800 active:scale-95 shadow-lg"
            >
              Reset Session
            </button>
          </div>
        )}

        <div className="pb-4 text-center">
          <p className="text-[8px] font-bold text-slate-700 tracking-[0.4em] uppercase">Arcade Arena</p>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
