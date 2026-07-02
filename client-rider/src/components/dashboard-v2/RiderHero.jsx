import { motion } from "framer-motion";
import {
  IndianRupee,
  Bike
} from "lucide-react";

const RiderHero = ({
  riderName,
  earnings,
  completedRides
}) => {

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
      bg-gradient-to-r
      from-yellow-400
      to-orange-500
      rounded-[32px]
      p-6
      text-black
      mb-6
      "

    >

      <h1 className="
      text-3xl
      font-bold
      ">

        Welcome,

        {" "}

        {riderName}

      </h1>

      <div className="
      grid
      grid-cols-2
      gap-4
      mt-6
      ">

        <div className="
        bg-white/20
        rounded-2xl
        p-4
        ">

          <div className="
          flex
          items-center
          gap-2
          ">

            <IndianRupee />

            <span>

              Earnings

            </span>

          </div>

          <h2 className="
          text-3xl
          font-bold
          mt-2
          ">

            ₹{earnings}

          </h2>

        </div>

        <div className="
        bg-white/20
        rounded-2xl
        p-4
        ">

          <div className="
          flex
          items-center
          gap-2
          ">

            <Bike />

            <span>

              Completed

            </span>

          </div>

          <h2 className="
          text-3xl
          font-bold
          mt-2
          ">

            {completedRides}

          </h2>

        </div>

      </div>

    </motion.div>

  );

};

export default RiderHero;