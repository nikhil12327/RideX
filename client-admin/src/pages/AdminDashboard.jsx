import {
    useEffect,
    useState,
  } from "react";
  import AnalyticsChart
  from "../components/admin/AnalyticsChart";

  import { getAuth } from "firebase/auth";

  import CustomerList
    from "../components/admin/CustomerList";
  
  import RideList
    from "../components/admin/RideList";
  
  import RiderList
    from "../components/admin/RiderList";
  
  import StatsCard
    from "../components/admin/StatsCard";
  
    import ReviewAnalytics
from "../components/admin/ReviewAnalytics";

import {
    getAllReviews,
  } from "../services/reviewService";

  import {
    getAllCustomers,
    getAllRiders,
    getDashboardStats,
  } from "../services/adminService";
  
  import {
    subscribeToRiders,
  } from "../services/adminRealtimeService";

  import {
    subscribeToRides,
  } from "../services/adminRealtimeService";
  
  const AdminDashboard = () => {

    const auth = getAuth();

console.log(
  "ADMIN AUTH USER:",
  auth.currentUser
);
  
    const [stats, setStats] =
      useState(null);
  
    const [riders, setRiders] =
      useState([]);
    
      const [search, setSearch] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("all");

    const [customers, setCustomers] =
      useState([]);
  
    const [rides, setRides] =
      useState([]);

      const [reviews, setReviews] =
  useState([]);
      
const exportCSV = () => {

    const headers = [
        "Customer",
        "Rider",
        "Pickup",
        "Drop",
        "Fare",
        "Status"
      ];
      
      const rows = rides.map((ride) => [

        ride.customerName || "",
      
        ride.riderName || "",
      
        ride.pickup || "",
      
        ride.drop || "",
      
        ride.fare || 0,
      
        ride.status || ""
      
      ]);
      
        const csvContent = [
      
          headers,
      
          ...rows,
      
        ]
          .map(
            (row) =>
              row.join(",")
          )
          .join("\n");
      
        const blob =
          new Blob(
            [csvContent],
            {
              type:
                "text/csv",
            }
          );
      
        const url =
          window.URL.createObjectURL(
            blob
          );
      
        const a =
          document.createElement(
            "a"
          );
      
        a.href = url;
      
        a.download =
          "rides-report.csv";
      
          a.click();

          window.URL.revokeObjectURL(
            url
          );
      
      };

      

      const filteredRides = rides.filter((ride) => {

        const matchesSearch =
      
          String(ride.pickup || "")
            .toLowerCase()
            .includes(search.toLowerCase())
      
          ||
      
          String(ride.drop || "")
            .toLowerCase()
            .includes(search.toLowerCase())
      
          ||
      
          String(ride.status || "")
            .toLowerCase()
            .includes(search.toLowerCase());
      
        const matchesStatus =
      
          statusFilter === "all"
            ? true
            : ride.status === statusFilter;
      
        return (
          matchesSearch &&
          matchesStatus
        );
      
      });

      const realtimeStats = stats
  ? {
      ...stats,

      totalRides:
        rides.length,

      pendingRides:
        rides.filter(
          ride =>
            ride.status === "pending"
        ).length,

      activeRides:
        rides.filter(
          ride =>
            [
              "accepted",
              "arrived",
              "started"
            ].includes(
              ride.status
            )
        ).length,

      completedRides:
        rides.filter(
          ride =>
            ride.status === "completed"
        ).length,

      totalRevenue:
        rides
          .filter(
            ride =>
              ride.status === "completed"
          )
          .reduce(
            (sum, ride) =>
              sum + (ride.fare || 0),
            0
          ),
    }
  : null;
       
  useEffect(() => {

    const loadData = async () => {
  
      try {
  
        const riderData =
          await getAllRiders();
  
        console.log(
          "RIDERS:",
          riderData
        );
  
        setRiders(
          riderData
        );
  
      } catch (error) {
  
        console.error(
          "RIDERS ERROR:",
          error
        );
  
      }
  
      try {
  
        const customerData =
          await getAllCustomers();
  
        console.log(
          "CUSTOMERS:",
          customerData
        );
  
        setCustomers(
          customerData
        );
  
      } catch (error) {
  
        console.error(
          "CUSTOMERS ERROR:",
          error
        );
  
      }
  
      try {
  
        const reviewData =
          await getAllReviews();
  
        console.log(
          "REVIEWS:",
          reviewData
        );
  
        setReviews(
          reviewData
        );
  
      } catch (error) {
  
        console.error(
          "REVIEWS ERROR:",
          error
        );
  
      }
  
      try {
  
        const statsData =
          await getDashboardStats();
  
        console.log(
          "STATS:",
          statsData
        );
  
        setStats(
          statsData
        );
  
      } catch (error) {
  
        console.error(
          "STATS ERROR:",
          error
        );
  
      }
  
    };
  
    loadData();
  
  }, []);
  
    useEffect(() => {

        const unsubscribe =
          subscribeToRiders(
            (riderData) => {
      
              setRiders(
                riderData
              );
      
            }
          );
      
        return () =>
          unsubscribe();
      
      }, []);

    useEffect(() => {
  
      const unsubscribe =
        subscribeToRides(
          (rideData) => {
  
            console.log(
              "Realtime Rides:",
              rideData
            );
  
            setRides(
              rideData
            );
  
          }
        );
  
      return () => {
  
        unsubscribe();
  
      };
  
    }, []);

    
 
  if (!stats) {

    return (
  
      <div className="min-h-screen bg-black text-white p-6">
  
        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>
  
        <div className="grid grid-cols-2 gap-4">
  
          {[...Array(7)].map((_, index) => (
  
            <div
              key={index}
              className="h-28 bg-zinc-800 rounded-xl animate-pulse"
            />
  
          ))}
  
        </div>
  
      </div>
  
    );
  
  }
  
  
  return (

    <div className="min-h-screen bg-black text-white p-6 pb-40">
  
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>
  
      <div className="mt-6 mb-6">
  
        <input
          type="text"
          placeholder="Search rides..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full p-3 rounded-xl text-black mb-4"
        />
  
        <div className="flex flex-wrap gap-2">
  
          {[
            "all",
            "pending",
            "accepted",
            "arrived",
            "started",
            "completed",
            "cancelled",
          ].map((status) => (
  
            <button
              key={status}
              onClick={() =>
                setStatusFilter(status)
              }
              className={`px-4 py-2 rounded-xl ${
                statusFilter === status
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-800"
              }`}
            >
  
              {status}
  
            </button>
  
          ))}
  
        </div>
  
        <button
          onClick={exportCSV}
          className="mt-4 bg-green-500 px-4 py-2 rounded-xl font-bold"
        >
  
          Export CSV
  
        </button>
  
      </div>
  
  
      <div className="grid grid-cols-2 gap-4">
  
        <StatsCard
          title="Total Rides"
          value={realtimeStats?.totalRides || 0}
        />
  
        <StatsCard
          title="Customers"
          value={realtimeStats?.totalCustomers|| 0}
        />
  
        <StatsCard
          title="Riders"
          value={realtimeStats?.totalRiders|| 0}
        />
  
        <StatsCard
          title="Pending"
          value={realtimeStats?.pendingRides|| 0}
        />
  
        <StatsCard
          title="Active"
          value={realtimeStats?.activeRides|| 0}
        />
  
        <StatsCard
          title="Completed"
          value={realtimeStats?.completedRides|| 0}
        />

        <StatsCard
        title="Cancelled"
        value={
            realtimeStats.cancelledRides
        }
        />
  
        <StatsCard
          title="Revenue"
          value={`₹${realtimeStats?.totalRevenue|| 0}`}
        />
  
      </div>

  
      <div className="mt-8">

        <AnalyticsChart
        stats={realtimeStats}
        />

        </div>

        <ReviewAnalytics
        reviews={reviews}
        />
  
      <RiderList
        riders={riders}
      />
  
      <CustomerList
        customers={customers}
      />
  
      <RideList
        rides={filteredRides}
      />
  
    </div>
  
  );
  
  };

  
  export default AdminDashboard;