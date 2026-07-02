import { motion } from "framer-motion";

import {
  CheckCircle2,
  Ban,
  Bike,
  Wifi,
  WifiOff,
  Mail,
  Car,
} from "lucide-react";

const RiderManagement = ({
  riders = [],
  onApprove,
  onSuspend,
}) => {

  // Empty State

  if (!riders.length) {

    return (

      <div className="
      dashboard-card
      text-center
      py-20
      ">

        <Bike
          size={60}
          className="
          mx-auto
          text-zinc-600
          mb-5
          "
        />

        <h2 className="
        text-2xl
        font-bold
        text-white
        ">

          No Riders Found

        </h2>

        <p className="
        text-zinc-500
        mt-2
        ">

          There are no riders available.

        </p>

      </div>

    );

  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h2 className="
        text-3xl
        font-bold
        text-white
        ">

          Rider Management

        </h2>

        <p className="
        text-zinc-400
        mt-2
        ">

          Manage approvals, suspensions and rider activity.

        </p>

      </div>

      {/* Riders Grid */}

      <div className="
      grid
      grid-cols-1
      xl:grid-cols-2
      gap-6
      ">

        {

          riders.map((rider, index) => (

            <motion.div

              key={rider.id}

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: index * 0.05
              }}

              whileHover={{
                y: -6
              }}

              className="
              dashboard-card
              "

            >

              {/* Top Section */}

              <div className="
              flex
              justify-between
              items-start
              gap-4
              ">

                <div className="
                flex
                gap-4
                ">

                  {/* Avatar */}

                  <div className="
                  w-16
                  h-16
                  rounded-full
                  bg-gradient-to-r
                  from-yellow-400
                  to-orange-500
                  flex
                  items-center
                  justify-center
                  text-black
                  text-2xl
                  font-bold
                  shrink-0
                  ">

                    {

                      rider?.name
                        ?.charAt(0)
                        ?.toUpperCase()

                      || "R"

                    }

                  </div>

                  {/* Details */}

                  <div>

                    <h3 className="
                    text-xl
                    font-semibold
                    text-white
                    ">

                      {rider.name || "Unknown Rider"}

                    </h3>

                    <div className="
                    flex
                    items-center
                    gap-2
                    mt-2
                    text-zinc-400
                    text-sm
                    ">

                      <Mail size={15} />

                      {rider.email || "No Email"}

                    </div>

                    <div className="
                    flex
                    items-center
                    gap-2
                    mt-2
                    text-zinc-500
                    text-sm
                    ">

                      <Car size={15} />

                      Vehicle:

                      {

                        rider.vehicleNumber

                        || "N/A"

                      }

                    </div>

                  </div>

                </div>

                {/* Online Status */}

                <div>

                  {

                    rider.isOnline

                      ?

                      <div className="
                      bg-green-500/20
                      p-3
                      rounded-2xl
                      ">

                        <Wifi
                          className="
                          text-green-400
                          "
                        />

                      </div>

                      :

                      <div className="
                      bg-red-500/20
                      p-3
                      rounded-2xl
                      ">

                        <WifiOff
                          className="
                          text-red-400
                          "
                        />

                      </div>

                  }

                </div>

              </div>

              {/* Status Badges */}

              <div className="
              flex
              flex-wrap
              gap-3
              mt-6
              ">

                {

                  rider.isApproved

                    ?

                    <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-green-500/20
                    text-green-400
                    text-sm
                    ">

                      Approved

                    </span>

                    :

                    <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-yellow-500/20
                    text-yellow-400
                    text-sm
                    ">

                      Pending Approval

                    </span>

                }

                {

                  rider.isSuspended && (

                    <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-red-500/20
                    text-red-400
                    text-sm
                    ">

                      Suspended

                    </span>

                  )

                }

              </div>

              {/* Action Buttons */}

              <div className="
              flex
              gap-4
              mt-8
              flex-wrap
              ">

                {

                  !rider.isApproved && (

                    <button

                      onClick={() =>
                        onApprove(
                          rider.id
                        )
                      }

                      className="
                      flex-1
                      min-w-[150px]
                      bg-green-500
                      hover:bg-green-600
                      py-3
                      rounded-2xl
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      transition-all
                      "

                    >

                      <CheckCircle2 size={18} />

                      Approve

                    </button>

                  )

                }

                <button

                  onClick={() =>
                    onSuspend(
                      rider.id,
                      rider.isSuspended
                    )
                  }

                  className="
                  flex-1
                  min-w-[150px]
                  bg-red-500
                  hover:bg-red-600
                  py-3
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  "

                >

                  <Ban size={18} />

                  {

                    rider.isSuspended

                      ? "Unsuspend"

                      : "Suspend"

                  }

                </button>

              </div>

            </motion.div>

          ))

        }

      </div>

    </div>

  );

};

export default RiderManagement;