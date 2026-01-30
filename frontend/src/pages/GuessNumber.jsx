import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NumberMatch = () => {
  const [cpuNumber, setCpuNumber] = useState(null);
  const [userNumber, setUserNumber] = useState(null);
  const [status, setStatus] = useState('START'); // START, RESULT
  const [result, setResult] = useState(''); // WIN, LOSE
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  const handleSelect = (num) => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    setCpuNumber(randomNum);
    setUserNumber(num);

    if (num === randomNum) {
      setResult('WIN');
      setScore(s => s + 50);
    } else {
      setResult('LOSE');
    }
    setStatus('RESULT');
  };

  const reset = () => {
    setStatus('START');
    setCpuNumber(null);
    setUserNumber(null);
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
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-4 flex justify-between items-center text-white">
          <div className="leading-tight">
            <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">Score</p>
            <p className="text-xl font-black">{score}</p>
          </div>
          <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black border border-white/10 tracking-widest uppercase">
            Luck
          </div>
        </div>

        {/* Game Area */}
        {status === 'START' ? (
          <div className="flex-1 flex flex-col items-center justify-around p-6">
            <div className="text-center">
              <h2 className="text-lg font-black text-white tracking-widest">PICK A NUMBER</h2>
              <div className="w-10 h-1 bg-blue-500 mx-auto mt-2 rounded-full opacity-50"></div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => handleSelect(num)}
                  className="h-16 bg-slate-900/50 border border-white/5 rounded-2xl text-2xl font-black text-white hover:bg-blue-600 hover:border-blue-400 transition-all active:scale-90 shadow-inner"
                >
                  {num}
                </button>
              ))}
            </div>

            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">Match CPU to win</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
            <h1 className={`text-4xl font-black mb-8 italic tracking-tighter ${result === 'WIN' ? 'text-blue-400' : 'text-rose-500'}`}>
              {result === 'WIN' ? 'MATCHED!' : 'MISSED'}
            </h1>

            <div className="flex items-center gap-4 mb-10">
              <div className="text-center">
                <div className={`w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl font-black border transition-colors ${result === 'WIN' ? 'text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'text-slate-500 border-white/5'}`}>
                  {userNumber}
                </div>
                <p className="mt-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Yours</p>
              </div>

              <div className="text-white/10 font-black text-xl italic">VS</div>

              <div className="text-center">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl font-black text-white border border-white/10">
                  {cpuNumber}
                </div>
                <p className="mt-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">CPU's</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full py-4 bg-white text-black font-black rounded-2xl text-[11px] tracking-widest uppercase hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="pb-4 text-center">
          <p className="text-[8px] font-bold text-slate-800 tracking-[0.4em] uppercase">Quantum Match Engine</p>
        </div>
      </div>
    </div>
  );
};

export default NumberMatch;
