import { useEffect, useState } from "react";

import {
  Mail,
  Bike,
  IndianRupee,
  CheckCircle,
  LogOut,
  ShieldCheck,
  CalendarDays,
  Wifi
} from "lucide-react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import BottomNavRider
from "../components/dashboard-v2/BottomNavRider";

import {
  subscribeToRiderStats,
  updateRiderOnlineStatus
} from "../services/riderStatsService";

import toast from "react-hot-toast";

const RiderProfile = () => {

  const { user } = useAuth();

  const navigate = useNavigate();

  const [profile, setProfile] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  // ============================
  // Fetch Profile
  // ============================

  useEffect(() => {

    if (!user) {

      setLoading(false);

      return;

    }

    const unsubscribe =

      subscribeToRiderStats(

        user.uid,

        (data) => {

          setProfile(data || {});

          setLoading(false);

        }

      );

    const timer = setTimeout(() => {

      setLoading(false);

    }, 3000);

    return () => {

      unsubscribe();

      clearTimeout(timer);

    };

  }, [user]);

  // ============================
  // Helpers
  // ============================

  const isApproved =

    profile?.approved === true
    ||
    profile?.approved === "true";

  const isOnline =

    profile?.online === true
    ||
    profile?.online === "true";

  // ============================
  // Logout
  // ============================

  const handleLogout =
    async () => {

      const confirmLogout =

        window.confirm(
          "Are you sure you want to logout?"
        );

      if (!confirmLogout) return;

      try {

        if (user) {

          await updateRiderOnlineStatus(
            user.uid,
            false
          );

        }

        await signOut(auth);

        toast.success(
          "Logged Out Successfully"
        );

        navigate("/", {
          replace: true
        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Logout Failed"
        );

      }

    };

  // ============================
  // Loading UI
  // ============================

  if (loading) {

    return (

      <div className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      ">

        <div className="text-center">

          <div className="
          w-14
          h-14
          border-4
          border-yellow-400
          border-t-transparent
          rounded-full
          animate-spin
          mx-auto
          mb-5
          " />

          <h2 className="
          text-xl
          font-semibold
          ">

            Loading Profile...

          </h2>

        </div>

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

      {/* Header */}

      <div className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-[32px]
      p-8
      text-center
      mb-6
      ">

        <div className="
        w-28
        h-28
        rounded-full
        bg-gradient-to-r
        from-yellow-400
        to-orange-500
        mx-auto
        flex
        items-center
        justify-center
        text-black
        text-4xl
        font-bold
        ">

          {
            user?.email
              ?.charAt(0)
              ?.toUpperCase()
          }

        </div>

        <h1 className="
        text-3xl
        font-bold
        mt-5
        ">

          {
            profile?.name
            ||
            user?.email
              ?.split("@")[0]
          }

        </h1>

        <p className="
        text-zinc-400
        mt-2
        ">

          Rider Account

        </p>

      </div>

      {/* Stats */}

      <div className="
      grid
      grid-cols-2
      gap-4
      mb-6
      ">

        <div className="
        bg-zinc-900
        rounded-3xl
        p-5
        border
        border-zinc-800
        ">

          <IndianRupee
            className="
            text-yellow-400
            mb-3
            "
          />

          <h2 className="
          text-2xl
          font-bold
          ">

            ₹{profile?.earnings || 0}

          </h2>

          <p className="text-zinc-400">

            Earnings

          </p>

        </div>

        <div className="
        bg-zinc-900
        rounded-3xl
        p-5
        border
        border-zinc-800
        ">

          <CheckCircle
            className="
            text-green-400
            mb-3
            "
          />

          <h2 className="
          text-2xl
          font-bold
          ">

            {profile?.completedRides || 0}

          </h2>

          <p className="text-zinc-400">

            Completed

          </p>

        </div>

      </div>

      {/* Details */}

      <div className="
      bg-zinc-900
      rounded-3xl
      border
      border-zinc-800
      p-6
      space-y-6
      ">

        <div className="flex gap-4 items-center">

          <Mail className="text-yellow-400" />

          <div>

            <p className="text-zinc-400 text-sm">
              Email
            </p>

            <p>{user?.email}</p>

          </div>

        </div>

        <div className="flex gap-4 items-center">

          <Bike className="text-yellow-400" />

          <div>

            <p className="text-zinc-400 text-sm">
              Vehicle Number
            </p>

            <p>
              {profile?.vehicleNumber || "Not Added"}
            </p>

          </div>

        </div>

        <div className="flex gap-4 items-center">

          <ShieldCheck

            className={
              isApproved
              ? "text-green-400"
              : "text-red-400"
            }

          />

          <div>

            <p className="text-zinc-400 text-sm">
              Approval Status
            </p>

            <p>

              {
                isApproved
                ? "Approved"
                : "Pending Approval"
              }

            </p>

          </div>

        </div>

        <div className="flex gap-4 items-center">

          <Wifi

            className={
              isOnline
              ? "text-green-400"
              : "text-zinc-400"
            }

          />

          <div>

            <p className="text-zinc-400 text-sm">
              Current Status
            </p>

            <p>

              {
                isOnline
                ? "Online"
                : "Offline"
              }

            </p>

          </div>

        </div>

        <div className="flex gap-4 items-center">

          <CalendarDays
            className="text-yellow-400"
          />

          <div>

            <p className="text-zinc-400 text-sm">
              Joined
            </p>

            <p>

              {
                profile?.createdAt
                ? new Date(
                    profile.createdAt
                  ).toLocaleDateString()
                : "N/A"
              }

            </p>

          </div>

        </div>

      </div>

      {/* Logout */}

      <button

        onClick={handleLogout}

        className="
        w-full
        mt-8
        bg-red-500
        hover:bg-red-600
        transition-all
        py-4
        rounded-2xl
        font-bold
        flex
        justify-center
        items-center
        gap-3
        "

      >

        <LogOut />

        Logout

      </button>

      <BottomNavRider />

    </div>

  );

};

export default RiderProfile;