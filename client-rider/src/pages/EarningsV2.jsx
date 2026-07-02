import { useEffect, useState } from "react";

import {
  Wallet,
  IndianRupee,
  TrendingUp
} from "lucide-react";

import { motion }
from "framer-motion";

import { useAuth }
from "../context/AuthContext";

import {
  subscribeToCompletedRides
}
from "../services/riderRideService";

import BottomNavRider
from "../components/dashboard-v2/BottomNavRider";

const EarningsV2 = () => {

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

  const totalEarnings =

    rides.reduce(

      (sum, ride) =>

        sum + (ride.fare || 0),

      0

    );

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

        Earnings

      </h1>

      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="
        glass
        rounded-[36px]
        p-8
        mb-6
        text-center
        "

      >

        <Wallet

          className="
          mx-auto
          text-yellow-400
          mb-5
          "

          size={40}

        />

        <h2 className="
        text-zinc-400
        mb-2
        ">

          Total Earnings

        </h2>

        <h1 className="
        text-5xl
        font-bold
        text-yellow-400
        ">

          ₹{totalEarnings}

        </h1>

      </motion.div>

      <div className="
      grid
      grid-cols-2
      gap-4
      mb-8
      ">

        <div className="
        glass
        rounded-3xl
        p-5
        text-center
        ">

          <IndianRupee
            className="
            mx-auto
            text-yellow-400
            mb-3
            "
          />

          <h2 className="
          text-3xl
          font-bold
          ">

            {rides.length}

          </h2>

          <p className="
          text-zinc-400
          ">

            Completed Trips

          </p>

        </div>

        <div className="
        glass
        rounded-3xl
        p-5
        text-center
        ">

          <TrendingUp
            className="
            mx-auto
            text-yellow-400
            mb-3
            "
          />

          <h2 className="
          text-3xl
          font-bold
          ">

            ₹{

              rides.length > 0

              ?

              Math.round(
                totalEarnings /
                rides.length
              )

              :

              0

            }

          </h2>

          <p className="
          text-zinc-400
          ">

            Avg Trip

          </p>

        </div>

      </div>

      <h2 className="
      text-xl
      font-bold
      mb-4
      ">

        Earnings History

      </h2>

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

                    <h3 className="
                    font-bold
                    ">

                      {

                        ride.pickup

                      }

                    </h3>

                    <p className="
                    text-zinc-400
                    ">

                      To {ride.drop}

                    </p>

                  </div>

                  <div className="
                  text-right
                  ">

                    <h2 className="
                    text-yellow-400
                    font-bold
                    ">

                      ₹{ride.fare}

                    </h2>

                  </div>

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

export default EarningsV2;