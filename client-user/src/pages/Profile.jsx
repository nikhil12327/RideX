import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { getCustomerProfile } from "../services/customerService";

import {
  subscribeToCompletedCustomerRides,
} from "../services/rideService";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

import { useNavigate } from "react-router-dom";

import BottomNavbar from "../components/BottomNavbar";

const Profile = () => {

  const { user } = useAuth();

  const navigate = useNavigate();

  const [profile, setProfile] =
    useState(null);
    const [totalRides, setTotalRides] =
  useState(0);
  useEffect(() => {

    if (!user) return;
  
    const fetchProfile = async () => {
  
      try {
  
        console.log(
          "Current User UID:",
          user.uid
        );
  
        const data =
          await getCustomerProfile(
            user.uid
          );
  
        console.log(
          "Customer Profile Data:",
          data
        );
  
        setProfile(data);
  
      } catch (error) {
  
        console.log(
          "Profile Error:",
          error
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
  
    return () => {
  
      unsubscribe();
  
    };
  
  }, [user]);

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        navigate("/login");

      } catch (error) {

        console.log(error);

      }
    };

    console.log("USER:", user);
    console.log("PROFILE:", profile);
    
    if (!profile) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading Profile...
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white p-6 pb-24">

      <div className="bg-zinc-900 rounded-3xl p-6">

        <div className="flex justify-center mb-6">

          <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-black text-3xl font-bold">

            {profile.name
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center mb-6">

          {profile.name}

        </h1>

        <div className="space-y-4">

          <div className="bg-zinc-800 p-4 rounded-xl">

            <p className="text-zinc-400">
              Email
            </p>

            <p>
              {profile.email}
            </p>

          </div>

          <div className="bg-zinc-800 p-4 rounded-xl">

            <p className="text-zinc-400">
              Total Rides
            </p>

            <p className="text-yellow-400 text-xl font-bold">

            {totalRides}

            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-gradient-to-r from-red-500 to-red-600 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>

      </div>
      <BottomNavbar />
    </div>
  );
};

export default Profile;