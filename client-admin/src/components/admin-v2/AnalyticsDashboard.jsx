import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend
} from "recharts";

const COLORS = [
  "#22c55e",
  "#facc15",
  "#3b82f6",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4"
];

const AnalyticsDashboard = ({
  rides = [],
  riders = []
}) => {

  // ==========================
  // Time Filter
  // ==========================

  const [filter, setFilter] =
    useState("30");

  // ==========================
  // Filtered Rides
  // ==========================

  const filteredRides = useMemo(() => {

    if (filter === "all") {

      return rides;

    }

    const now = Date.now();

    const days =
      Number(filter);

    return rides.filter((ride) => {

      const rideDate =
        ride.completedAt ||
        ride.createdAt;

      return (

        now - rideDate <=

        days *

        24 *

        60 *

        60 *

        1000

      );

    });

  }, [

    rides,

    filter

  ]);

  // ==========================
  // Revenue Trend
  // ==========================

  const revenueData =
    useMemo(() => {

      const revenueMap = {};

      filteredRides

        .filter(

          ride =>

            ride.status === "completed"

            &&

            ride.paymentDone

        )

        .forEach((ride) => {

          const date =
            new Date(

              ride.completedAt ||

              ride.createdAt

            );

          let key;
          let label;

          if (

            filter === "all"

          ) {

            key =

              `${date.getFullYear()}-${date.getMonth()}`;

            label =
              date.toLocaleString(

                "en-IN",

                {

                  month: "short"

                }

              );

          }

          else {

            key =
              date.toISOString()

                .split("T")[0];

            label =
              date.toLocaleDateString(

                "en-IN",

                {

                  day: "2-digit",

                  month: "short"

                }

              );

          }

          if (

            !revenueMap[key]

          ) {

            revenueMap[key] = {

              date: label,

              revenue: 0,

              sort:

                date.getTime()

            };

          }

          revenueMap[key].revenue +=

            Number(

              ride.fare ||

              0

            );

        });

      return Object.values(

        revenueMap

      )

      .sort(

        (a, b) =>

          a.sort -

          b.sort

      );

    }, [

      filteredRides,

      filter

    ]);

  // ==========================
  // Daily Ride Activity
  // ==========================

  const dailyRideData =
    useMemo(() => {

      const rideMap = {};

      filteredRides

        .forEach((ride) => {

          const date =
            new Date(

              ride.createdAt

            );

          let key;
          let label;

          if (

            filter === "all"

          ) {

            key =
              `${date.getFullYear()}-${date.getMonth()}`;

            label =
              date.toLocaleString(

                "en-IN",

                {

                  month: "short"

                }

              );

          }

          else {

            key =
              date.toISOString()

              .split("T")[0];

            label =
              date.toLocaleDateString(

                "en-IN",

                {

                  day: "2-digit",

                  month: "short"

                }

              );

          }

          if (

            !rideMap[key]

          ) {

            rideMap[key] = {

              date: label,

              rides: 0,

              sort:

                date.getTime()

            };

          }

          rideMap[key].rides++;

        });

      return Object.values(

        rideMap

      )

      .sort(

        (a, b) =>

          a.sort -

          b.sort

      );

    }, [

      filteredRides,

      filter

    ]);

  // ==========================
  // Ride Status
  // ==========================

  const rideStatusData =
    useMemo(() => [

      {

        name: "Completed",

        value:

          filteredRides.filter(

            ride =>

              ride.status ===

              "completed"

          ).length

      },

      {

        name: "Pending",

        value:

          filteredRides.filter(

            ride =>

              ride.status ===

              "pending"

          ).length

      },

      {

        name: "Accepted",

        value:

          filteredRides.filter(

            ride =>

              ride.status ===

              "accepted"

          ).length

      },

      {

        name: "Started",

        value:

          filteredRides.filter(

            ride =>

              ride.status === "started"

              ||

              ride.status === "arrived"

          ).length

      },

      {

        name: "Cancelled",

        value:

          filteredRides.filter(

            ride =>

              ride.status ===

              "cancelled"

          ).length

      }

    ]

    .filter(

      item =>

        item.value > 0

    ),

    [

      filteredRides

    ]

  );

  // ==========================
  // Top Riders
  // ==========================

  const topRiders =
    [...riders]

      .sort(

        (a, b) =>

          (

            b.completedRides ||

            0

          )

          -

          (

            a.completedRides ||

            0

          )

      )

      .slice(0, 5);
    
      return (

        <div className="space-y-8">
      
          {/* ========================= */}
          {/* Analytics Header */}
          {/* ========================= */}
      
          <div className="
      
          flex
      
          flex-col
      
          md:flex-row
      
          md:items-center
      
          md:justify-between
      
          gap-5
      
          ">
      
            <div>
      
              <h1 className="
      
              text-3xl
      
              font-bold
      
              ">
      
                Platform Analytics
      
              </h1>
      
              <p className="
      
              text-zinc-400
      
              mt-2
      
              ">
      
                Revenue, rides and platform insights
      
              </p>
      
            </div>
      
            <select
      
              value={filter}
      
              onChange={(e)=>
      
                setFilter(
      
                  e.target.value
      
                )
      
              }
      
              className="
      
              bg-zinc-900
      
              border
      
              border-zinc-700
      
              rounded-2xl
      
              px-5
      
              py-3
      
              outline-none
      
              "
      
            >
      
              <option value="7">
      
                Last 7 Days
      
              </option>
      
              <option value="30">
      
                Last 30 Days
      
              </option>
      
              <option value="90">
      
                Last 90 Days
      
              </option>
      
              <option value="365">
      
                This Year
      
              </option>
      
              <option value="all">
      
                All Time
      
              </option>
      
            </select>
      
          </div>
      
          {/* ========================= */}
          {/* KPI Cards */}
          {/* ========================= */}
      
          <div className="
      
          grid
      
          grid-cols-2
      
          xl:grid-cols-4
      
          gap-5
      
          ">
      
            <div className="dashboard-card">
      
              <p className="
      
              text-zinc-400
      
              ">
      
                Total Revenue
      
              </p>
      
              <h1 className="
      
              text-4xl
      
              font-bold
      
              mt-4
      
              text-yellow-400
      
              ">
      
                ₹{
      
                  revenueData
      
                    .reduce(
      
                      (
      
                        total,
      
                        item
      
                      )=>
      
                        total+
      
                        item.revenue,
      
                      0
      
                    )
      
                }
      
              </h1>
      
            </div>
      
            <div className="dashboard-card">
      
              <p className="text-zinc-400">
      
                Total Rides
      
              </p>
      
              <h1 className="
      
              text-4xl
      
              font-bold
      
              mt-4
      
              ">
      
                {
      
                  filteredRides.length
      
                }
      
              </h1>
      
            </div>
      
            <div className="dashboard-card">
      
              <p className="text-zinc-400">
      
                Completed
      
              </p>
      
              <h1 className="
      
              text-4xl
      
              font-bold
      
              mt-4
      
              text-green-400
      
              ">
      
                {
      
                  rideStatusData.find(
      
                    item=>
      
                      item.name===
      
                      "Completed"
      
                  )?.value || 0
      
                }
      
              </h1>
      
            </div>
      
            <div className="dashboard-card">
      
              <p className="text-zinc-400">
      
                Active Riders
      
              </p>
      
              <h1 className="
      
              text-4xl
      
              font-bold
      
              mt-4
      
              text-blue-400
      
              ">
      
                {riders.length}
      
              </h1>
      
            </div>
      
          </div>
      
          {/* ========================= */}
          {/* Charts Row */}
          {/* ========================= */}
      
          <div className="
      
          grid
      
          xl:grid-cols-2
      
          gap-6
      
          ">
      
            {/* Revenue */}
      
            <div className="dashboard-card">
      
              <h2 className="
      
              text-2xl
      
              font-bold
      
              mb-6
      
              ">
      
                Revenue Trend
      
              </h2>
      
              <div className="h-[380px]">
      
                <ResponsiveContainer>
      
                  <LineChart
      
                    data={revenueData}
      
                  >
      
                    <CartesianGrid
      
                      stroke="#27272a"
      
                    />
      
                    <XAxis
      
                      dataKey="date"
      
                      interval={0}
      
                      angle={-45}
      
                      textAnchor="end"
      
                      height={70}
      
                    />
      
                    <YAxis/>
      
                    <Tooltip/>
      
                    <Legend/>
      
                    <Line
      
                      type="monotone"
      
                      dataKey="revenue"
      
                      stroke="#facc15"
      
                      strokeWidth={4}
      
                      dot={{
      
                        r:5
      
                      }}
      
                    />
      
                  </LineChart>
      
                </ResponsiveContainer>
      
              </div>
      
            </div>
      
            {/* Ride Status */}
      
            <div className="dashboard-card">
      
              <h2 className="
      
              text-2xl
      
              font-bold
      
              mb-6
      
              ">
      
                Ride Status
      
              </h2>
      
              <div className="h-[380px]">
      
                <ResponsiveContainer>
      
                  <PieChart>
      
                    <Pie
      
                      data={rideStatusData}
      
                      dataKey="value"
      
                      nameKey="name"
      
                      outerRadius={120}
      
                      label
      
                    >
      
                      {
      
                        rideStatusData.map(
      
                          (
      
                            _,
      
                            index
      
                          )=>(
      
                            <Cell
      
                              key={index}
      
                              fill={
      
                                COLORS[
      
                                  index %
      
                                  COLORS.length
      
                                ]
      
                              }
      
                            />
      
                          )
      
                        )
      
                      }
      
                    </Pie>
      
                    <Legend/>
      
                    <Tooltip/>
      
                  </PieChart>
      
                </ResponsiveContainer>
      
              </div>
      
            </div>
      
          </div>    

              {/* ========================= */}
    {/* Bottom Analytics */}
    {/* ========================= */}

    <div className="grid xl:grid-cols-2 gap-6">

{/* Daily Ride Activity */}

<div className="dashboard-card">

  <h2 className="text-2xl font-bold mb-6">

    Daily Ride Activity

  </h2>

  <div className="h-[380px]">

    <ResponsiveContainer>

      <BarChart data={dailyRideData}>

        <CartesianGrid stroke="#27272a" />

        <XAxis

          dataKey="date"

          interval={0}

          angle={-45}

          textAnchor="end"

          height={70}

        />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar

          dataKey="rides"

          fill="#facc15"

          radius={[8, 8, 0, 0]}

        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

{/* Top Riders */}

<div className="dashboard-card">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-bold">

      Top Riders

    </h2>

    <span className="text-zinc-500">

      Top 5

    </span>

  </div>

  <div className="space-y-4">

    {

      topRiders.length > 0

      ?

      topRiders.map((rider, index) => (

        <div

          key={rider.id}

          className="

          bg-zinc-800

          hover:bg-zinc-700

          transition-all

          rounded-2xl

          p-5

          flex

          justify-between

          items-center

          "

        >

          <div className="flex items-center gap-4">

            <div

              className="

              w-12

              h-12

              rounded-full

              bg-yellow-400

              text-black

              flex

              items-center

              justify-center

              font-bold

              "

            >

              #{index + 1}

            </div>

            <div>

              <h3 className="font-semibold">

                {rider.name || "Unknown Rider"}

              </h3>

              <p className="text-zinc-400 text-sm">

                {rider.email}

              </p>

            </div>

          </div>

          <div className="text-right">

            <h2 className="text-yellow-400 font-bold text-xl">

              {rider.completedRides || 0}

            </h2>

            <p className="text-zinc-400 text-sm">

              Completed

            </p>

          </div>

        </div>

      ))

      :

      <div className="text-center py-16 text-zinc-500">

        No Riders Available

      </div>

    }

  </div>

</div>

</div>

{/* ========================= */}
{/* Platform Summary */}
{/* ========================= */}

<div className="dashboard-card">

<h2 className="text-2xl font-bold mb-8">

  Platform Summary

</h2>

<div className="grid md:grid-cols-4 gap-6">

  <div>

    <p className="text-zinc-400">

      Total Riders

    </p>

    <h1 className="text-3xl font-bold mt-2">

      {riders.length}

    </h1>

  </div>

  <div>

    <p className="text-zinc-400">

      Total Rides

    </p>

    <h1 className="text-3xl font-bold mt-2">

      {rides.length}

    </h1>

  </div>

  <div>

    <p className="text-zinc-400">

      Completed

    </p>

    <h1 className="text-3xl font-bold mt-2 text-green-400">

      {

        rides.filter(

          ride =>

            ride.status === "completed"

        ).length

      }

    </h1>

  </div>

  <div>

    <p className="text-zinc-400">

      Cancelled

    </p>

    <h1 className="text-3xl font-bold mt-2 text-red-400">

      {

        rides.filter(

          ride =>

            ride.status === "cancelled"

        ).length

      }

    </h1>

  </div>

</div>

</div>

</div>

);

};

export default AnalyticsDashboard;