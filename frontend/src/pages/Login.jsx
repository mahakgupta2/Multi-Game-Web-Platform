import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", { email, password });
      
      // Save token
      localStorage.setItem("token", res.data.token);

      toast.success(res.data.message);// Login successful
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Welcome Back 🎯
        </h2>

        <form className="space-y-4">
          <input
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 outline-none"
          />

          <input
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 outline-none"
          />

          <button
          type="button"
          onClick={handleLogin}
           className="w-full bg-indigo-500 py-2 rounded-lg hover:bg-indigo-600">
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

    </div>
  );
};

export default Login;
