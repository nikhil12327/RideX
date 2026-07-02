import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Bike } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {

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

      navigate("/dashboard");

    } catch (error) {

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
      relative
      overflow-hidden
      min-h-screen
      bg-gradient-to-br
      from-zinc-950
      via-black
      to-zinc-900
      flex
      items-center
      justify-center
      p-5
    ">

      {/* Background Glow Effects */}

      <div className="
  absolute
  -top-32
  -left-32
  w-[500px]
  h-[500px]
  bg-yellow-500/15
  rounded-full
  blur-[120px]
" />

<div className="
  absolute
  -bottom-32
  -right-32
  w-[500px]
  h-[500px]
  bg-orange-500/15
  rounded-full
  blur-[120px]
" />

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        whileHover={{
          y: -5
        }}

        transition={{
          duration: 0.5
        }}

        className="
        relative
        z-10
        w-full
        max-w-md
        backdrop-blur-2xl
        bg-zinc-900/70
        border
        border-zinc-800/80
        rounded-[40px]
        px-12
        py-10
        shadow-[0_30px_80px_rgba(0,0,0,0.7)]
        "

      >

        {/* Logo */}

        <div className="flex flex-col items-center mb-10">

<motion.div

  animate={{
    y: [0, -4, 0]
  }}

  transition={{
    duration: 3,
    repeat: Infinity
  }}

  className="
    w-20
    h-20
    rounded-3xl
    bg-gradient-to-r
    from-yellow-400
    to-orange-500
    flex
    items-center
    justify-center
    ring-1
    ring-yellow-400/20
    shadow-[0_0_40px_rgba(251,191,36,0.35)]
    mb-6
  "
>

  <Bike
    size={42}
    className="text-black"
  />

</motion.div>

<h1 className="
  text-5xl
  font-extrabold
  text-white
  tracking-tight
">
  RideX
</h1>

<p className="
  text-zinc-400
  mt-3
  text-base
  max-w-xs
  text-center
  leading-relaxed
">
  Sign in to continue your journey
</p>

</div>

        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="space-y-4 px-4"
        >

          {/* Email */}

          <div
  className="
    flex
    items-center
    justify-center
    h-16
    w-[92%]
    mx-auto
    bg-black/40
    border
    border-zinc-800
    rounded-2xl
    px-5
    transition-all
    duration-300
    hover:border-zinc-600
    focus-within:border-yellow-400
    focus-within:shadow-[0_0_25px_rgba(251,191,36,0.2)]
  "
>

  <div className="w-8 flex justify-center">

    <Mail
      size={22}
      className="text-yellow-400"
    />

  </div>

  <input
    type="email"
    placeholder="Email Address"
    className="
      flex-1
      h-full
      bg-transparent
      outline-none
      text-white
      placeholder:text-zinc-500
      text-lg
      pl-3
    "
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />

</div>

          {/* Password */}

          <div
  className="
    flex
    items-center
    h-16
    w-[92%]
    mx-auto
    bg-black/40
    border
    border-zinc-800
    rounded-2xl
    px-5
    transition-all
    duration-300
    hover:border-zinc-600
    focus-within:border-yellow-400
    focus-within:shadow-[0_0_25px_rgba(251,191,36,0.2)]
  "
>

  <div className="w-8 flex justify-center">

    <Lock
      size={22}
      className="text-yellow-400"
    />

  </div>

  <input
    type="password"
    placeholder="Password"
    className="
      flex-1
      h-full
      bg-transparent
      outline-none
      text-white
      placeholder:text-zinc-500
      text-lg
      pl-3
    "
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

</div>

          {/* Forgot Password */}
          <div className="
            flex
            justify-end
            mt-2
            mb-3
            ">

  <button

    type="button"

    className="
      text-sm
      text-zinc-400
      hover:text-yellow-400
      transition-all
    "
  >

    Forgot Password?

  </button>

</div>

          {/* Login Button */}

          <button

            type="submit"

            disabled={loading}

            className={`
              w-[92%]
                mx-auto
                flex
                items-center
                justify-center
                h-14
              rounded-2xl
              font-bold
              text-lg
              transition-all
              duration-300
              shadow-xl

              ${
                loading
                ? "bg-zinc-700 cursor-not-allowed"
                : `
                  bg-gradient-to-r
                  from-yellow-400
                  to-orange-500
                  hover:scale-[1.02]
                  hover:-translate-y-1
                  text-black
                `
              }
            `}

          >

            {loading
              ? "Signing In..."
              : "Login"}

          </button>

        </form>

        {/* Signup */}

        <div className="
  text-center
  mt-8
  pt-5
  border-t
  border-zinc-800
  text-zinc-400
">

          Don't have an account?

          <Link

            to="/signup"

            className="
              text-yellow-400
              ml-2
              font-semibold
              hover:text-yellow-300
              transition-all
            "

          >

            Sign Up

          </Link>

        </div>

      </motion.div>

    </div>

  );

};

export default Login;