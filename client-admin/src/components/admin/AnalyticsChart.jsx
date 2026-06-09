import {
    Bar,
  } from "react-chartjs-2";
  
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  
  const AnalyticsChart = ({
    stats,
  }) => {
  
    const data = {
  
      labels: [
        "Pending",
        "Active",
        "Completed",
      ],
  
      datasets: [
  
        {
  
          label:
            "Ride Statistics",
  
          data: [
  
            stats.pendingRides,
  
            stats.activeRides,
  
            stats.completedRides,
  
          ],
  
        },
  
      ],
  
    };
  
    return (
  
      <div className="bg-zinc-900 p-4 rounded-xl mt-8">
  
        <h2 className="text-2xl font-bold mb-4">
  
          Ride Analytics
  
        </h2>
  
        <Bar data={data} />
  
      </div>
  
    );
  
  };
  
  export default AnalyticsChart;