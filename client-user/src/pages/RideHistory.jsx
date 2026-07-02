import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import BottomNavbar from "../components/BottomNavbar";

import {
  subscribeToCompletedCustomerRides,
} from "../services/rideService";

const RideHistory = () => {

  const { user } = useAuth();

  const [rides, setRides] =
    useState([]);

  useEffect(() => {

    if (!user) return;

    const unsubscribe =
      subscribeToCompletedCustomerRides(
        user.uid,
        setRides
      );

    return () =>
      unsubscribe();

  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white p-6 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Ride History
      </h1>

      {rides.length === 0 ? (

<div className="bg-zinc-900 p-6 rounded-3xl text-center">

<p className="text-zinc-400">
  No Completed Rides Yet
</p>

</div>

      ) : (

        rides.map((ride) => (

          <div
            key={ride.id}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl mb-4 shadow-lg"
          >

            <p>
              Pickup:
              {ride.pickup}
            </p>

            <p>
              Drop:
              {ride.drop}
            </p>

            <p>
              Fare:
              ₹{ride.fare}
            </p>

          </div>

        ))

      )}
     <BottomNavbar />
    </div>
  );
};

export default RideHistory;