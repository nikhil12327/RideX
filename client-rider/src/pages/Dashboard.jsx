import {
  useEffect,
  useState,
} from "react";

import {
  updateRiderStatus,
} from "../services/riderService";

import {
  updateRiderLocation,
} from "../services/locationService";

import {
  subscribeToPendingRides,
  subscribeToAcceptedRides,
  subscribeToCompletedRides,
} from "../services/rideService";
import {
  subscribeToRider
} from "../services/riderService";


import { useAuth } from "../context/AuthContext";

import TopNavbar from "../components/dashboard/TopNavbar";

import OnlineToggle from "../components/dashboard/OnlineToggle";

import EarningsCard from "../components/dashboard/EarningsCard";

import RideRequestCard from "../components/dashboard/RideRequestCard";

import ActiveRideCard from "../components/dashboard/ActiveRideCard";

import RideHistoryList
from "../components/dashboard/RideHistoryList";

import BottomNavbar from "../components/dashboard/BottomNavbar";

const Dashboard = () => {

  const { user } = useAuth();

  const [riderData, setRiderData] =
    useState(null);

  const [rides, setRides] =
    useState([]);

  const [activeRides, setActiveRides] =
    useState([]);

    const [completedRides, setCompletedRides] =
  useState([]);

    const handleToggle = async (
      status
    ) => {
    
      if (
        !riderData?.approved
      ) {
    
        alert(
          "Your account is waiting for admin approval."
        );
    
        return;
    
      }
    
      if (
        riderData?.suspended
      ) {
    
        alert(
          "Your account has been suspended."
        );
    
        return;
    
      }
    

    try {

      await updateRiderStatus(
        user.uid,
        status
      );

      setRiderData((prev) =>
        prev
          ? {
              ...prev,
              online: status,
            }
          : prev
      );
      
    } catch (error) {

      console.error(
        "Toggle Error:",
        error
      );

    }
  };

  useEffect(() => {

    if (!user) return;
  
    const unsubscribeRider =
  subscribeToRider(
    user.uid,
    (data) => {


      setRiderData(data);

    }
  );
  
    const unsubscribeAccepted =
      subscribeToAcceptedRides(
        user.uid,
        (rides) => {
  
          setActiveRides(rides);
  
        }
      );

      const unsubscribeCompleted =
  subscribeToCompletedRides(
    user.uid,
    (rides) => {

      setCompletedRides(
        rides
      );

    }
  );
  
    const unsubscribe =
      subscribeToPendingRides(
        (rides) => {
  
          setRides(rides);
  
        }
      );
  
    return () => {
  
      unsubscribe();
  
      unsubscribeAccepted();
  
      unsubscribeRider();

      unsubscribeCompleted();
  
    };
  
  }, [user]);

  useEffect(() => {

    console.log("USER:", user?.uid);
console.log("ONLINE:", riderData?.online);
console.log("ACTIVE RIDES:", activeRides.length);

    if (!user) return;
  
    if (!riderData?.online) return;
  
    if (activeRides.length === 0) return;
  
    const updateLocation = () => {
  
      if (!navigator.geolocation) return;
  
      navigator.geolocation.getCurrentPosition(
  
        async (position) => {
  
          try {
  
            console.log(
              "Updating rider location:",
              user.uid
            );
  
            await updateRiderLocation(
              user.uid,
              position.coords.latitude,
              position.coords.longitude
            );
  
          } catch (error) {
  
            console.log(
              "Location Update Error:",
              error
            );
  
          }
  
        },
  
        (error) => {
  
          console.log(
            "GPS Error:",
            error
          );
  
        },
  
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
  
      );
  
    };
  
    // Immediate update
    updateLocation();
  
    // Then continue every 15 seconds
    const locationInterval =
      setInterval(
        updateLocation,
        15000
      );
  
    return () => {
  
      clearInterval(
        locationInterval
      );
  
    };
  
  }, [
    user,
    riderData?.online,
    activeRides.length
  ]);

  if (
    riderData?.suspended
  ) {
  
    return (
  
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white flex items-center justify-center">
  
        Account Suspended
  
      </div>
  
    );
  
  }

  if (!riderData) {

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white p-4 pb-28">

      <TopNavbar
        name={riderData.name}
        online={riderData.online}
      />

{riderData.approved && (

<OnlineToggle
  online={riderData.online}
  onToggle={handleToggle}
/>

)}

{
  riderData &&
  !riderData.approved && (

    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 rounded-2xl mt-4 mb-4 font-bold shadow-lg">

      Waiting For Admin Approval

    </div>

  )
}

<EarningsCard
  earnings={riderData.earnings}
  ridesCompleted={
    completedRides.length
  }
/>

      <div>

        <h3 className="text-xl font-semibold mb-4">
          Ride Requests
        </h3>

        {!riderData.approved ? (

<p className="text-yellow-400">
  Approval Required To Receive Rides
</p>

) : rides.length === 0 ? (

          <p className="text-zinc-400">
            No Ride Requests Available
          </p>

        ) : (

          rides.map((ride) => (

            <RideRequestCard
              key={ride.id}
              ride={ride}
              riderData={{
                uid: user.uid,
                ...riderData,
              }}
            />

          ))

        )}

        <h3 className="text-xl font-bold mt-8 mb-4">
          Active Rides
        </h3>

        {activeRides.length === 0 ? (

          <p className="text-zinc-400">
            No Active Rides
          </p>

        ) : (

          activeRides.map(
            (ride) => (

              <ActiveRideCard
                key={ride.id}
                ride={ride}
              />

            )
          )

        )}

      </div>

      <RideHistoryList
  rides={completedRides}
/>

      <BottomNavbar />

    </div>
  );
};

export default Dashboard;