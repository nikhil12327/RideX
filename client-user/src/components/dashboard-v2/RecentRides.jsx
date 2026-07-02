import {
  MapPin
} from "lucide-react";

import { motion } from "framer-motion";

const RecentRides = ({
  rides = []
}) => {

  const recentRides =

    [...rides]

      .sort(
        (a, b) =>
          b.createdAt -
          a.createdAt
      )

      .slice(0, 5);

  return (

    <div className="mb-32">

      <h2 className="
      ridex-section-label
      ">

        RECENT RIDES

      </h2>

      {

        recentRides.length === 0

        ?

        (

          <div className="
          ridex-card
          p-8
          text-center
          ">

            <p className="
            text-zinc-400
            ">

              No rides yet

            </p>

          </div>

        )

        :

        (

          <div className="space-y-4">

            {

              recentRides.map(

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
                        index * 0.1
                    }}

                    className="
                    ridex-card
                    p-4
                    "

                  >

                    <div className="
                    flex
                    justify-between
                    items-center
                    ">

                      <div className="
                      flex
                      gap-3
                      items-center
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
                          font-semibold
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
                          text-green-400
                          ">

                            {ride.status}

                          </p>

                        </div>

                      </div>

                      <h3 className="
                      text-yellow-400
                      font-bold
                      ">

                        ₹{ride.fare}

                      </h3>

                    </div>

                  </motion.div>

                )

              )

            }

          </div>

        )

      }

    </div>

  );

};

export default RecentRides;