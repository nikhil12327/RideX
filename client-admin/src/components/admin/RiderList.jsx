import {
    approveRider,
    suspendRider,
  }
  from "../../services/riderApprovalService";
  
  const RiderList = ({
    riders,
  }) => {

    const pendingRiders =
  riders.filter(
    rider =>
      !rider.approved &&
      !rider.suspended
  );

const approvedRiders =
  riders.filter(
    rider =>
      rider.approved &&
      !rider.suspended
  );

const suspendedRiders =
  riders.filter(
    rider =>
      rider.suspended
  );

  
  return (

    <div className="mt-8">
  
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
  
        Pending Approval
  
      </h2>
  
      {pendingRiders.map(
        (rider) => (
  
          <div
            key={rider.id}
            className="bg-zinc-900 p-4 rounded-xl mb-3"
          >
  
            <p>{rider.name}</p>
  
            <p className="text-zinc-400">
              {rider.email}
            </p>
  
            <button
              onClick={async () => {

                await approveRider(
                  rider.id
                );
              
                alert(
                  "Rider Approved Successfully"
                );
              
              }}
              className="bg-green-500 px-4 py-2 rounded mt-3"
            >
  
              Approve
  
            </button>
  
            <button
              onClick={async () => {

                await suspendRider(
                  rider.id
                );
              
                alert(
                  "Rider Suspended Successfully"
                );
              
              }}
              className="bg-red-500 px-4 py-2 rounded mt-3 ml-2"
            >
  
              Suspend
  
            </button>
  
          </div>
  
        )
      )}
  
      <h2 className="text-2xl font-bold mt-8 mb-4 text-green-400">
  
        Approved Riders
  
      </h2>
  
      {approvedRiders.map(
        (rider) => (
  
          <div
            key={rider.id}
            className="bg-zinc-900 p-4 rounded-xl mb-3"
          >
  
            <p>{rider.name}</p>
  
            <p>{rider.email}</p>
  
            <p className="text-green-400 font-bold">
  
              Approved
  
            </p>
  
          </div>
  
        )
      )}
  
      <h2 className="text-2xl font-bold mt-8 mb-4 text-red-400">
  
        Suspended Riders
  
      </h2>
  
      {suspendedRiders.map(
        (rider) => (
  
          <div
            key={rider.id}
            className="bg-zinc-900 p-4 rounded-xl mb-3"
          >
  
            <p>{rider.name}</p>
  
            <p>{rider.email}</p>
  
            <p className="text-red-400 font-bold">
  
              Suspended
  
            </p>
  
          </div>
  
        )
      )}
  
    </div>
  
  );
  
  };
  
  export default RiderList;