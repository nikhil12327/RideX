const RideList = ({
    rides,
  }) => {
  
    return (
  
      <div className="mt-10">
  
        <h2 className="text-2xl font-bold mb-4">
  
          All Rides
  
        </h2>
  
        {rides.map(
          (ride) => (
  
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
  
              <p>
                Fare: ₹{ride.fare}
              </p>
  
              <p>
                Status: {ride.status}
              </p>
  
              <p className="text-zinc-500 text-sm">
  
                {ride.createdAt
                  ? new Date(
                      ride.createdAt
                    ).toLocaleString()
                  : "N/A"}
  
              </p>
  
            </div>
  
          )
        )}
  
      </div>
  
    );
  
  };
  
  export default RideList;