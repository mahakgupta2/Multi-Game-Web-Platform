import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const games = [
  { name: "Snake", emoji: "🐍", path: "/snake" },
  { name: "Tic Tac Toe", emoji: "❌⭕", path: "/tic-tac-toe" },
  { name: "Memory Cards", emoji: "🧠"},
  { name: "Rock Paper", emoji: "✊✋✌️", path: "/rock-paper" },
  { name: "Flappy Bird", emoji: "🐦", path: "/flappy" },
  { name: "2048", emoji: "🔢",  },
  { name: "Quiz Game", emoji: "❓",  },
  { name: "Speed Click", emoji: "⚡", path: "/speed-click" },
  { name: "Guess Number", emoji: "🎯", path: "/guess-number" },
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
      toast.success("Game coming soon 🚧");
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-400">🎮 GameHub</h1>

        <button
          onClick={() => setOpen(!open)}
          className="bg-gray-800 px-5 py-2 rounded-full hover:bg-gray-700"
        >
          👤 Profile
        </button>
      </div>

      {/* Games Grid */}
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-8">All Games</h2>

        {/* ✅ 3 Columns + Bigger Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-3xl p-10 text-center shadow-xl 
                         hover:scale-110 transition-transform duration-300"
            >
              <div className="text-6xl mb-6">{game.emoji}</div>
              <h3 className="text-2xl font-semibold">{game.name}</h3>

              <button
                onClick={() => handlePlay(game.path)}
                className="mt-6 bg-indigo-500 px-6 py-3 text-lg rounded-xl hover:bg-indigo-600"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Drawer */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-72 bg-gray-900 shadow-xl p-6">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white mb-6"
          >
            ✖ Close
          </button>

          <div className="text-center">
            <div className="text-6xl mb-2">👤</div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>

          <div className="mt-8">
            <button
              onClick={Logout}
              className="w-full bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
