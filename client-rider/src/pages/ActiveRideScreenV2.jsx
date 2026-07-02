import { motion } from "framer-motion";

import {
  Phone,
  Navigation,
  User,
  Shield
} from "lucide-react";

const ActiveRideScreenV2 = () => {

  return (

    <div className="
    min-h-screen
    bg-gradient-to-b
    from-zinc-950
    via-black
    to-zinc-900
    text-white
    p-5
    ">

      <div className="
      h-72
      rounded-[32px]
      overflow-hidden
      mb-6
      bg-zinc-900
      border
      border-zinc-800
      flex
      items-center
      justify-center
      ">

        <p className="text-zinc-500">

          Live Navigation Map

        </p>

      </div>

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
        glass
        rounded-[32px]
        p-6
        "

      >

        <div className="
        flex
        justify-between
        items-center
        mb-6
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
            ">

              <User
                className="text-black"
              />

            </div>

            <div>

              <h2 className="
              text-xl
              font-bold
              ">

                Rahul Kumar

              </h2>

              <p className="
              text-zinc-400
              ">

                Customer

              </p>

            </div>

          </div>

          <button className="
          w-14
          h-14
          rounded-2xl
          bg-green-500
          flex
          items-center
          justify-center
          ">

            <Phone />

          </button>

        </div>

        <div className="
        space-y-4
        mb-6
        ">

          <div>

            <p className="
            text-zinc-400
            text-sm
            ">

              Pickup

            </p>

            <h3>

              Chirala Bus Stand

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

              Bapatla Railway Station

            </h3>

          </div>

        </div>

        <div className="
        flex
        gap-3
        ">

          <button className="
          flex-1
          ridex-btn-primary
          ">

            Arrived

          </button>

          <button className="
          flex-1
          bg-blue-500
          rounded-2xl
          py-4
          font-bold
          ">

            Start Ride

          </button>

        </div>

      </motion.div>

      <div className="
      glass
      rounded-3xl
      p-5
      mt-6
      flex
      gap-4
      items-center
      ">

        <Shield
          className="
          text-yellow-400
          "
        />

        <div>

          <p className="text-sm">

            Ride OTP

          </p>

          <h2 className="
          text-2xl
          font-bold
          ">

            4567

          </h2>

        </div>

      </div>

    </div>

  );

};

export default ActiveRideScreenV2;