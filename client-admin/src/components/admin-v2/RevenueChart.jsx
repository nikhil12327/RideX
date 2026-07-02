import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
  } from "recharts";
  
  const RevenueChart = ({ rides }) => {
  
    // Only completed & paid rides
    const completedRides = rides.filter(
      ride =>
        ride.status === "completed" &&
        ride.paymentDone
    );
  
    // Revenue grouped by date
    const revenueMap = {};
  
    completedRides.forEach((ride) => {
  
      const date = new Date(
        ride.completedAt || ride.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
      });
  
      revenueMap[date] =
        (revenueMap[date] || 0) +
        Number(ride.fare || 0);
  
    });
  
    const chartData = Object.entries(revenueMap).map(
      ([date, revenue]) => ({
        date,
        revenue
      })
    );
  
    return (
  
      <div
        className="
        bg-zinc-900/80
        backdrop-blur-xl
        border
        border-zinc-800
        rounded-3xl
        p-6
        shadow-2xl
        mt-8
        "
      >
  
        <h2
          className="
          text-2xl
          font-bold
          mb-6
          "
        >
          Revenue Trend
        </h2>
  
        <div className="h-[350px]">
  
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
  
            <LineChart data={chartData}>
  
              <CartesianGrid
                stroke="#27272a"
              />
  
              <XAxis
                dataKey="date"
              />
  
              <YAxis />
  
              <Tooltip />
  
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#facc15"
                strokeWidth={3}
              />
  
            </LineChart>
  
          </ResponsiveContainer>
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default RevenueChart;