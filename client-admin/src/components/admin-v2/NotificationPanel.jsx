import { Bell } from "lucide-react";
import { motion } from "framer-motion";

const NotificationPanel = ({
  rides = [],
  riders = []
}) => {

  const notifications = [];

  // Pending Riders

  riders
    .filter(rider => !rider.isApproved)
    .forEach(rider => {

      notifications.push({
        id: rider.id,
        type: "rider",
        message:
          `${rider.name} waiting for approval`
      });

    });

  // Pending Rides

  rides
    .filter(ride =>
      ride.status === "pending"
    )
    .slice(0, 5)
    .forEach(ride => {

      notifications.push({
        id: ride.id,
        type: "ride",
        message:
          `New ride request from ${ride.customerName}`
      });

    });

  return (

    <div className="dashboard-card">

      <div className="
      flex
      items-center
      gap-3
      mb-6
      ">

        <Bell
          className="
          text-yellow-400
          "
        />

        <h2 className="
        text-2xl
        font-bold
        ">

          Notifications

        </h2>

      </div>

      {

        notifications.length === 0

        ?

        (

          <div className="
          text-zinc-400
          text-center
          py-10
          ">

            No Notifications

          </div>

        )

        :

        (

          <div className="space-y-4">

            {

              notifications.map(
                notification => (

                  <motion.div

                    key={notification.id}

                    initial={{
                      opacity: 0
                    }}

                    animate={{
                      opacity: 1
                    }}

                    className="
                    bg-zinc-800
                    rounded-2xl
                    p-4
                    "

                  >

                    {notification.message}

                  </motion.div>

                )
              )

            }

          </div>

        )

      }

    </div>

  );

};

export default NotificationPanel;