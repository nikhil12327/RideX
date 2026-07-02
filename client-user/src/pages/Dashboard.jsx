import { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";
import { createRide, subscribeToCustomerRides,} from "../services/rideService";
import {
  subscribeToRiderLocation,
} from "../services/locationService";
import { getAddressFromCoords,} from "../services/locationService";

import LocationSearch
from "../components/LocationSearch";

import {
  getRouteInfo,
}
from "../services/routeService";

import MapView from "../components/MapView";

import { cancelRide,} from "../services/rideService";

import { useAuth } from "../context/AuthContext";

import BottomNavbar from "../components/BottomNavbar";

import { calculateFare,} from "../services/fareService";

const Dashboard = () => {

  const { user } = useAuth();

  const [pickup, setPickup] = useState("");

  const [drop, setDrop] = useState("");

  const [rides, setRides] = useState([]);

  const [distance, setDistance] = useState("");
  const [loadingLocation,
    setLoadingLocation] =
    useState(false);

    const [pickupCoords,
      setPickupCoords] =
      useState(null);
    
    const [dropCoords,
      setDropCoords] =
      useState(null);

  const [riderLocation, setRiderLocation] = useState(null);

  useEffect(() => {

    const fetchRoute =
      async () => {
  
        if (
          !pickupCoords ||
          !dropCoords
        ) return;
  
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
  
      };
  
    fetchRoute();
  
  }, [
    pickupCoords,
    dropCoords,
  ]);
  
  useEffect(() => {

    if (!user) return;
  
    const unsubscribe =
      subscribeToCustomerRides(
        user.uid,
        (ridesData) => {
  
          console.log(
            "Realtime customer rides:",
            ridesData
          );
  
          setRides(ridesData);
  
        }
      );
  
    return () =>
      unsubscribe();
  
  }, [user]);
  
  useEffect(() => {

    console.log("ALL RIDES:", rides);
  
    const activeRide =
      rides.find(
        ride =>
          ride.riderId &&
          ride.status !== "completed" &&
          ride.status !== "cancelled"
      );
  
    console.log("ACTIVE RIDE:", activeRide);
  
    if (!activeRide) {
  
      console.log("NO ACTIVE RIDE FOUND");
  
      setRiderLocation(null);
  
      return;
  
    }
  
    console.log(
      "SUBSCRIBING TO:",
      activeRide.riderId
    );
  
    const unsubscribe =
      subscribeToRiderLocation(
        activeRide.riderId,
        (location) => {
  
          console.log(
            "LIVE RIDER LOCATION:",
            location
          );
  
          setRiderLocation(location);
  
        }
      );
  
    return () => unsubscribe();
  
  }, [rides]);
  
  const getCurrentLocation =
  () => {

    if (
      !navigator.geolocation
    ) {
    
      setLoadingLocation(false);
    
      alert(
        "Geolocation not supported"
      );
    
      return;
    }
  setLoadingLocation(true);
  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const latitude =
        position.coords.latitude;
    
      const longitude =
        position.coords.longitude;
    
        const address =
        await getAddressFromCoords(
          latitude,
          longitude
        );
      
        setPickup(
          address ||
          "Location not found"
        );
        
        setPickupCoords({
          lat: latitude,
          lon: longitude,
        });
      
      setLoadingLocation(false);
    
    },

    (error) => {

      console.log(error);
    
      setLoadingLocation(false);
    
      alert(
        "Location access denied"
      );
    
    }

  );
};

  const handleBookRide = async () => {

    try {

      const fare =
  calculateFare(
    Number(distance)
  );
  if (
    !pickup ||
    !drop ||
    !distance
  ) {

    alert(
      "Please enter pickup, drop and distance"
    );
        return;
      }
      const activeRide =
  rides.find(
    ride =>
      ride.status !== "completed" &&
      ride.status !== "cancelled"
  );

if (activeRide) {

  alert(
    "You already have an active ride"
  );

  return;
}
      await createRide({
        pickup,
        drop,
        distance,
        fare,
        status: "pending",
        riderId: "",
        customerId: user.uid,
        createdAt: Date.now(),
      });

      alert(
        "Ride Booked Successfully"
      );

      setPickup("");
setDrop("");
setDistance("");

setPickupCoords(null);
setDropCoords(null);

setRiderLocation(null);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to book ride"
      );

    }
  };
  const handleCancelRide = async (
    rideId
  ) => {
  
    try {
  
      await cancelRide(
        rideId
      );
  
      alert(
        "Ride cancelled successfully. Refund will be processed if applicable."
      );
  
    } catch (error) {
  
      console.log(error);
  
    }
  };

  console.log(
    "Rides:",
    rides
  );
  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Book Ride
      </h1>

      <button
  onClick={getCurrentLocation}
  disabled={loadingLocation}
  className="bg-blue-500 px-4 py-2 rounded-lg mb-4 disabled:opacity-50"
>
  {
    loadingLocation
      ? "Fetching Location..."
      : "Use Current Location"
  }

</button>

