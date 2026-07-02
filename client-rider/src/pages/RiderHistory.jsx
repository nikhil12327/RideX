import { useEffect, useState } from "react";

import {
  MapPin,
  Calendar,
  IndianRupee
} from "lucide-react";

import { motion }
from "framer-motion";

import { useAuth }
from "../context/AuthContext";

import BottomNavRider
from "../components/dashboard-v2/BottomNavRider";

import {
  subscribeToRiderHistory
}
from "../services/riderHistoryService";

const RiderHistory = () => {

  const { user } = useAuth();

  const [rides, setRides] =
    useState([]);

  useEffect(() => {

    if (!user) return;

    const unsubscribe =

      subscribeToRiderHistory(

        user.uid,

        (ridesData) => {

          setRides(ridesData);

        }

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

        Ride History

      </h1>

      {

        rides.length === 0

        ?

        (

          <div className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-10
          text-center
          text-zinc-400
          ">

            No rides found

          </div>

        )

        :

        (

          <div className="
          space-y-4
          ">

            {

              rides.map(

                (ride, index) => (

                  <motion.div

                    key={ride.id}

                    initial={{
                      opacity: 0,
                      y: 20
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
                    bg-zinc-900
                    border
                    border-zinc-800
                    rounded-3xl
                    p-5
                    "

                  >

                    <div className="
                    flex
                    justify-between
                    items-start
                    ">

                      <div>

                        <h2 className="
                        text-lg
                        font-semibold
                        ">

                          {

                            ride.customerName

                            ||

                            "Customer"

                          }

                        </h2>

                        <div className="
                        mt-4
                        space-y-2
                        text-zinc-300
                        ">

                          <div className="
                          flex
                          gap-2
                          ">

                            <MapPin
                              size={18}
                              className="
                              text-green-400
                              "
                            />

                            <span>

                              {ride.pickup}

                            </span>

                          </div>

                          <div className="
                          flex
                          gap-2
                          ">

                            <MapPin
                              size={18}
                              className="
                              text-red-400
                              "
                            />

                            <span>

                              {ride.drop}

                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="
                      text-right
                      ">

                        <div className="
                        flex
                        items-center
                        justify-end
                        gap-1
                        text-yellow-400
                        font-bold
                        text-xl
                        ">

                          <IndianRupee
                            size={18}
                          />

                          {

                            ride.fare || 0

                          }

                        </div>

                        <span className={`
                        mt-2
                        inline-block
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${

                          ride.status ===
                          "completed"

                          ?

                          "bg-green-500/20 text-green-400"

                          :

                          "bg-red-500/20 text-red-400"

                        }
                        `}>

                          {ride.status}

                        </span>

                      </div>

                    </div>

                    <div className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-zinc-500
                    text-sm
                    ">

                      <Calendar
                        size={16}
                      />

                      {

                        ride.createdAt

                        ?

                        new Date(
                          ride.createdAt
                        ).toLocaleString()

                        :

                        "N/A"

                      }

                    </div>

                  </motion.div>

                )

              )

            }

          </div>

        )

      }

      <BottomNavRider />

    </div>

  );

};

export default RiderHistory;