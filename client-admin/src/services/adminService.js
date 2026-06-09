import {
    collection,
    getDocs,
  } from "firebase/firestore";
  
  import {
    db,
  } from "../firebase/config";
  
  
  export const getDashboardStats =
    async () => {
  
      const ridesSnapshot =
        await getDocs(
          collection(
            db,
            "rides"
          )
        );
  
      const ridersSnapshot =
        await getDocs(
          collection(
            db,
            "riders"
          )
        );
  
      const customersSnapshot =
        await getDocs(
          collection(
            db,
            "customers"
          )
        );
  
      console.log(
        "Rides Count:",
        ridesSnapshot.size
      );
  
      console.log(
        "Riders Count:",
        ridersSnapshot.size
      );
  
      console.log(
        "Customers Count:",
        customersSnapshot.size
      );
  
      const rides =
        ridesSnapshot.docs.map(
          (doc) => doc.data()
        );
  
      console.log(
        "Rides Data:",
        rides
      );
  
      const totalRevenue =
        rides
          .filter(
            (ride) =>
              ride.status ===
              "completed"
          )
          .reduce(
            (
              sum,
              ride
            ) =>
              sum +
              (ride.fare || 0),
            0
          );
  
      return {
  
        totalRides:
          rides.length,
  
        totalRiders:
          ridersSnapshot.size,
  
        totalCustomers:
          customersSnapshot.size,
  
        totalRevenue,
  
        pendingRides:
          rides.filter(
            (ride) =>
              ride.status ===
              "pending"
          ).length,
  
        activeRides:
          rides.filter(
            (ride) =>
              [
                "accepted",
                "arrived",
                "started",
              ].includes(
                ride.status
              )
          ).length,
  
        completedRides:
          rides.filter(
            (ride) =>
              ride.status ===
              "completed"
          ).length,

          cancelledRides:
  rides.filter(
    ride =>
      ride.status ===
      "cancelled"
  ).length,
  
      };
  
    };
  
  export const getAllRiders =
    async () => {
  
      const snapshot =
        await getDocs(
          collection(
            db,
            "riders"
          )
        );
  
      const riders =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );
  
      console.log(
        "Riders Data:",
        riders
      );
  
      return riders;
  
    };
  
  
  export const getAllCustomers =
    async () => {
  
      const snapshot =
        await getDocs(
          collection(
            db,
            "customers"
          )
        );
  
      const customers =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );
  
      console.log(
        "Customers Data:",
        customers
      );
  
      return customers;
  
    };

    export const getAllRides =
  async () => {

    const snapshot =
      await getDocs(
        collection(
          db,
          "rides"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

  };