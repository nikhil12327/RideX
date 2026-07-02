import { useState } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Bike,
} from "lucide-react";

import { login }
from "../services/authService";

import { useNavigate }
from "react-router-dom";

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

      setLoading(true);

      try {

        await login(
          email,
          password
        );

        toast.success(
          "Login Successful"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        if (
          error.code ===
          "auth/invalid-credential"
        ) {

          toast.error(
            "Invalid Email or Password"
          );

        } else {

          toast.error(
            "Login Failed"
          );

        }

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-zinc-950
      to-zinc-900
      flex
      items-center
      justify-center
      p-6
    ">

      <motion.form

        onSubmit={handleLogin}

        initial={{
          opacity: 0,
          y: 50,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        className="
          glass
          floating-card
          w-full
          max-w-md
          rounded-[36px]
          p-8
        "

      >

        <div className="text-center mb-8">

          <div className="
            w-20
            h-20
            rounded-full
            bg-gradient-to-r
            from-yellow-400
            to-orange-500
            mx-auto
            flex
            items-center
            justify-center
            mb-5
          ">

            <Bike
              size={40}
              className="text-black"
            />

          </div>

          <h1 className="
            text-4xl
            font-bold
            text-white
          ">

            RideX

          </h1>

          <p className="
            text-zinc-400
            mt-2
          ">

            Welcome Back

          </p>

        </div>

        <div className="space-y-5">

          <div className="ridex-input">

            <Mail
              className="text-yellow-400"
            />

            <input

              type="email"

              placeholder="Email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              className="
                bg-transparent
                outline-none
                text-white
                w-full
              "

              required

            />

          </div>

          <div className="ridex-input">

            <Lock
              className="text-yellow-400"
            />

            <input

              type="password"

              placeholder="Password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              className="
                bg-transparent
                outline-none
                text-white
                w-full
              "

              required

            />

          </div>

          <button

            type="submit"

            disabled={loading}

            className="
              ridex-btn-primary
            "

          >

            {
              loading
                ? "Logging In..."
                : "Login"
            }

          </button>

        </div>

        <p className="
          text-center
          text-zinc-400
          mt-8
        ">

          Don't have an account?

          <span

            onClick={() =>
              navigate(
                "/signup"
              )
            }

            className="
              text-yellow-400
              ml-2
              cursor-pointer
              hover:underline
            "

          >

            Sign Up

          </span>

        </p>

      </motion.form>

    </div>

  );

};

export default LoginV2;