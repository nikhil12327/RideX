import { useEffect, useState } from "react";

import PageTransition
from "../components/common/PageTransition";

import DashboardSkeleton
from "../components/common/DashboardSkeleton";

import AdminHero
from "../components/admin-v2/AdminHero";

import MetricCard
from "../components/admin-v2/MetricCard";

import RidesSection
from "../components/admin-v2/RidesSection";

import ActivityTimeline
from "../components/admin-v2/ActivityTimeline";

import NotificationPanel
from "../components/admin-v2/NotificationPanel";

import PendingApprovalQueue
from "../components/admin-v2/PendingApprovalQueue";

import SystemHealthCard
from "../components/admin-v2/SystemHealthCard";

import LiveRideMap
from "../components/admin-v2/LiveRideMap";

import RiderManagement
from "../components/admin-v2/RiderManagement";

import CustomerManagement
from "../components/admin-v2/CustomerManagement";

import AnalyticsDashboard
from "../components/admin-v2/AnalyticsDashboard";

import RevenueChart
from "../components/admin-v2/RevenueChart";

import SearchBar
from "../components/admin-v2/SearchBar";

import AdminSidebar
from "../components/admin-v2/AdminSidebar";

import {
  getDashboardStats,
  getAllCustomers,
  getAllRiders,
  approveRider,
  suspendRider
}
from "../services/adminService";

import {
  subscribeToRides
}
from "../services/adminRealtimeService";

import { signOut }
from "firebase/auth";

import { auth }
from "../firebase/config";

import { useNavigate }
from "react-router-dom";

import {
  Users,
  Bike,
  IndianRupee,
  Clock,
  Download,
  Menu
}
from "lucide-react";

import toast
from "react-hot-toast";

const AdminDashboardV2 = () => {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState(null);

  const [rides, setRides] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  const [riders, setRiders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("Dashboard");
    
  const [sidebarOpen, setSidebarOpen] =
  useState(false);

  const [riderSearch, setRiderSearch] =
  useState("");

  const [customerSearch, setCustomerSearch] =
    useState("");

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const [

            statsData,
            customersData,
            ridersData

          ] = await Promise.all([

            getDashboardStats(),
            getAllCustomers(),
            getAllRiders()

          ]);

          setStats(statsData);
          setCustomers(customersData);
          setRiders(ridersData);

        } catch (error) {

          console.log(error);

          toast.error(
            "Unable to load dashboard"
          );

        } finally {

          setLoading(false);

        }

      };

    loadDashboard();

  }, []);

  useEffect(() => {

    const unsubscribe =

      subscribeToRides(

        (ridesData) => {

          setRides(ridesData);

        }

      );

    return () =>
      unsubscribe();

  }, []);

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        toast.success(
          "Logged Out"
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        toast.error(
          "Logout Failed"
        );

      }

    };

  const handleApprove =
    async (riderId) => {

      try {

        await approveRider(
          riderId
        );

        toast.success(
          "Rider Approved"
        );

        setRiders(

          riders.map(

            rider =>

              rider.id === riderId

              ? {
                  ...rider,
                  isApproved: true
                }

              : rider

          )

        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Approval Failed"
        );

      }

    };

  const handleSuspend =
    async (

      riderId,
      currentStatus

    ) => {

      try {

        await suspendRider(
          riderId,
          currentStatus
        );

        toast.success(
          "Rider Updated"
        );

        setRiders(

          riders.map(

            rider =>

              rider.id === riderId

              ? {

                  ...rider,

                  isSuspended:
                    !currentStatus

                }

              : rider

          )

        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Update Failed"
        );

      }

    };

  const filteredRides =

    rides.filter(

      ride =>

        String(
          ride.pickup || ""
        )

          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        String(
          ride.drop || ""
        )

          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        String(
          ride.customerName || ""
        )

          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

    );

    const filteredRiders =

  riders.filter((rider) =>

    String(
      rider.name || ""
    )

      .toLowerCase()

      .includes(
        riderSearch.toLowerCase()
      )

    ||

    String(
      rider.email || ""
    )

      .toLowerCase()

      .includes(
        riderSearch.toLowerCase()
      )

    ||

    String(
      rider.vehicleNumber || ""
    )

      .toLowerCase()

      .includes(
        riderSearch.toLowerCase()
      )

  );

  const filteredCustomers =
  customers.filter((customer) =>

    customer.name
      ?.toLowerCase()
      .includes(
        customerSearch.toLowerCase()
      )

    ||

    customer.email
      ?.toLowerCase()
      .includes(
        customerSearch.toLowerCase()
      )

  );


  const activeRides =

  rides.filter(

    ride =>

      ride.status === "accepted"

      ||

      ride.status === "arrived"

      ||

      ride.status === "started"

  );
  

  const exportCSV = () => {

    const headers = [

      "Customer",
      "Pickup",
      "Drop",
      "Fare",
      "Status"

    ];

    const rows = rides.map(

      ride => [

        ride.customerName || "",
        ride.pickup || "",
        ride.drop || "",
        ride.fare || "",
        ride.status || ""

      ]

    );

    const csv =

      [headers, ...rows]

        .map(row =>
          row.join(",")
        )

        .join("\n");

    const blob =
      new Blob([csv], {

        type: "text/csv"

      });

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "rides-report.csv";

    a.click();

    toast.success(
      "Report Downloaded"
    );

  };

  if (loading) {

    return (
      <DashboardSkeleton />
    );

  }

  const today = new Date().toDateString();

