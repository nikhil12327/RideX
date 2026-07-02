const RideHistoryList = ({
    rides,
  }) => {
  
    return (
  
      <div className="mt-8">
  
        <h2 className="text-2xl font-bold mb-4">
          Completed Rides
        </h2>
  
        {rides.length === 0 ? (
  
          <p className="text-zinc-400">
            No completed rides
          </p>
  
        ) : (
  
          rides.map((ride) => (
  
            <div
              key={ride.id}
              className="bg-zinc-900 p-4 rounded-xl mb-3"
            >
  
              <p>
                Pickup:
                {" "}
                {ride.pickup}
              </p>
  
              <p>
                Drop:
                {" "}
                {ride.drop}
              </p>
  
              <p className="text-yellow-400">
                ₹{ride.fare}
              </p>
  
            </div>
  
          ))
  
        )}
  
      </div>
  
    );
  
  };
  
  export default RideHistoryList;