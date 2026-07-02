import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Search,
  MapPin,
} from "lucide-react";

import { useAuth }
from "../context/AuthContext";

import {
  subscribeToCustomerRides,
} from "../services/rideService";

import BottomNavV2
from "../components/dashboard-v2/BottomNavV2";

import EmptyState
from "../components/dashboard-v2/EmptyState";

const RideHistoryV2 = () => {

  const { user } = useAuth();

  const [rides, setRides] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    if (!user) return;

    const unsubscribe =
      subscribeToCustomerRides(

        user.uid,

        (ridesData) => {

          setRides(ridesData);

        }

      );

    return () =>
      unsubscribe();

  }, [user]);

  const filteredRides =

    rides

      .filter(

        ride =>

          ride.pickup
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          ride.drop
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          ride.status
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

      )

      .sort(
        (a, b) =>
          b.createdAt -
          a.createdAt
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

        Ride History

      </h1>

      <div className="
      ridex-input
      mb-6
      ">

        <Search
          className="
          text-yellow-400
          "
        />

        <input

          placeholder="Search rides"

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="
          bg-transparent
          outline-none
          w-full
          text-white
          "

        />

      </div>

      {

        filteredRides.length === 0

        ?

        (

          <EmptyState

            title="No Rides Found"

            subtitle="Book your first ride to see history here."

          />

        )

        :

        (

          <div className="space-y-4">

            {

              filteredRides.map(

                (ride, index) => (

                  <motion.div

                    key={ride.id}

                    initial={{
                      opacity: 0,
                      y: 30
                    }}

                    animate={{
                      opacity: 1,
                      y: 0
                    }}

                    transition={{
                      delay:
                        index * 0.05
                    }}

                    className="
                    glass
                    rounded-3xl
                    p-5
                    "

                  >

                    <div className="
                    flex
                    justify-between
                    items-center
                    ">

                      <div className="
                      flex
                      gap-4
                      ">

                        <div className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-yellow-400/10
                        flex
                        items-center
                        justify-center
                        ">

                          <MapPin
                            className="
                            text-yellow-400
                            "
                          />

                        </div>

                        <div>

                          <h3 className="
                          font-bold
                          ">

                            {ride.pickup}

                          </h3>

                          <p className="
                          text-zinc-400
                          text-sm
                          ">

                            To {ride.drop}

                          </p>

                          <p className="
                          text-xs
                          text-zinc-500
                          mt-1
                          ">

                            {

                              ride.createdAt

                              ?

                              new Date(
                                ride.createdAt
                              ).toLocaleDateString()

                              :

                              "N/A"

                            }

                          </p>

                        </div>

                      </div>

                      <div className="
                      text-right
                      ">

                        <h3 className="
                        text-yellow-400
                        font-bold
                        ">

                          ₹{ride.fare}

                        </h3>

                        <span className={`
                        text-xs
                        px-3
                        py-1
                        rounded-full

                        ${

                          ride.status === "completed"

                          ?

                          "bg-green-500/20 text-green-400"

                          :

                          ride.status === "cancelled"

                          ?

                          "bg-red-500/20 text-red-400"

                          :

                          "bg-yellow-500/20 text-yellow-400"

                        }

                        `}>

                          {

                            ride.status
                              ?.charAt(0)
                              ?.toUpperCase()

                            +

                            ride.status
                              ?.slice(1)

                          }

                        </span>

                      </div>

                    </div>

                  </motion.div>

                )

              )

            }

          </div>

        )

      }

      <BottomNavV2 />

    </div>

  );

};

export default RideHistoryV2;