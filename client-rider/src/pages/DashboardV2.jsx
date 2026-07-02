import { useState, useEffect } from "react";

import RiderHero
from "../components/dashboard-v2/RiderHero";

import OnlineStatusCard
from "../components/dashboard-v2/OnlineStatusCard";

import RideRequestCardV2
from "../components/dashboard-v2/RideRequestCardV2";

import ActiveRideCardV2
from "../components/dashboard-v2/ActiveRideCardV2";

import BottomNavRider
from "../components/dashboard-v2/BottomNavRider";

import {
  updateRiderEarnings
} from "../services/earningsService";

import {
  subscribeToPendingRides,
  acceptRide,
  rejectRide,
  subscribeToActiveRide,
  updateRideStatus
} from "../services/riderRideService";

import {
  subscribeToRiderStats
} from "../services/riderStatsService";

import {
  startLocationTracking,
  stopLocationTracking
} from "../services/locationTrackingService";

import {
  useAuth
} from "../context/AuthContext";

import toast
from "react-hot-toast";

const DashboardV2 = () => {

  const { user } = useAuth();

  const [online, setOnline] =
    useState(true);

  const [rides, setRides] =
    useState([]);

  const [activeRide,
    setActiveRide] =
    useState(null);

  const [watchId,
    setWatchId] =
    useState(null);

  const [riderStats,
    setRiderStats] =
    useState(null);

  // ============================
  // Pending Rides Listener
  // ============================

  useEffect(() => {

    const unsubscribe =

      subscribeToPendingRides(

        (ridesData) => {

          setRides(ridesData);

        }

      );

    return () =>
      unsubscribe();

  }, []);

  // ============================
  // Active Ride Listener
  // ============================

  useEffect(() => {

    if (!user) return;

    const unsubscribe =

      subscribeToActiveRide(

        user.uid,

        (ride) => {

          setActiveRide(ride);

        }

      );

    return () =>
      unsubscribe();

  }, [user]);

  // ============================
  // Rider Stats Listener
  // ============================

  useEffect(() => {

    if (!user) return;

    const unsubscribe =

      subscribeToRiderStats(

        user.uid,

        (data) => {

          setRiderStats(data);

        }

      );

    return () =>
      unsubscribe();

  }, [user]);

  // ============================
  // Rider Location Tracking
  // ============================

  useEffect(() => {

    if (!user) return;

    let id = null;

    if (online) {

      id = startLocationTracking(
        user.uid
      );

      setWatchId(id);

      console.log(
        "Location Tracking Started"
      );

    } else {

      if (watchId) {

        stopLocationTracking(
          watchId
        );

        console.log(
          "Location Tracking Stopped"
        );

      }

    }

    return () => {

      if (id) {

        stopLocationTracking(id);

      }

    };

  }, [online, user]);

  // ============================
  // Accept Ride
  // ============================

  const handleAccept =
    async (rideId) => {

      try {

        await acceptRide(

          rideId,

          user.uid,

          user.email

        );

        toast.success(
          "Ride Accepted"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Unable to accept ride"
        );

      }

    };

  // ============================
  // Reject Ride
  // ============================

  const handleReject =
    async (rideId) => {

      try {

        await rejectRide(
          rideId
        );

        toast.success(
          "Ride Rejected"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Unable to reject ride"
        );

      }

    };

  // ============================
  // Arrive
  // ============================

  const handleArrive =
    async (rideId) => {

      try {

        await updateRideStatus(
          rideId,
          "arrived"
        );

        toast.success(
          "Arrived at Pickup"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Unable to update ride"
        );

      }

    };

  // ============================
  // Start Ride
  // ============================

  const handleStart =
    async (rideId) => {

      try {

        await updateRideStatus(
          rideId,
          "started"
        );

        toast.success(
          "Ride Started"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Unable to start ride"
        );

      }

    };

 // ============================
// Complete Ride
// ============================
const handleComplete = async (rideId) => {

  try {

    await updateRideStatus(

      rideId,

      "completed"

    );

    if (activeRide) {

      await updateRiderEarnings(

        user.uid,

        Number(activeRide.fare)

      );

    }

    toast.success(

      "Ride Completed Successfully"

    );

  } catch (error) {

    console.log(error);

    toast.error(

      "Unable to complete ride"

    );

  }

}; 
  return (

    <div className="
      min-h-screen
      bg-gradient-to-b
      from-zinc-950
      via-black
      to-zinc-900
      text-white
      p-5
      pb-32
    ">

      <RiderHero

        riderName={
          user?.email
            ?.split("@")[0]
          || "Rider"
        }

        earnings={
          riderStats?.totalEarnings || 0
        }

        completedRides={
          riderStats?.completedRides || 0
        }

      />

      <OnlineStatusCard

        online={online}

        onToggle={() =>
          setOnline(
            prev => !prev
          )
        }

      />

      {

        activeRide && (

          <ActiveRideCardV2

            ride={activeRide}

            onArrive={
              handleArrive
            }

            onStart={
              handleStart
            }

            onComplete={
              handleComplete
            }

          />

        )

      }

      {

        online

        &&

        !activeRide

        &&

        rides.length > 0

        &&

        rides.map(

          (ride) => (

            <RideRequestCardV2

              key={ride.id}

              ride={ride}

              onAccept={
                handleAccept
              }

              onReject={
                handleReject
              }

            />

          )

        )

      }

      {

        online

        &&

        !activeRide

        &&

        rides.length === 0

        && (

          <div className="
            mt-10
            bg-zinc-900
            rounded-3xl
            p-8
            text-center
            border
            border-zinc-800
          ">

            <h2 className="
              text-xl
              font-semibold
            ">

              No Ride Requests

            </h2>

            <p className="
              text-zinc-400
              mt-2
            ">

              Waiting for new ride requests...

            </p>

          </div>

        )

      }

      <BottomNavRider />

    </div>

  );

};

export default DashboardV2;