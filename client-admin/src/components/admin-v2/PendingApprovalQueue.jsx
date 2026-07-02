const PendingApprovalQueue = ({
    riders = [],
    onApprove
  }) => {
  
    const pendingRiders =
  
      riders.filter(
        rider => !rider.isApproved
      );
  
    return (
  
      <div className="dashboard-card">
  
        <h2 className="
        text-2xl
        font-bold
        mb-6
        ">
  
          Approval Queue
  
        </h2>
  
        {
  
          pendingRiders.length === 0
  
          ?
  
          (
  
            <p className="
            text-zinc-400
            ">
  
              No Pending Riders
  
            </p>
  
          )
  
          :
  
          (
  
            <div className="space-y-4">
  
              {
  
                pendingRiders.map(
                  rider => (
  
                    <div
  
                      key={rider.id}
  
                      className="
                      flex
                      justify-between
                      items-center
                      bg-zinc-800
                      p-4
                      rounded-2xl
                      "
  
                    >
  
                      <div>
  
                        <h3 className="
                        font-semibold
                        ">
  
                          {rider.name}
  
                        </h3>
  
                        <p className="
                        text-zinc-400
                        ">
  
                          {rider.email}
  
                        </p>
  
                      </div>
  
                      <button
  
                        onClick={() =>
                          onApprove(
                            rider.id
                          )
                        }
  
                        className="
                        bg-green-500
                        px-4
                        py-2
                        rounded-xl
                        "
  
                      >
  
                        Approve
  
                      </button>
  
                    </div>
  
                  )
                )
  
              }
  
            </div>
  
          )
  
        }
  
      </div>
  
    );
  
  };
  
  export default PendingApprovalQueue;