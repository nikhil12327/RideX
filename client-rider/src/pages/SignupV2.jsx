import { Link } from "react-router-dom";

const SignupV2 = () => {

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
        border border-zinc-800
        rounded-3xl
        p-8
      ">

        <h1 className="
          text-4xl
          font-bold
          text-white
          text-center
          mb-2
        ">
          Create Account
        </h1>

        <p className="
          text-zinc-400
          text-center
          mb-8
        ">
          Join RideX today
        </p>

        <input
          placeholder="Full Name"
          className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            text-white
            mb-4
          "
        />

        <input
          placeholder="Email"
          className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            text-white
            mb-4
          "
        />

        <input
          placeholder="Phone"
          className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            text-white
            mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"
          className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            text-white
            mb-6
          "
        />

        <button className="
          w-full
          bg-yellow-400
          text-black
          p-4
          rounded-2xl
          font-bold
        ">
          Create Account
        </button>

        <p className="
          text-center
          text-zinc-400
          mt-6
        ">

          Already have an account?

          <Link
            to="/login"
            className="text-yellow-400 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

};

export default SignupV2;