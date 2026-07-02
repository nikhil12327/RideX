import { useEffect, useState } from "react";

import {
  useAuth
}
from "../context/AuthContext";

import {
  subscribeToCompletedRides
}
from "../services/riderRideService";

import BottomNavRider
from "../components/dashboard-v2/BottomNavRider";

const RideHistoryV2 = () => {

  const { user } =
    useAuth();

  const [rides, setRides] =
    useState([]);

  useEffect(() => {

    if (!user) return;

    const unsubscribe =

      subscribeToCompletedRides(

        user.uid,

        setRides

      );

    return () =>
      unsubscribe();

  }, [user]);

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

      <h1 className="
      text-3xl
      font-bold
      mb-6
      ">

        Trip History

      </h1>

      <div className="space-y-4">

        {

          rides.map(

            ride => (

              <div

                key={ride.id}

                className="
                glass
                rounded-3xl
                p-5
                "

              >

                <div className="
                flex
                justify-between
                ">

                  <div>

                    <h2 className="
                    font-bold
                    ">

                      {ride.pickup}

                    </h2>

                    <p className="
                    text-zinc-400
                    ">

                      To {ride.drop}

                    </p>

                  </div>

                  <h2 className="
                  text-yellow-400
                  font-bold
                  ">

                    ₹{ride.fare}

                  </h2>

                </div>

              </div>

            )

          )

        }

      </div>

      <BottomNavRider />

    </div>

  );

};

export default RideHistoryV2;