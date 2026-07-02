import { useState } from "react";

import { Link, useNavigate }
from "react-router-dom";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth }
from "../firebase/config";

import toast
from "react-hot-toast";

const LoginV2 = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async (e) => {

      e.preventDefault();

      if (!email || !password) {

        toast.error(
          "Please enter email and password"
        );

        return;
      }

      try {

        setLoading(true);

        await signInWithEmailAndPassword(

          auth,
          email,
          password

        );

        toast.success(
          "Login Successful"
        );

        navigate("/dashboard");

      } catch (error) {

        console.log(error);

        toast.error(
          error.message
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-b
      from-zinc-950
      via-black
      to-zinc-900
      flex
      items-center
      justify-center
      p-6
    ">

      <div className="
        w-full
        max-w-md
        bg-zinc-900/60
        backdrop-blur-lg
        border
        border-zinc-800
        rounded-3xl
        p-8
      ">

        <h1 className="
          text-4xl
          font-bold
          text-center
          text-white
          mb-2
        ">

          Welcome Back

        </h1>

        <p className="
          text-zinc-400
          text-center
          mb-8
        ">

          Login to continue

        </p>

        <form
          onSubmit={handleLogin}
        >

          <input

            type="email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            placeholder="Email"

            className="
              w-full
              p-4
              rounded-2xl
              bg-zinc-800
              text-white
              mb-4
              outline-none
            "

          />

          <input

            type="password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            placeholder="Password"

            className="
              w-full
              p-4
              rounded-2xl
              bg-zinc-800
              text-white
              mb-6
              outline-none
            "

          />

          <button

            type="submit"

            disabled={loading}

            className="
              w-full
              bg-yellow-400
              text-black
              p-4
              rounded-2xl
              font-bold
              hover:opacity-90
              transition-all
            "

          >

            {

              loading

              ?

              "Logging in..."

              :

              "Login"

            }

          </button>

        </form>

        <p className="
          text-center
          text-zinc-400
          mt-6
        ">

          New User?

          <Link

            to="/signup"

            className="
              text-yellow-400
              ml-2
            "

          >

            Sign Up

          </Link>

        </p>

      </div>

    </div>

  );

};

export default LoginV2;