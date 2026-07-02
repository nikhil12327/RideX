import { useState, useEffect } from "react";

import HeroSection from "../components/dashboard-v2/HeroSection";
import QuickAccess from "../components/dashboard-v2/QuickAccess";
import SearchRideCard from "../components/dashboard-v2/SearchRideCard";
import RideOptions from "../components/dashboard-v2/RideOptions";
import RecentRides from "../components/dashboard-v2/RecentRides";
import BottomNavV2 from "../components/dashboard-v2/BottomNavV2";
import MapSection from "../components/dashboard-v2/MapSection";
import ActiveRideCardV2 from "../components/dashboard-v2/ActiveRideCardV2";
import RideTimeline from "../components/dashboard-v2/RideTimeline";
import PageWrapper from "../components/dashboard-v2/PageWrapper";

import {
  createRide,
  subscribeToCustomerRides,
} from "../services/rideService";

import {
  getRouteInfo,
} from "../services/routeService";

import {
  calculateFare,
} from "../services/fareService";

import {
  subscribeToRiderLocation,
} from "../services/locationService";

import { useAuth }
from "../context/AuthContext";

import {
  getCustomerProfile,
} from "../services/customerService";

import {
  deductWalletAmount,
} from "../services/walletService";

import toast from "react-hot-toast";

