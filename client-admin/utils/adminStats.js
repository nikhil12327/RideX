export const calculateStats =
  (
    rides,
    ridersCount,
    customersCount
  ) => {

    return {

      totalRides:
        rides.length,

      totalRiders:
        ridersCount,

      totalCustomers:
        customersCount,

      pendingRides:
        rides.filter(
          ride =>
            ride.status === "pending"
        ).length,

      activeRides:
        rides.filter(
          ride =>
            [
              "accepted",
              "arrived",
              "started"
            ].includes(
              ride.status
            )
        ).length,

      completedRides:
        rides.filter(
          ride =>
            ride.status === "completed"
        ).length,

      totalRevenue:
        rides
          .filter(
            ride =>
              ride.status === "completed"
          )
          .reduce(
            (sum, ride) =>
              sum +
              (ride.fare || 0),
            0
          ),

    };

  };