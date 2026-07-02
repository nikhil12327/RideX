import { useState } from "react";

import { signup } from "../services/authService";

import { useNavigate } from "react-router-dom";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

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

      console.log(
        "Customer UID:",
        user.uid
      );

      await setDoc(
        doc(
          db,
          "customers",
          user.uid
        ),
        {
          name,
          email,
      
          totalRides: 0,
      
          totalSpent: 0,
      
          createdAt:
            Date.now(),
        }
      );

      console.log(
        "Customer profile saved"
      );

      alert(
        "Customer account created successfully"
      );

      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);

    } catch (error) {

      console.error(error);

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {

        alert(
          "Email already registered"
        );

      } else {

        alert(
          "Signup failed"
        );

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
          Customer Signup
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-4 outline-none"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-4 outline-none"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-zinc-800 text-white mb-6 outline-none"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
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
          {loading
            ? "Creating Account..."
            : "Signup"}
        </button>

      </form>

    </div>
  );
};

export default Signup;