const DashboardV2 = () => {

  const { user } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [pickup, setPickup] =
    useState("");

  const [drop, setDrop] =
    useState("");

  const [rides, setRides] =
    useState([]);

  const [distance, setDistance] =
    useState("");

  const [pickupCoords,
    setPickupCoords] =
    useState(null);

  const [dropCoords,
    setDropCoords] =
    useState(null);

  const [riderLocation,
    setRiderLocation] =
    useState(null);

  const [showPaymentModal,
    setShowPaymentModal] =
    useState(false);

  const [pendingPaymentRide,
    setPendingPaymentRide] =
    useState(null);

  // Prevent showing the same payment popup repeatedly
  const [paymentPopupShown,
    setPaymentPopupShown] =
    useState(false);

  // =====================================
  // Fetch Customer Profile
  // =====================================

  useEffect(() => {

    if (!user) return;

    const fetchProfile =
      async () => {

        try {

          const data =
            await getCustomerProfile(
              user.uid
            );

          setProfile(data);

        } catch (error) {

          console.log(
            "Profile Error:",
            error
          );

        }

      };

    fetchProfile();

  }, [user]);

  // =====================================
  // Subscribe Customer Rides
  // =====================================

  useEffect(() => {

    if (!user) return;

    const unsubscribe =

      subscribeToCustomerRides(

        user.uid,

        (ridesData) => {

          setRides(ridesData);

        }

      );

    return () =>
      unsubscribe();

  }, [user]);

  // =====================================
  // Active Ride
  // =====================================

  const activeRide =

    rides.find(

      ride =>

        ride.status === "pending" ||

        ride.status === "accepted" ||

        ride.status === "arrived" ||

        ride.status === "started"

    );

    const latestCompletedRide = rides
  .filter(ride => ride.status === "completed")
  .sort((a, b) => b.createdAt - a.createdAt)[0];

  // =====================================
  // Completed Ride Waiting For Payment
  // =====================================

  const completedRide =

    rides.find(

      ride =>

        ride.status === "completed" &&

        !ride.paymentDone

    );

  // =====================================
  // Subscribe Rider Location
  // =====================================

  useEffect(() => {

    if (!activeRide?.riderId) return;

    const unsubscribe =

      subscribeToRiderLocation(

        activeRide.riderId,

        (location) => {

          setRiderLocation(location);

        }

      );

    return () =>
      unsubscribe();

  }, [activeRide]);

  // =====================================
  // Route Calculation
  // =====================================

  useEffect(() => {

    const fetchRoute =
      async () => {

        if (
          !pickupCoords ||
          !dropCoords
        ) return;

        try {

          const route =

            await getRouteInfo(

              pickupCoords.lat,

              pickupCoords.lon,

              dropCoords.lat,

              dropCoords.lon

            );

          if (route) {

            setDistance(
              route.distance
            );

          }

        } catch (error) {

          console.log(
            "Route Error:",
            error
          );

        }

      };

    fetchRoute();

  }, [

    pickupCoords,

    dropCoords

  ]);

  // =====================================
  // Payment Popup
  // =====================================

  useEffect(() => {

    if (

      completedRide &&

      !paymentPopupShown

    ) {

      setPendingPaymentRide(
        completedRide
      );

      setShowPaymentModal(
        true
      );

      setPaymentPopupShown(
        true
      );

    }

    if (!completedRide) {

      setPaymentPopupShown(
        false
      );

    }

  }, [

    completedRide,

    paymentPopupShown

  ]);

  // =====================================
  // Wallet Payment
  // =====================================

  const handleWalletPayment =
    async () => {

      if (!pendingPaymentRide) return;

      try {

        const fare = Number(

          pendingPaymentRide.fare || 0

        );

        if (fare <= 0) {

          toast.error(
            "Invalid Fare Amount"
          );

          return;

        }

        await deductWalletAmount(

          user.uid,

          fare,

          pendingPaymentRide.id

        );

        setShowPaymentModal(
          false
        );

        setPendingPaymentRide(
          null
        );

        setPaymentPopupShown(
          false
        );

        toast.success(

          `₹${fare} Paid Successfully`

        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Payment Failed"
        );

      }

    };
  // Book Ride

  const handleBookRide =
    async () => {

      if (
        !pickup ||
        !drop
      ) {

        toast.error(
          "Please enter pickup and drop locations"
        );

        return;

      }

      if (!distance) {

        toast.error(
          "Please select valid locations"
        );

        return;

      }

      try {

        const fare =
          calculateFare(
            Number(distance)
          );

        await createRide({

          customerId:
            user.uid,

          customerName:
            profile?.name || "",

          customerEmail:
            profile?.email || "",

          pickup,

          drop,

          fare,

          distance,

          paymentDone:
            false,

          status:
            "pending",

          createdAt:
            Date.now(),

        });

        toast.success(
          "Ride Requested Successfully"
        );

        setPickup("");
        setDrop("");
        setDistance("");
        //setPickupCoords(null);
        //setDropCoords(null);

      } catch (error) {

        console.log(error);

        toast.error(
          "Ride Booking Failed"
        );

      }

    };

  // SOS

  const handleSOS = () => {

    const confirmSOS =
      window.confirm(
        "Do you want to call emergency services?"
      );

    if (!confirmSOS)
      return;

    window.location.href =
      "tel:112";

  };

  return (

    <PageWrapper>

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

        <HeroSection
          userName={
            profile?.name ||
            "Customer"
          }
        />

        <QuickAccess />

        <SearchRideCard

          pickup={pickup}
          drop={drop}

          setPickup={setPickup}
          setDrop={setDrop}

          setPickupCoords={
            setPickupCoords
          }

          setDropCoords={
            setDropCoords
          }

          onBookRide={
            handleBookRide
          }

        />

        <RideOptions
          distance={distance}
        />

        <MapSection

        riderLocation={
          riderLocation
        }

        pickupCoords={
          pickupCoords
        }

        dropCoords={
          dropCoords
        }

        />

        {

          activeRide && (

            <>

              <ActiveRideCardV2
                ride={activeRide || latestCompletedRide}
              />

              <RideTimeline
                status={
                  activeRide.status
                }
              />

            </>

          )

        }

        <RecentRides
          rides={rides}
        />

        {

          showPaymentModal && (

            <div className="
              fixed
              inset-0
              bg-black/80
              z-[100]
              flex
              items-center
              justify-center
              p-5
            ">

              <div className="
                bg-zinc-900
                rounded-3xl
                p-8
                border
                border-zinc-800
                w-full
                max-w-md
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-4
                ">

                  Ride Completed

                </h2>

                <p className="
                  text-zinc-400
                  mb-6
                ">

                  Pay

                  <span className="
                    text-yellow-400
                    font-bold
                    ml-2
                  ">

                    ₹
                    {
                      pendingPaymentRide?.fare
                    }

                  </span>

                  {" "}from Wallet?

                </p>

                <div className="
                  flex
                  gap-4
                ">

                  <button

                    onClick={() =>
                      setShowPaymentModal(
                        false
                      )
                    }

                    className="
                      flex-1
                      py-4
                      rounded-2xl
                      bg-zinc-800
                    "

                  >

                    Later

                  </button>

                  <button

                    onClick={
                      handleWalletPayment
                    }

                    className="
                      flex-1
                      py-4
                      rounded-2xl
                      bg-yellow-400
                      text-black
                      font-bold
                    "

                  >

                    Pay Now

                  </button>

                </div>

              </div>

            </div>

          )

        }

        <button

          onClick={handleSOS}

          className="
            fixed
            bottom-28
            right-5
            w-16
            h-16
            rounded-full
            bg-red-500
            shadow-2xl
            text-white
            font-bold
            z-50
            hover:scale-110
            transition-all
          "

        >

          SOS

        </button>

        <BottomNavV2 />

      </div>

    </PageWrapper>

  );

};

export default DashboardV2;