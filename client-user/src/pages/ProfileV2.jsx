import { motion } from "framer-motion";

import BottomNavV2
from "../components/dashboard-v2/BottomNavV2";

import {
  Phone,
  Mail,
  Wallet,
  Clock3,
  Star,
  LogOut
} from "lucide-react";

import {
  signOut
} from "firebase/auth";

import {
  auth
} from "../firebase/config";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import {
  useEffect,
  useState
} from "react";

import {
  getCustomerProfile
} from "../services/customerService";

import {
  subscribeToCompletedCustomerRides
} from "../services/rideService";

import toast
from "react-hot-toast";

const ProfileV2 = () => {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [profile, setProfile] =
    useState(null);

  const [totalRides, setTotalRides] =
    useState(0);

  useEffect(() => {

    if (!user) return;

    const fetchProfile =
      async () => {

        try {

          const data =
            await getCustomerProfile(
              user.uid
            );

          setProfile(data);

        } catch (error) {

          console.log(error);

          toast.error(
            "Unable to load profile"
          );

        }

      };

    fetchProfile();

    const unsubscribe =

      subscribeToCompletedCustomerRides(

        user.uid,

        (rides) => {

          setTotalRides(
            rides.length
          );

        }

      );

    return () =>
      unsubscribe();

  }, [user]);

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        toast.success(
          "Logged Out Successfully"
        );

        navigate("/login");

      } catch (error) {

        toast.error(
          "Logout Failed"
        );

      }

    };

  if (!profile) {

    return (

      <div className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      ">

        Loading Profile...

      </div>

    );

  }

  return (

    <div className="
    min-h-screen
    bg-gradient-to-b
    from-zinc-950
    via-black
    to-zinc-900
    text-white
    p-5
    pb-32
    ">

      {/* Profile Header */}

      <motion.div

        initial={{
          opacity: 0,
          y: 30
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="
        flex
        flex-col
        items-center
        mb-8
        "

      >

        <div className="
        w-28
        h-28
        rounded-full
        bg-gradient-to-r
        from-yellow-400
        to-orange-500
        flex
        items-center
        justify-center
        text-black
        text-5xl
        font-bold
        shadow-2xl
        ">

          {profile.name?.charAt(0)}

        </div>

        <h1 className="
        text-3xl
        font-bold
        mt-5
        ">

          {profile.name}

        </h1>

        <p className="
        text-zinc-400
        ">

          {profile.email}

        </p>

      </motion.div>

      {/* Stats */}

      <div className="
      grid
      grid-cols-3
      gap-4
      mb-8
      ">

        <StatCard
          icon={<Clock3 />}
          value={totalRides}
          label="Rides"
        />

        <StatCard
          icon={<Star />}
          value="4.9"
          label="Rating"
        />

        <StatCard
          icon={<Wallet />}
          value={`₹${profile.totalSpent || 0}`}
          label="Spent"
        />

      </div>

      {/* User Information */}

      <div className="space-y-4">

        <InfoCard

          icon={<Phone />}

          title="Phone Number"

          value={
            profile.phone ||
            "Not Available"
          }

        />

        <InfoCard

          icon={<Mail />}

          title="Email"

          value={profile.email}

        />

      </div>

      {/* Logout */}

      <button

        onClick={
          handleLogout
        }

        className="
        w-full
        mt-8
        bg-red-500
        py-4
        rounded-3xl
        font-bold
        flex
        items-center
        justify-center
        gap-3
        hover:bg-red-600
        transition-all
        "

      >

        <LogOut />

        Logout

      </button>

      <BottomNavV2 />

    </div>

  );

};

const StatCard = ({
  icon,
  value,
  label
}) => (

  <div className="
  glass
  rounded-3xl
  p-5
  text-center
  ">

    <div className="
    text-yellow-400
    flex
    justify-center
    mb-3
    ">

      {icon}

    </div>

    <h3 className="
    text-xl
    font-bold
    ">

      {value}

    </h3>

    <p className="
    text-zinc-400
    text-sm
    ">

      {label}

    </p>

  </div>

);

const InfoCard = ({
  icon,
  title,
  value
}) => (

  <motion.div

    whileHover={{
      scale: 1.02
    }}

    className="
    glass
    rounded-3xl
    p-5
    flex
    items-center
    gap-4
    "

  >

    <div className="
    text-yellow-400
    ">

      {icon}

    </div>

    <div>

      <h3>

        {title}

      </h3>

      <p className="
      text-zinc-400
      text-sm
      ">

        {value}

      </p>

    </div>

  </motion.div>

);

export default ProfileV2;