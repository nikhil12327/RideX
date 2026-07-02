import { motion } from "framer-motion";
import {
  UserRound,
  Calendar,
  Car,
  IndianRupee
} from "lucide-react";

const CustomerManagement = ({
  customers
}) => {

  if (!customers?.length) {

    return (

      <div className="
      dashboard-card
      text-center
      py-20
      ">

        <UserRound
          size={50}
          className="
          mx-auto
          text-zinc-600
          mb-4
          "
        />

        <h2 className="
        text-2xl
        font-bold
        ">

          No Customers Found

        </h2>

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h2 className="
        text-3xl
        font-bold
        text-white
        ">

          Customer Management

        </h2>

        <p className="
        text-zinc-400
        mt-2
        ">

          Manage all platform customers

        </p>

      </div>

      <div className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-6
      ">

        {

          customers.map((customer) => (

            <motion.div

              key={customer.id}

              whileHover={{
                y: -5
              }}

              className="
              dashboard-card
              "

            >

              <div className="
              flex
              gap-4
              ">

                <div className="
                w-16
                h-16
                rounded-full
                bg-yellow-400
                flex
                items-center
                justify-center
                text-black
                text-2xl
                font-bold
                ">

                  {

                    customer.name
                      ?.charAt(0)
                      ?.toUpperCase()

                  }

                </div>

                <div>

                  <h3 className="
                  text-xl
                  font-semibold
                  ">

                    {customer.name}

                  </h3>

                  <p className="
                  text-zinc-400
                  ">

                    {customer.email}

                  </p>

                </div>

              </div>

              <div className="
              mt-6
              grid
              grid-cols-2
              gap-4
              ">

                <div className="
                bg-zinc-800/60
                rounded-2xl
                p-4
                ">

                  <div className="
                  flex
                  items-center
                  gap-2
                  text-zinc-400
                  text-sm
                  ">

                    <Car size={16} />

                    Total Rides

                  </div>

                  <h3 className="
                  text-2xl
                  font-bold
                  mt-2
                  ">

                    {customer.totalRides || 0}

                  </h3>

                </div>

                <div className="
                bg-zinc-800/60
                rounded-2xl
                p-4
                ">

                  <div className="
                  flex
                  items-center
                  gap-2
                  text-zinc-400
                  text-sm
                  ">

                    <IndianRupee size={16} />

                    Total Spent

                  </div>

                  <h3 className="
                  text-2xl
                  font-bold
                  mt-2
                  ">

                    ₹{customer.totalSpent || 0}

                  </h3>

                </div>

              </div>

              <div className="
              mt-6
              flex
              items-center
              gap-2
              text-zinc-500
              text-sm
              ">

                <Calendar size={16} />

                Joined:

                {

                  customer.createdAt

                  ?

                  new Date(
                    customer.createdAt
                  ).toLocaleDateString()

                  :

                  "N/A"

                }

              </div>

            </motion.div>

          ))

        }

      </div>

    </div>

  );

};

export default CustomerManagement;