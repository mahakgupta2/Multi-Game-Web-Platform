import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const games = [
  { name: "Snake Game", emoji: "🐍" },
  { name: "Tic Tac Toe", emoji: "❌⭕" },
  { name: "Memory Cards", emoji: "🧠" },
  { name: "Rock Paper Scissors", emoji: "✊✋✌️" },
];

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-white/10 rounded-b-2xl shadow-lg fixed w-full z-50">
        <h1 className="text-2xl font-extrabold text-indigo-400 animate-pulse">
          🎮 GameHub
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-500 px-5 py-2 rounded-xl hover:bg-indigo-600 transition duration-300 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-32 px-6 md:px-20 animate-fadeIn">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 animate-gradient-x">
          Play Multiple Games <br /> One Platform 🕹️
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg md:text-xl">
          Enjoy casual browser games, track your scores, compete on leaderboards,
          and manage your profile — all in one place.
        </p>

        <Link
          to="/signup"
          className="inline-block bg-indigo-500 px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 hover:bg-indigo-600 transition transform shadow-xl"
        >
          Get Started 🚀
        </Link>
      </section>

      {/* Games Preview */}
      <section className="mt-32 px-6 md:px-16">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Popular Games
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 text-center shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-purple-500/50 cursor-pointer animate-fadeUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl mb-4 animate-bounce">{game.emoji}</div>
              <h4 className="text-xl md:text-2xl font-semibold">{game.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-8 text-center text-gray-400 border-t border-gray-700">
        © 2026 GameHub • Built with ❤️ using React & Tailwind
      </footer>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeUp { animation: fadeUp 0.7s ease-out forwards; }

          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 5s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Landing;
