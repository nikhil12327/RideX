import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {

    e.preventDefault();
  
    setLoading(true);
  
    try {
  
      await login(email, password);
  
      alert("Login Successful");
  
      navigate("/dashboard");
  
    } catch (error) {
  
      if (error.code === "auth/invalid-credential") {
  
        alert("Invalid email or password");
  
      } else {
  
        alert("Login failed");
  
      }
  
    } finally {
  
      setLoading(false);
  
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-6 rounded-3xl w-full max-w-sm"
      >

        <h2 className="text-yellow-400 text-3xl font-bold mb-6 text-center">
          Rider Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-4 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-6 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

            <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                loading
                ? "bg-yellow-200 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300 text-black"
            }`}
            >
            {loading ? "Logging In..." : "Login"}
            </button>

      </form>
    </div>
  );
};

export default Login;