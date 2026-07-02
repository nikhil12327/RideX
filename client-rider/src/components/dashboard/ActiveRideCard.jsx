import {
    updateRideStatus,
  } from "../../services/rideService";

import {
    addEarnings,
  } from "../../services/riderService";
  
  const ActiveRideCard = ({
    ride,
  }) => {
  
    const handleStatusChange =
  async (status) => {

    try {

      await updateRideStatus(
        ride.id,
        status
      );

      if (
        status ===
        "completed"
      ) {

        await addEarnings(
          ride.riderId,
          ride.id,
          ride.fare
        );

      }

      alert(
        `Ride ${status}`
      );

    } catch (error) {

      console.log(error);

    }
  };
  
    return (
      <div className="bg-zinc-900 p-5 rounded-3xl mb-4">
  
        <h3 className="text-lg font-bold">
          Active Ride
        </h3>
  
        <p>
          Pickup: {ride.pickup}
        </p>
  
        <p>
          Drop: {ride.drop}
        </p>
  
        <p className="text-yellow-400">
          Fare: ₹{ride.fare}
        </p>
  
        <p
        className={`mb-4 font-bold ${
            ride.status === "accepted"
            ? "text-blue-400"
            : ride.status === "arrived"
            ? "text-purple-400"
            : ride.status === "started"
            ? "text-green-400"
            : "text-red-400"
        }`}
        >
        Status: {ride.status}
        </p>
  
        {ride.status ===
          "accepted" && (
  
          <button
            onClick={() =>
              handleStatusChange(
                "arrived"
              )
            }
            className="bg-blue-500 px-4 py-2 rounded-xl mr-2"
          >
            Arrived
          </button>
  
        )}
  
        {ride.status ===
          "arrived" && (
  
          <button
            onClick={() =>
              handleStatusChange(
                "started"
              )
            }
            className="bg-green-500 px-4 py-2 rounded-xl mr-2"
          >
            Start Ride
          </button>
  
        )}
  
        {ride.status ===
          "started" && (
  
          <button
            onClick={() =>
              handleStatusChange(
                "completed"
              )
            }
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            Complete Ride
          </button>
  
        )}
  
      </div>
    );
  };
  
  export default ActiveRideCard;