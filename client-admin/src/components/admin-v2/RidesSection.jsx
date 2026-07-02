import { useState } from "react";

import { motion } from "framer-motion";

import {
  Search,
  MapPin,
  User,
  Bike,
  IndianRupee
} from "lucide-react";

const RidesSection = ({ rides }) => {

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("all");

  const filteredRides =
    rides

      .filter((ride) => {

        const matchesSearch =

          ride.pickup
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          ride.drop
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          ride.customerName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =

          statusFilter === "all"

          ||

          ride.status ===
            statusFilter;

        return (
          matchesSearch
          &&
          matchesStatus
        );

      })

      .sort(
        (a, b) =>
          b.createdAt - a.createdAt
      );

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="
      flex
      flex-col
      lg:flex-row
      gap-4
      ">

        <div className="
        flex-1
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        px-5
        py-4
        flex
        items-center
        gap-3
        ">

          <Search
            className="
            text-yellow-400
            "
          />

          <input

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="
            Search rides...
            "

            className="
            bg-transparent
            outline-none
            w-full
            "

          />

        </div>

        <select

          value={statusFilter}

          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }

          className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          px-5
          py-4
          "

        >

          <option value="all">
            All
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="accepted">
            Accepted
          </option>

          <option value="started">
            Started
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="cancelled">
            Cancelled
          </option>

        </select>

      </div>

      {/* Ride Cards */}

      {

        filteredRides.length === 0

        ?

        (

          <div className="
          dashboard-card
          text-center
          py-16
          ">

            <h2 className="
            text-2xl
            font-bold
            ">

              No Rides Found

            </h2>

          </div>

        )

        :

        (

          <div className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          ">

            {

              filteredRides.map(

                (ride) => (

                  <motion.div

                    key={ride.id}

                    whileHover={{
                      y: -5
                    }}

                    className="
                    dashboard-card
                    "

                  >

                    {/* Locations */}

                    <div className="
                    flex
                    gap-4
                    ">

                      <div className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-yellow-400/10
                      flex
                      items-center
                      justify-center
                      ">

                        <MapPin
                          className="
                          text-yellow-400
                          "
                        />

                      </div>

                      <div>

                        <h3 className="
                        text-lg
                        font-bold
                        ">

                          {ride.pickup}

                        </h3>

                        <p className="
                        text-zinc-400
                        ">

                          To {ride.drop}

                        </p>

                      </div>

                    </div>

                    {/* Details */}

                    <div className="
                    grid
                    grid-cols-2
                    gap-4
                    mt-6
                    ">

                      <div className="
                      bg-zinc-800/60
                      rounded-2xl
                      p-4
                      ">

                        <div className="
                        flex
                        gap-2
                        items-center
                        text-zinc-400
                        text-sm
                        ">

                          <User size={16} />

                          Customer

                        </div>

                        <h3 className="
                        mt-2
                        font-semibold
                        ">

                          {

                            ride.customerName

                            ||

                            "N/A"

                          }

                        </h3>

                      </div>

                      <div className="
                      bg-zinc-800/60
                      rounded-2xl
                      p-4
                      ">

                        <div className="
                        flex
                        gap-2
                        items-center
                        text-zinc-400
                        text-sm
                        ">

                          <Bike size={16} />

                          Rider

                        </div>

                        <h3 className="
                        mt-2
                        font-semibold
                        ">

                          {

                            ride.riderName

                            ||

                            "Unassigned"

                          }

                        </h3>

                      </div>

                    </div>

                    {/* Footer */}

                    <div className="
                    flex
                    justify-between
                    items-center
                    mt-6
                    ">

                      <div className="
                      flex
                      items-center
                      gap-2
                      text-yellow-400
                      font-bold
                      text-xl
                      ">

                        <IndianRupee />

                        {ride.fare || 0}

                      </div>

                      <span className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold

                        ${

                          ride.status ===
                          "completed"

                          ?

                          "bg-green-500/20 text-green-400"

                          :

                          ride.status ===
                          "cancelled"

                          ?

                          "bg-red-500/20 text-red-400"

                          :

                          ride.status ===
                          "started"

                          ?

                          "bg-blue-500/20 text-blue-400"

                          :

                          "bg-yellow-500/20 text-yellow-400"

                        }
                      `}>

                        {ride.status}

                      </span>

                    </div>

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

export default RidesSection;