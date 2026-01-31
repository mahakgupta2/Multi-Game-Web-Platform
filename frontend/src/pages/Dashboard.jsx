import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const games = [
  { name: "Snake", emoji: "🐍", path: "/snake" },
  { name: "Tic Tac Toe", emoji: "❌⭕", path: "/tic-tac-toe" },
  { name: "Memory Cards", emoji: "🧠" },
  { name: "Rock Paper", emoji: "✊✋✌️", path: "/rock-paper" },
  { name: "Flappy Bird", emoji: "🐦", path: "/flappy" },
  { name: "2048", emoji: "🔢" },
  { name: "Quiz Game", emoji: "❓" },
  { name: "Speed Click", emoji: "⚡", path: "/speed-click" },
  { name: "Guess Number", emoji: "🎯", path: "/guess-number" },
];

const mockLeaderboard = [
  { name: "Alice", score: 980 },
  { name: "Bob", score: 850 },
  { name: "Charlie", score: 760 },
  { name: "You", score: 650 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/");

        const res = await axios.get("http://localhost:3000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };

    fetchDashboard();
  }, [navigate]);

  const Logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    toast.success("Logout successful");
  };

  const handlePlay = (path) => {
    if (!path) {
      toast.info("Game coming soon 🚧");
      return;
    }
    navigate(path);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-x-hidden">

      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-700 backdrop-blur-md bg-white/10 shadow-lg fixed w-full z-50 animate-slideDown">
        <h1 className="text-2xl font-bold text-indigo-400 animate-pulse">🎮 GameHub</h1>

        <button
          onClick={() => setOpen(!open)}
          className="bg-gray-800 px-5 py-2 rounded-full hover:bg-gray-700 transition duration-300 shadow-lg"
        >
          👤 Profile
        </button>
      </div>

      {/* Games Grid */}
      <div className="p-10 mt-24">
        <h2 className="text-3xl font-bold mb-8 text-center animate-fadeInUp">All Games</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-gray-900/80 backdrop-blur-md rounded-3xl p-10 text-center shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:shadow-purple-500/50 cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-6 animate-bounce">{game.emoji}</div>
              <h3 className="text-2xl font-semibold mb-4">{game.name}</h3>

              <button
                onClick={() => handlePlay(game.path)}
                className="mt-4 bg-indigo-500 px-6 py-3 text-lg rounded-xl hover:bg-indigo-600 hover:scale-105 transition-transform shadow-lg"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Drawer */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)}></div>

          <div className="fixed top-0 right-0 w-80 h-full bg-gray-900 p-6 z-50">
            <button onClick={() => setOpen(false)}>✖</button>

            <div className="text-center my-6">
              <div className="text-6xl">👤</div>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="w-full mb-3 bg-indigo-500 py-2 rounded-lg"
            >
               View Profile
            </button>

            <button
              onClick={Logout}
              className="w-full bg-red-500 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </>
      )}

      {/* Custom Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease forwards; }

          @keyframes slideIn {
            0% { transform: translateX(100%); }
            100% { transform: translateX(0); }
          }
          .animate-slideIn { animation: slideIn 0.4s ease forwards; }

          @keyframes slideDown {
            0% { transform: translateY(-50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideDown { animation: slideDown 0.5s ease forwards; }

          .animate-bounce {
            animation: bounce 1s infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
