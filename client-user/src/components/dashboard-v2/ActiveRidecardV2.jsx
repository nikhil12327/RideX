import {
  Phone,
  MessageCircle,
  Star,
  Bike,
  ShieldCheck
} from "lucide-react";

import { motion } from "framer-motion";

import {
  cancelRide
} from "../../services/rideService";

import toast from "react-hot-toast";

const ActiveRideCardV2 = ({ ride }) => {

  if (!ride) return null;

  const handleCancel = async () => {

    try {

      await cancelRide(ride.id);

      toast.success("Ride Cancelled");

    } catch (error) {

      console.log(error);

      toast.error("Cancellation Failed");

    }

  };

  const statusColor = {

    accepted: "bg-blue-500",

    arrived: "bg-yellow-500",

    started: "bg-green-500",

    completed: "bg-emerald-500"

  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      className="
      ridex-card
      p-6
      mb-6
      "

    >

      {/* Header */}

      <div className="
      flex
      justify-between
      items-center
      mb-6
      ">

        <h2 className="
        text-2xl
        font-bold
        ">

          Your Rider

        </h2>

        <div
          className={`
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          text-white
          ${statusColor[ride.status] || "bg-zinc-700"}
          `}
        >

          {ride.status?.toUpperCase()}

        </div>

      </div>

      {/* Rider Details */}

      <div className="
      flex
      justify-between
      items-center
      ">

        <div className="
        flex
        gap-4
        items-center
        ">

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
          text-xl
          font-bold
          ">

            {

              ride.riderName

                ? ride.riderName.charAt(0).toUpperCase()

                : "R"

            }

          </div>

          <div>

            <h3 className="
            text-lg
            font-bold
            ">

              {

                ride.riderName ||

                ride.riderEmail?.split("@")[0] ||

                "Rider"

              }

            </h3>

            <div className="
            flex
            items-center
            gap-2
            text-zinc-400
            mt-1
            ">

              <Bike size={16} />

              <span>

                {

                  ride.vehicleNumber ||

                  "Vehicle Not Available"

                }

              </span>

            </div>

            {

              ride.vehicleModel && (

                <p className="
                text-zinc-500
                text-sm
                mt-1
                ">

                  {ride.vehicleModel}

                </p>

              )

            }

            <div className="
            flex
            items-center
            gap-1
            text-yellow-400
            mt-2
            ">

              <Star size={14} />

              <span>

                4.9

              </span>

            </div>

          </div>

        </div>

        {/* Call & Message */}

        <div className="
        flex
        gap-3
        ">

          <a

            href={`tel:${ride.riderPhone || ""}`}

            className="
            w-12
            h-12
            rounded-2xl
            bg-zinc-800
            hover:bg-zinc-700
            transition-all
            flex
            items-center
            justify-center
            "

          >

            <Phone />

          </a>

          <button

            className="
            w-12
            h-12
            rounded-2xl
            bg-zinc-800
            hover:bg-zinc-700
            transition-all
            flex
            items-center
            justify-center
            "

          >

            <MessageCircle />

          </button>

        </div>

      </div>

      {/* Ride Safety */}

      <div className="
      mt-6
      bg-green-500/10
      border
      border-green-500/20
      rounded-2xl
      p-4
      flex
      items-center
      gap-3
      ">

        <ShieldCheck
          className="
          text-green-400
          "
        />

        <div>

          <p className="
          font-semibold
          ">

            Ride Verified

          </p>

          <p className="
          text-sm
          text-zinc-400
          ">

            Your rider has accepted the trip.

          </p>

        </div>

      </div>

      {/* Fare */}

      <div className="
      mt-5
      bg-zinc-800
      rounded-2xl
      p-4
      flex
      justify-between
      items-center
      ">

        <span className="
        text-zinc-400
        ">

          Ride Fare

        </span>

        <span className="
        text-2xl
        font-bold
        text-yellow-400
        ">

          ₹{ride.fare || 0}

        </span>

      </div>

      {/* Cancel */}

      {

        ride.status !== "started"

        &&

        ride.status !== "completed"

        && (

          <button

            onClick={handleCancel}

            className="
            mt-6
            w-full
            bg-red-500
            hover:bg-red-600
            transition-all
            py-3
            rounded-2xl
            font-bold
            "

          >

            Cancel Ride

          </button>

        )

      }

    </motion.div>

  );

};

export default ActiveRideCardV2;