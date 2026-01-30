import React from "react";
import { Link, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        if (token) {
        navigate("/dashboard");
        }
    }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-indigo-400">🎮 GameHub</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-20 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Play Multiple Games <br /> One Platform 🕹️
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Enjoy casual browser games, track your scores, compete on leaderboards
          and manage your profile — all in one place.
        </p>

        <Link
          to="/signup"
          className="inline-block bg-indigo-500 px-8 py-3 rounded-xl text-lg hover:bg-indigo-600 transition"
        >
          Get Started 🚀
        </Link>
      </section>

      {/* Games Preview */}
      <section className="mt-20 px-8">
        <h3 className="text-3xl font-bold text-center mb-10">
          Popular Games
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">{game.emoji}</div>
              <h4 className="text-xl font-semibold">{game.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-6 text-center text-gray-500">
        © 2026 GameHub • Built with ❤️ using React & Tailwind
      </footer>
    </div>
  );
};

export default Landing;
