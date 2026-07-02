import {
  Home,
  Clock3,
  Wallet,
  User
} from "lucide-react";

import { motion }
from "framer-motion";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

const BottomNavRider = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const items = [

    {
      title: "Home",
      icon: Home,
      path: "/dashboard"
    },

    {
      title: "History",
      icon: Clock3,
      path: "/history"
    },

    {
      title: "Earnings",
      icon: Wallet,
      path: "/earnings"
    },

    {
      title: "Profile",
      icon: User,
      path: "/profile"
    }

  ];

  return (

    <div className="
    fixed
    bottom-5
    left-4
    right-4
    bg-zinc-900/90
    backdrop-blur-xl
    border
    border-zinc-800
    rounded-3xl
    px-2
    py-3
    flex
    justify-around
    z-50
    shadow-2xl
    ">

      {

        items.map((item) => {

          const Icon =
            item.icon;

          const active =
            location.pathname ===
            item.path;

          return (

            <motion.div

              key={item.title}

              whileTap={{
                scale: 0.9
              }}

              onClick={() =>
                navigate(item.path)
              }

              className={`
              flex
              flex-col
              items-center
              gap-1
              cursor-pointer
              px-4
              py-2
              rounded-2xl

              ${
                active
                ? "text-yellow-400"
                : "text-zinc-400"
              }
              `}

            >

              <Icon size={22} />

              <span className="text-xs">

                {item.title}

              </span>

            </motion.div>

          );

        })

      }

    </div>

  );

};

export default BottomNavRider;