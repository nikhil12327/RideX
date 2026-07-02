import {
  Home,
  Clock3,
  User,
  Wallet
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

const BottomNavV2 = () => {

  const navigate = useNavigate();

  const location = useLocation();

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
      title: "Wallet",
      icon: Wallet,
      path: "/wallet"
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
    shadow-2xl
    z-50
    ">

      {

        items.map((item) => {

          const Icon = item.icon;

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

export default BottomNavV2;