const todaysRevenue = rides
  .filter(
    ride =>
      ride.paymentDone &&
      new Date(
        ride.completedAt || ride.createdAt
      ).toDateString() === today
  )
  .reduce(
    (sum, ride) =>
      sum + Number(ride.fare || 0),
    0
  );

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

const weeklyRevenue = rides
  .filter(
    ride =>
      ride.paymentDone &&
      (ride.completedAt || ride.createdAt) >= weekAgo
  )
  .reduce(
    (sum, ride) =>
      sum + Number(ride.fare || 0),
    0
  );

  const completed = rides.filter(
    ride =>
      ride.paymentDone
  );
  
  const averageFare =
    completed.length
      ? Math.round(
          completed.reduce(
            (sum, ride) =>
              sum + Number(ride.fare || 0),
            0
          ) / completed.length
        )
      : 0;

      const completionRate =
  rides.length
    ? Math.round(
        rides.filter(
          ride =>
            ride.status === "completed"
        ).length /
          rides.length *
          100
      )
    : 0;

    
  return (

    

    <PageTransition>

      <div className="
      flex
      bg-gradient-to-br
      from-black
      via-zinc-950
      to-zinc-900
      text-white
      ">

        {/* Desktop Sidebar */}

        <div className="hidden lg:block">

        <AdminSidebar

          activeTab={activeTab}

          setActiveTab={setActiveTab}

          onLogout={handleLogout}

        />

        </div>

        {/* Mobile Sidebar */}

        {

        sidebarOpen && (

          <div

            className="
            fixed
            inset-0
            bg-black/60
            z-50
            "

            onClick={() =>
              setSidebarOpen(false)
            }

          >

            <div

              onClick={(e) =>
                e.stopPropagation()
              }

            >

              <AdminSidebar

                activeTab={activeTab}

                setActiveTab={setActiveTab}

                onLogout={handleLogout}

                closeSidebar={() =>
                  setSidebarOpen(false)
                }

              />

            </div>

          </div>

        )

        }
      <main
        className="
        flex-1
        min-h-screen
        w-full
        overflow-y-auto
        p-8
        "
      >

        <div
          className="
          w-full
          max-w-full
          space-y-8
          "
        >

        <div className="
        flex
        items-center
        justify-between
        mb-8
        lg:hidden
        ">

          <button

            onClick={() =>
              setSidebarOpen(true)
            }

            className="
            p-3
            rounded-2xl
            bg-zinc-900
            "

          >

            <Menu />

          </button>

          <h1 className="
          text-2xl
          font-bold
          ">

            RideX Admin

          </h1>

        </div>

          {/* Dashboard Tab */}

{

activeTab === "Dashboard"

&&

<>

  <AdminHero
    stats={stats}
  />

  {/* Search + Export */}

  <div className="
  mt-8
  flex
  flex-col
  md:flex-row
  gap-4
  ">

    <div className="
    flex-1
    ">

      <SearchBar

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

      />

    </div>

    <button

      onClick={
        exportCSV
      }

      className="
      bg-yellow-400
      hover:bg-yellow-300
      text-black
      px-6
      py-4
      rounded-2xl
      font-bold
      flex
      items-center
      justify-center
      gap-2
      transition-all
      duration-300
      "

    >

      <Download size={20} />

      Export CSV

    </button>

  </div>

  {/* Metrics */}

  <div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4
  gap-5
  mt-8
  ">

    <MetricCard
      title="Customers"
      value={
        stats?.totalCustomers || 0
      }
      icon={Users}
      color="text-blue-400"
    />

    <MetricCard
      title="Riders"
      value={
        stats?.totalRiders || 0
      }
      icon={Bike}
      color="text-green-400"
    />

    <MetricCard
      title="Active Rides"
      value={
        stats?.activeRides || 0
      }
      icon={Clock}
      color="text-yellow-400"
    />

    <MetricCard
      title="Revenue"
      value={`₹${
        stats?.totalRevenue || 0
      }`}
      icon={IndianRupee}
      color="text-orange-400"
    />

  </div>

  <div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4
  gap-5
  mt-6
  "
>

  <MetricCard
    title="Today's Revenue"
    value={`₹${todaysRevenue}`}
    icon={IndianRupee}
    color="text-green-400"
  />

  <MetricCard
    title="Weekly Revenue"
    value={`₹${weeklyRevenue}`}
    icon={IndianRupee}
    color="text-yellow-400"
  />

  <MetricCard
    title="Average Fare"
    value={`₹${averageFare}`}
    icon={IndianRupee}
    color="text-blue-400"
  />

  <MetricCard
    title="Completion Rate"
    value={`${completionRate}%`}
    icon={Clock}
    color="text-purple-400"
  />

</div>

  <div
  className="
  grid
  grid-cols-1
  xl:grid-cols-4
  gap-6
  mt-8
  "
>

  <div className="xl:col-span-2">

    <NotificationPanel
      rides={rides}
      riders={riders}
    />

  </div>

  <PendingApprovalQueue
    riders={riders}
    onApprove={handleApprove}
  />

  <SystemHealthCard />

</div>

<div className="mt-8">

  <ActivityTimeline

    rides={rides}

    riders={riders}

    customers={customers}

  />

</div>

  {/* Revenue Chart */}

  <div className="mt-8">

    <RevenueChart
      rides={rides}
    />

  </div>

</>

}
<div className="mt-8">

  <LiveRideMap

    activeRides={
      activeRides
    }

  />

</div>

{/* Analytics Tab */}

{

activeTab === "Analytics"

&&

<AnalyticsDashboard

  rides={rides}

  riders={riders}

/>

}
          {

            activeTab === "Rides"

            &&

            <RidesSection
              rides={filteredRides}
            />

          }

          {

          activeTab === "Riders"

          &&

          <div className="space-y-8">

            <div>

              <h1 className="
              text-4xl
              font-bold
              ">

                Rider Management

              </h1>

              <p className="
              text-zinc-400
              mt-2
              ">

                Manage, approve and suspend riders

              </p>

            </div>

            <div className="
            bg-zinc-900
            rounded-3xl
            border
            border-zinc-800
            p-5
            ">

              <input

                type="text"

                placeholder="
                Search riders by name,
                email or vehicle
                "

                value={riderSearch}

                onChange={(e) =>
                  setRiderSearch(
                    e.target.value
                  )
                }

                className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-2xl
                px-5
                py-4
                outline-none
                text-white
                "

              />

            </div>

            {

              filteredRiders.length === 0

              ?

              <div className="
              dashboard-card
              text-center
              py-20
              ">

                <Bike

                  size={50}

                  className="
                  mx-auto
                  text-zinc-600
                  mb-5
                  "

                />

                <h2 className="
                text-2xl
                font-bold
                ">

                  No Riders Found

                </h2>

                <p className="
                text-zinc-400
                mt-2
                ">

                  Try searching with another keyword

                </p>

              </div>

              :

              <RiderManagement

                riders={filteredRiders}

                onApprove={handleApprove}

                onSuspend={handleSuspend}

              />

            }

          </div>

          }

{
  activeTab === "Customers"

  &&

  <div className="space-y-8">

    <div>

      <h1 className="
      text-4xl
      font-bold
      ">

        Customer Management

      </h1>

      <p className="
      text-zinc-400
      mt-2
      ">

        View and manage customers

      </p>

    </div>

    {/* Customer Search */}

    <div className="mt-8">

      <div className="mb-6">

        <input

          type="text"

          placeholder="Search Customers"

          value={customerSearch}

          onChange={(e) =>
            setCustomerSearch(
              e.target.value
            )
          }

          className="
          w-full
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          px-5
          py-4
          outline-none
          text-white
          "

        />

      </div>

      <CustomerManagement
        customers={filteredCustomers}
      />

    </div>

  </div>
}

          

      </div>

      </main>

      </div>

    </PageTransition>

  );

};

export default AdminDashboardV2;