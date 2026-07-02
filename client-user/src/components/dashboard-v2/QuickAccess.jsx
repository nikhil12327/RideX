import {
  Home,
  Building2,
  Star
} from "lucide-react";

import { motion }
from "framer-motion";

import {
  useNavigate
} from "react-router-dom";

const QuickAccess = () => {

  const navigate =
    useNavigate();

  const places = [

    {
      title: "Home",
      icon: Home,
      action: () =>
        navigate("/dashboard")
    },

    {
      title: "History",
      icon: Building2,
      action: () =>
        navigate("/history")
    },

    {
      title: "Favorites",
      icon: Star,
      action: () =>
        navigate("/favorites")
    }

  ];

  return (

    <div className="mb-6">

      <h2 className="
      ridex-section-label
      ">

        QUICK ACCESS

      </h2>

      <div className="
      grid
      grid-cols-3
      gap-4
      ">

        {

          places.map(

            (place, index) => {

              const Icon =
                place.icon;

              return (

                <motion.div

                  key={place.title}

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
                      index * 0.1
                  }}

                  whileHover={{
                    scale: 1.05
                  }}

                  whileTap={{
                    scale: 0.95
                  }}

                  onClick={
                    place.action
                  }

                  className="
                  ridex-card
                  p-5
                  flex
                  flex-col
                  items-center
                  gap-3
                  cursor-pointer
                  "

                >

                  <Icon

                    size={28}

                    className="
                    text-yellow-400
                    "

                  />

                  <p className="
                  text-sm
                  font-medium
                  ">

                    {place.title}

                  </p>

                </motion.div>

              );

            }

          )

        }

      </div>

    </div>

  );

};

export default QuickAccess;