<LocationSearch
  placeholder="Pickup Location"
  value={pickup}
  onSelect={(location) => {

    setPickup(
      location.display_name
    );

    setPickupCoords({
      lat:
        Number(
          location.lat
        ),
      lon:
        Number(
          location.lon
        ),
    });

  }}
/>

<LocationSearch
  placeholder="Drop Location"
  value={drop}
  onSelect={(location) => {

    setDrop(
      location.display_name
    );

    setDropCoords({
      lat:
        Number(
          location.lat
        ),
      lon:
        Number(
          location.lon
        ),
    });

  }}
/>

      
      {distance && Number(distance) > 0 && (

<p className="text-yellow-400 font-bold mb-4">

  Estimated Fare:
  ₹{
    calculateFare(
      Number(distance)
    )
  }

</p>

)}
      <button
  onClick={handleBookRide}
  disabled={loadingLocation}
  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold disabled:opacity-50"
>
  Book Ride
</button>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        My Rides
      </h2>

      {rides.length === 0 ? (

        <p className="text-zinc-400">
          No active rides
        </p>

      ) : (

        rides
          .filter(
            (ride) =>
              !(
                ride.status === "completed" &&
                ride.reviewSubmitted
              )
          )
          .map((ride) => (

          <div
            key={ride.id}
            className="bg-zinc-900 p-4 rounded-xl mb-3"
          >

            <p>
              Pickup: {ride.pickup}
            </p>

            <p>
              Drop: {ride.drop}
            </p>
            <p className="text-blue-400 font-bold mb-2">

  Distance: {ride.distance} km

</p>

            <p>
              Fare: ₹{ride.fare}
            </p>
            {ride.riderName && (

              <div className="bg-zinc-800 p-3 rounded-xl mt-3">

                <h4 className="font-bold text-yellow-400 mb-2">

                  Rider Details

                </h4>

                <p>
                  Name: {ride.riderName}
                </p>

                <p>
                  Phone: {ride.riderPhone || "N/A"}
                </p>

                <p>
                  Vehicle: {ride.vehicleNumber || "N/A"}
                </p>
                {riderLocation && (
  <>
    {console.log(
      "Rendering Map For:",
      ride.id,
      riderLocation
    )}

    <MapView
      riderLocation={riderLocation}
    />
  </>

)}

                {ride.riderPhone && (

                  <a
                    href={`tel:${ride.riderPhone}`}
                    className="block mt-3 bg-green-500 text-center py-2 rounded-lg font-bold"
                  >
                    Call Rider
                  </a>

                )}

              </div>

              )}

                <div className="mt-3">

                {ride.status === "pending" && (

                  <p className="text-yellow-400 font-bold">

                    Looking For Rider...

                  </p>

                )}

                {ride.status === "accepted" && (

                  <p className="text-blue-400 font-bold">

                    Rider Accepted Ride

                  </p>

                )}

                {ride.status === "arrived" && (

                  <p className="text-purple-400 font-bold">

                    Rider Has Arrived

                  </p>

                )}

                {ride.status === "started" && (

                  <p className="text-green-400 font-bold">

                    Ride In Progress

                  </p>

                )}

                {ride.status === "completed" && (

                  <p className="text-green-500 font-bold">

                    Ride Completed

                  </p>

                )}

                {ride.status === "cancelled" && (

                  <p className="text-red-500 font-bold">

                    Ride Cancelled

                  </p>

                )}

                </div>

                {ride.status !== "cancelled" && (

                <div className="mt-4 bg-zinc-800 p-3 rounded-xl">

                  <h4 className="font-bold text-yellow-400 mb-3">
                    Ride Progress
                  </h4>

                  <div className="space-y-2">

                    <p
                      className={
                        ["accepted", "arrived", "started", "completed"]
                          .includes(ride.status)
                          ? "text-green-400"
                          : "text-zinc-500"
                      }
                    >
                      ✓ Rider Accepted
                    </p>

                    <p
                      className={
                        ["arrived", "started", "completed"]
                          .includes(ride.status)
                          ? "text-green-400"
                          : "text-zinc-500"
                      }
                    >
                      ✓ Rider Arrived
                    </p>

                    <p
                      className={
                        ["started", "completed"]
                          .includes(ride.status)
                          ? "text-green-400"
                          : "text-zinc-500"
                      }
                    >
                      ✓ Ride Started
                    </p>

                    <p
                      className={
                        ride.status === "completed"
                          ? "text-green-400"
                          : "text-zinc-500"
                      }
                    >
                      ✓ Ride Completed
                    </p>

                  </div>

                </div>

                )}

                {ride.status === "completed" &&
                !ride.reviewSubmitted && (

                  <ReviewForm
                    ride={ride}
                  />

                )}   
          {ride.status === "pending" && (

            <button
              onClick={() =>
                handleCancelRide(
                  ride.id
                )
              }
              className="mt-3 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold"
            >
              Cancel Ride
            </button>

            )}
          </div>
          

        ))

      )}
     <BottomNavbar />
    </div>
  );
};

export default Dashboard;