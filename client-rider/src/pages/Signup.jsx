import { useState } from "react";

import { signup } from "../services/authService";

import { createRiderProfile } from "../services/riderService";

import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {

    e.preventDefault();
  
    setLoading(true);
  
    try {
  
      const userCredential = await signup(
        email,
        password
      );
  
      const user = userCredential.user;
      console.log("User UID:", user.uid);

      await createRiderProfile(
        user.uid,
        {
          name,
          email,
          phone,
          vehicleNumber,
          approved: false,
          suspended: false,
          earnings: 0,
        }
      );
        console.log("Firestore Save Completed");
      
        setLoading(false);

        alert("Account Created Successfully");
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
  
    } catch (error) {
  
      if (error.code === "auth/email-already-in-use") {
  
        alert("Email already registered");
  
      } else {
  
        alert("Signup failed");
  
      }
  
    } finally {
  
      setLoading(false);
  
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <form
        onSubmit={handleSignup}
        className="bg-zinc-900 p-6 rounded-3xl w-full max-w-sm"
      >

        <h2 className="text-yellow-400 text-3xl font-bold mb-6 text-center">
          Rider Signup
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-4 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-4 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
            setPhone(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-4"
        />

        <input
        type="text"
        placeholder="Vehicle Number"
        value={vehicleNumber}
        onChange={(e) =>
            setVehicleNumber(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-4"
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
            {loading ? "Creating Account..." : "Signup"}
            </button>

      </form>
    </div>
  );
};

export default Signup;