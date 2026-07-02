import { MapPin } from "lucide-react";
import {
    acceptRide
  } from "../../services/rideService";
  
  import {
    useAuth
  } from "../../context/AuthContext";

  const RideRequestCard = ({
    ride,
    riderData,
  }) => {

  const { user } = useAuth();

  const handleAccept = async () => {

    console.log("Accept button clicked");
  
    console.log("Ride:", ride);
  
    console.log("Rider Data:", riderData);
  
    try {
  
        await acceptRide(
            ride.id,
            riderData
          );
  
      console.log(
        "Firestore update successful"
      );
  
      alert("Ride Accepted");
  
    } catch (error) {
  
      console.error(
        "Accept Error:",
        error
      );
  
    }
  };
  
  return (
    <div className="bg-zinc-900 rounded-3xl p-5 mb-4 border border-zinc-800">

      <div className="flex items-start gap-3 mb-4">

        <MapPin className="text-yellow-400 mt-1" size={20} />

        <div>
          <p className="font-semibold">
            {ride.pickup}
          </p>

          <p className="text-zinc-400 text-sm mb-2">
            to {ride.drop}
          </p>
          
          <p className="text-yellow-400 font-bold">
            ₹{ride.fare}
            </p>
          <p className="text-xs text-zinc-500">
            {ride.distance} km away
          </p>
        </div>

      </div>

      <button onClick={handleAccept} className="bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 text-black w-full py-3 rounded-2xl font-bold">
        Accept Ride
      </button>

    </div>
  );
};

export default RideRequestCard;