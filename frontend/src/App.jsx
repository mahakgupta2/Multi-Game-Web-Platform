import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "../middleware/ProtectedRoute";
import RockPaperScissors from "./pages/RockPaperScissor";
import SnakeGame from "./pages/SnakeGame";
import TicTacToe from "./pages/TicTacToe";
import FlappyBird from "./pages/FlappyBird";
import Speed from './pages/Speed'
import GuessNumber from './pages/GuessNumber'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/rock-paper" element={<RockPaperScissors/>}/>
        <Route path="/snake" element={<SnakeGame/>}/>
        <Route path="/tic-tac-toe" element={<TicTacToe/>}/>
        <Route path="/flappy" element={<FlappyBird/>}/>
        <Route path="/speed-click" element={<Speed/>}/>
        <Route path="/guess-number" element={<GuessNumber/>}/>
      </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
