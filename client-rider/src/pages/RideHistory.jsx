import { useEffect, useState } from "react";
import BottomNavbar from "../components/dashboard/BottomNavbar";
import { useAuth } from "../context/AuthContext";

import {
  subscribeToCompletedRides,
} from "../services/rideService";

const RideHistory = () => {

  const { user } = useAuth();

  const [rides, setRides] =
    useState([]);
    console.log("RideHistory Loaded");
    console.log("User:", user);
    console.log("Rides:", rides);
  useEffect(() => {

    if (!user) return;

    const unsubscribe =
      subscribeToCompletedRides(
        user.uid,
        (data) => {

          setRides(data);

        }
      );

    return () =>
      unsubscribe();

  }, [user]);

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Ride History
      </h1>

      {rides.length === 0 ? (

        <p className="text-zinc-400">
          No Completed Rides Yet
        </p>

      ) : (

        rides.map((ride) => (

          <div
            key={ride.id}
            className="bg-zinc-900 p-4 rounded-xl mb-4"
          >

            <p>
              Pickup: {ride.pickup}
            </p>

            <p>
              Drop: {ride.drop}
            </p>

            <p>
              Fare: ₹{ride.fare}
            </p>

            <p className="text-green-400">
              Completed
            </p>

          </div>

        ))

      )}
     <BottomNavbar />
    </div>
  );
};

export default RideHistory;