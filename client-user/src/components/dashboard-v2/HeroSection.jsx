import { motion } from "framer-motion";

import {
  Bell,
  MapPin
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

const HeroSection = ({
  userName
}) => {

  const navigate =
    useNavigate();

  const hour =
    new Date().getHours();

  let greeting =
    "Good Evening";

  if (hour < 12)
    greeting =
      "Good Morning";

  else if (hour < 18)
    greeting =
      "Good Afternoon";

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 40
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.6
      }}

      className="
      bg-gradient-to-r
      from-yellow-400
      to-orange-500
      rounded-[32px]
      p-6
      shadow-2xl
      text-black
      mb-6
      "

    >

      <div className="
      flex
      justify-between
      items-center
      ">

        <div>

          <p className="
          font-medium
          text-sm
          ">

            {greeting}

          </p>

          <h1 className="
          text-3xl
          font-bold
          mt-2
          ">

            {userName}

          </h1>

        </div>

        <button

          onClick={() =>
            navigate(
              "/notifications"
            )
          }

          className="
          w-12
          h-12
          rounded-2xl
          bg-white/20
          flex
          items-center
          justify-center
          "

        >

          <Bell size={22} />

        </button>

      </div>

      <div className="
      flex
      items-center
      gap-2
      mt-5
      ">

        <MapPin size={18} />

        <span className="
        text-sm
        ">

          Ready for your next ride

        </span>

      </div>

    </motion.div>

  );

};

export default HeroSection;