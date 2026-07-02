import { useMemo } from "react";

import {
  Bike,
  User,
  CreditCard,
  CheckCircle,
  Clock
} from "lucide-react";

const ActivityTimeline = ({

  rides = [],

  riders = [],

  customers = []

}) => {

  const activities = useMemo(() => {

    const list = [];

    // ============================
    // Ride Activities
    // ============================

    rides.forEach((ride) => {

      // Ride Booked

      if (ride.createdAt) {

        list.push({

          id: `${ride.id}-booked`,

          time: ride.createdAt,

          icon: Clock,

          color: "text-yellow-400",

          title:

            `${ride.customerName || "Customer"} booked a ride`

        });

      }

      // Ride Accepted

      if (ride.acceptedAt) {

        list.push({

          id: `${ride.id}-accepted`,

          time: ride.acceptedAt,

          icon: Bike,

          color: "text-blue-400",

          title:

            `${ride.riderName || "Rider"} accepted the ride`

        });

      }

      // Ride Completed

      if (ride.completedAt) {

        list.push({

          id: `${ride.id}-completed`,

          time: ride.completedAt,

          icon: CheckCircle,

          color: "text-green-400",

          title:

            `Ride completed • ₹${ride.fare || 0}`

        });

      }

      // Wallet Payment

      if (

        ride.paymentDone &&

        ride.paymentTime

      ) {

        list.push({

          id: `${ride.id}-payment`,

          time: ride.paymentTime,

          icon: CreditCard,

          color: "text-purple-400",

          title:

            `Wallet payment received • ₹${ride.fare || 0}`

        });

      }

    });

    // ============================
    // New Customers
    // ============================

    customers.forEach((customer) => {

      if (customer.createdAt) {

        list.push({

          id: customer.id,

          time: customer.createdAt,

          icon: User,

          color: "text-cyan-400",

          title:

            `${customer.name || customer.email} joined RideX`

        });

      }

    });

    // ============================
    // New Riders
    // ============================

    riders.forEach((rider) => {

      if (rider.createdAt) {

        list.push({

          id: rider.id,

          time: rider.createdAt,

          icon: Bike,

          color: "text-orange-400",

          title:

            `${rider.name || rider.email} registered as rider`

        });

      }

    });

    // ============================
    // Latest First
    // ============================

    return list

      .sort(

        (a, b) =>

          b.time - a.time

      )

      .slice(0, 12);

  }, [

    rides,

    riders,

    customers

  ]);

  const formatTime = (time) => {

    return new Date(time).toLocaleString(

      "en-IN",

      {

        day: "2-digit",

        month: "short",

        hour: "2-digit",

        minute: "2-digit"

      }

    );

  };

  return (

    <div

      className="
      dashboard-card
      "

    >

      <div className="

      flex

      justify-between

      items-center

      mb-6

      ">

        <h2 className="

        text-2xl

        font-bold

        ">

          Recent Activity

        </h2>

        <span className="

        text-sm

        text-zinc-400

        ">

          Live

        </span>

      </div>

      <div className="

      space-y-5

      max-h-[520px]

      overflow-y-auto

      pr-2

      ">

        {

          activities.length === 0 && (

            <div className="

            text-zinc-500

            text-center

            py-10

            ">

              No recent activity

            </div>

          )

        }

        {

          activities.map(

            (activity) => {

              const Icon = activity.icon;

              return (

                <div

                  key={activity.id}

                  className="

                  flex

                  items-start

                  gap-4

                  "

                >

                  <div

                    className="

                    w-11

                    h-11

                    rounded-full

                    bg-zinc-800

                    flex

                    items-center

                    justify-center

                    "

                  >

                    <Icon

                      size={18}

                      className={activity.color}

                    />

                  </div>

                  <div className="

                  flex-1

                  ">

                    <p className="

                    font-medium

                    text-white

                    leading-relaxed

                    ">

                      {activity.title}

                    </p>

                    <p className="

                    text-sm

                    text-zinc-500

                    mt-1

                    ">

                      {formatTime(activity.time)}

                    </p>

                  </div>

                </div>

              );

            }

          )

        }

      </div>

    </div>

  );

};

export default ActivityTimeline;