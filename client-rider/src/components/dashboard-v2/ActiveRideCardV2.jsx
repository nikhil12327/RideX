import { motion } from "framer-motion";

const ActiveRideCardV2 = ({
  ride,
  onArrive,
  onStart,
  onComplete
}) => {

  if (!ride) return null;

  return (

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
      ridex-card
      p-5
      mb-6
      "

    >

      <h2 className="
      text-2xl
      font-bold
      mb-5
      ">

        Active Ride

      </h2>

      <div className="space-y-4">

        <div>

          <p className="text-zinc-400">
            Customer
          </p>

          <h3 className="font-bold">
            {ride.customerName}
          </h3>

        </div>

        <div>

          <p className="text-zinc-400">
            Pickup
          </p>

          <h3>
            {ride.pickup}
          </h3>

        </div>

        <div>

          <p className="text-zinc-400">
            Drop
          </p>

          <h3>
            {ride.drop}
          </h3>

        </div>

        <div>

          <p className="text-zinc-400">
            Fare
          </p>

          <h3 className="
          text-yellow-400
          text-2xl
          font-bold
          ">

            ₹{ride.fare}

          </h3>

        </div>

      </div>

      {

        ride.status === "accepted" && (

          <button

            onClick={() =>
              onArrive(ride.id)
            }

            className="
            w-full
            mt-6
            py-3
            rounded-2xl
            bg-blue-500
            font-bold
            "

          >

            Arrived at Pickup

          </button>

        )

      }

      {

        ride.status === "arrived" && (

          <button

            onClick={() =>
              onStart(ride.id)
            }

            className="
            w-full
            mt-6
            py-3
            rounded-2xl
            bg-yellow-400
            text-black
            font-bold
            "

          >

            Start Ride

          </button>

        )

      }

      {

        ride.status === "started" && (

          <button

            onClick={() =>
              onComplete(ride.id)
            }

            className="
            w-full
            mt-6
            py-3
            rounded-2xl
            bg-green-500
            font-bold
            "

          >

            Complete Ride

          </button>

        )

      }

    </motion.div>

  );

};

export default ActiveRideCardV2;