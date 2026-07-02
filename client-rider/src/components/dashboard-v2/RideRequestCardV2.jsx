import { motion } from "framer-motion";

const RideRequestCardV2 = ({
  ride,
  onAccept,
  onReject
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
      mb-5
      "

    >

      <h2 className="
      text-xl
      font-bold
      mb-4
      ">

        New Ride Request

      </h2>

      <div className="space-y-3">

        <div>

          <p className="
          text-zinc-400
          text-sm
          ">

            Customer

          </p>

          <h3 className="
          font-semibold
          ">

            {
              ride.customerName ||
              "Customer"
            }

          </h3>

        </div>

        <div>

          <p className="
          text-zinc-400
          text-sm
          ">

            Pickup

          </p>

          <h3>

            {ride.pickup}

          </h3>

        </div>

        <div>

          <p className="
          text-zinc-400
          text-sm
          ">

            Drop

          </p>

          <h3>

            {ride.drop}

          </h3>

        </div>

        <div className="
        flex
        justify-between
        items-center
        mt-3
        ">

          <div>

            <p className="
            text-zinc-400
            text-sm
            ">

              Fare

            </p>

            <h3 className="
            text-yellow-400
            text-xl
            font-bold
            ">

              ₹{ride.fare}

            </h3>

          </div>

        </div>

      </div>

      <div className="
      grid
      grid-cols-2
      gap-3
      mt-6
      ">

        <button

          onClick={() =>
            onReject(ride.id)
          }

          className="
          py-3
          rounded-2xl
          bg-red-500
          font-bold
          "

        >

          Reject

        </button>

        <button

          onClick={() =>
            onAccept(ride.id)
          }

          className="
          py-3
          rounded-2xl
          bg-yellow-400
          text-black
          font-bold
          "

        >

          Accept

        </button>

      </div>

    </motion.div>

  );

};

export default RideRequestCardV2;