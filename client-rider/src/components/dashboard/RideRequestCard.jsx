const RideRequestCard = ({ pickup, drop }) => {
    return (
      <div className="bg-zinc-900 rounded-2xl p-4 mb-4">
        <p className="font-semibold">
          Pickup: {pickup}
        </p>
  
        <p className="text-gray-400">
          Drop: {drop}
        </p>
  
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg mt-4 font-semibold">
          Accept Ride
        </button>
      </div>
    );
  };
  
  export default RideRequestCard;