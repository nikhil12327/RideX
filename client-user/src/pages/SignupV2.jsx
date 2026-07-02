import { useState } from "react";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Phone,
  Lock,
  Bike
} from "lucide-react";

import { signup }
from "../services/authService";

import { useNavigate }
from "react-router-dom";

import {
  doc,
  setDoc
} from "firebase/firestore";

import { db }
from "../firebase/config";

import toast
from "react-hot-toast";

const SignupV2 = () => {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const userCredential =
          await signup(
            email,
            password
          );

        const user =
          userCredential.user;

        await setDoc(

          doc(
            db,
            "customers",
            user.uid
          ),

          {
            name,
            email,
          
            walletBalance: 0,
          
            totalRides: 0,
          
            totalSpent: 0,
          
            createdAt: Date.now()
          }

        );

        toast.success(
          "Account Created Successfully"
        );

        setTimeout(() => {

          navigate(
            "/dashboard"
          );

        }, 1000);

      } catch (error) {

        console.log(error);

        if (
          error.code ===
          "auth/email-already-in-use"
        ) {

          toast.error(
            "Email Already Registered"
          );

        } else {

          toast.error(
            "Signup Failed"
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

        onSubmit={handleSignup}

        initial={{
          opacity: 0,
          y: 50
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.6
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

            Create Account

          </h1>

          <p className="
            text-zinc-400
            mt-2
          ">

            Join RideX today

          </p>

        </div>

        <div className="space-y-4">

          <div className="ridex-input">

            <User
              className="text-yellow-400"
            />

            <input

              type="text"

              placeholder="Full Name"

              value={name}

              onChange={(e) =>
                setName(
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

            <Phone
              className="text-yellow-400"
            />

            <input

              type="tel"

              placeholder="Phone Number"

              value={phone}

              onChange={(e) =>
                setPhone(
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

                ? "Creating Account..."

                : "Create Account"

            }

          </button>

        </div>

        <p className="
          text-center
          text-zinc-400
          mt-8
        ">

          Already have an account?

          <span

            onClick={() =>
              navigate("/login")
            }

            className="
              text-yellow-400
              ml-2
              cursor-pointer
              hover:underline
            "

          >

            Login

          </span>

        </p>

      </motion.form>

    </div>

  );

};

export default SignupV2;