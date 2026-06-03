import TopNavbar from "../components/dashboard/TopNavbar";
import OnlineToggle from "../components/dashboard/OnlineToggle";
import EarningsCard from "../components/dashboard/EarningsCard";
import RideRequestCard from "../components/dashboard/RideRequestCard";
import BottomNavbar from "../components/dashboard/BottomNavbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">

      <TopNavbar />

      <OnlineToggle />

      <EarningsCard />

      <div>
        <h3 className="text-xl font-semibold mb-4">
          Ride Requests
        </h3>

        <RideRequestCard
          pickup="Brodipet"
          drop="Lakshmipuram"
        />

        <RideRequestCard
          pickup="Auto Nagar"
          drop="Railway Station"
        />
      </div>

      <BottomNavbar />

    </div>
  );
};

export default Dashboard;