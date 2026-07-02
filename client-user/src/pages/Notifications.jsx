import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import BottomNavV2 from "../components/dashboard-v2/BottomNavV2";

const notifications = [

  {
    title: "Welcome to RideX",
    message:
      "Your account has been created successfully."
  },

  {
    title: "New Offer Available",
    message:
      "Get 20% off on your next ride."
  },

  {
    title: "Safety Reminder",
    message:
      "Always verify rider details before starting your ride."
  }

];

const Notifications = () => {

  return (

    <div className="
    min-h-screen
    bg-gradient-to-b
    from-zinc-950
    via-black
    to-zinc-900
    text-white
    p-5
    pb-32
    ">

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
        mb-8
        "

      >

        <h1 className="
        text-3xl
        font-bold
        ">

          Notifications

        </h1>

        <p className="
        text-zinc-400
        mt-2
        ">

          Latest updates and alerts

        </p>

      </motion.div>

      <div className="space-y-4">

        {

          notifications.map(

            (notification, index) => (

              <motion.div

                key={index}

                initial={{
                  opacity: 0,
                  y: 20
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                transition={{
                  delay: index * 0.1
                }}

                className="
                bg-zinc-900
                rounded-3xl
                p-5
                border
                border-zinc-800
                "

              >

                <div className="
                flex
                gap-4
                items-start
                ">

                  <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-yellow-400/10
                  flex
                  items-center
                  justify-center
                  ">

                    <Bell
                      className="
                      text-yellow-400
                      "
                    />

                  </div>

                  <div>

                    <h3 className="
                    font-semibold
                    mb-2
                    ">

                      {notification.title}

                    </h3>

                    <p className="
                    text-zinc-400
                    text-sm
                    ">

                      {notification.message}

                    </p>

                  </div>

                </div>

              </motion.div>

            )

          )

        }

      </div>

      <BottomNavV2 />

    </div>

  );

};

export default Notifications;