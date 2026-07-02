import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    getDoc
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  // ============================
  // Pending Ride Requests
  // ============================
  
  export const subscribeToPendingRides = (
    callback
  ) => {
  
    const q = query(
      collection(db, "rides"),
      where("status", "==", "pending")
    );
  
    return onSnapshot(q, (snapshot) => {
  
      const rides = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      callback(rides);
  
    });
  
  };
  
  // ============================
  // Accept Ride
  // ============================
  
  export const acceptRide = async (
  
    rideId,
  
    riderId,
  
    riderEmail
  
  ) => {
  
    // Fetch Rider Profile
  
    const riderRef = doc(
      db,
      "riders",
      riderId
    );
  
    const riderSnap =
      await getDoc(riderRef);
  
    if (!riderSnap.exists()) {
  
      throw new Error(
        "Rider profile not found"
      );
  
    }
  
    const rider =
      riderSnap.data();
  
    // Update Ride
  
    await updateDoc(
  
      doc(
        db,
        "rides",
        rideId
      ),
  
      {
  
        status: "accepted",
  
        riderId,
  
        riderEmail,
  
        riderName:
          rider.name ||
  
          riderEmail
            ?.split("@")[0] ||
  
          "Rider",
  
        riderPhone:
          rider.phone ||
  
          "",
  
        vehicleNumber:
          rider.vehicleNumber ||
  
          "",
  
        vehicleModel:
          rider.vehicleModel ||
  
          "",
  
        riderPhoto:
          rider.photoURL ||
  
          "",
  
        acceptedAt:
          Date.now()
  
      }
  
    );
  
  };
  
  // ============================
  // Reject Ride
  // ============================
  
  export const rejectRide =
  async (rideId) => {
  
    await updateDoc(
  
      doc(
        db,
        "rides",
        rideId
      ),
  
      {
  
        status: "cancelled"
  
      }
  
    );
  
  };
  
  // ============================
// Update Ride Status
// ============================

export const updateRideStatus =
async (

  rideId,

  status

) => {

  const rideRef = doc(
    db,
    "rides",
    rideId
  );

  if (status === "completed") {

    await updateDoc(

      rideRef,

      {

        status: "completed",

        completedAt: Date.now(),

        paymentRequested: true,

        paymentDone: false,

        paymentMethod: null

      }

    );

    return;

  }

  await updateDoc(

    rideRef,

    {

      status

    }

  );

};
  
  // ============================
  // Active Ride
  // ============================
  
  export const subscribeToActiveRide = (
  
    riderId,
  
    callback
  
  ) => {
  
    const q = query(
  
      collection(
        db,
        "rides"
      ),
  
      where(
        "riderId",
        "==",
        riderId
      )
  
    );
  
    return onSnapshot(
  
      q,
  
      (snapshot) => {
  
        const rides =
  
          snapshot.docs.map(
  
            doc => ({
  
              id: doc.id,
  
              ...doc.data()
  
            })
  
          );
  
        const activeRide =
  
          rides.find(
  
            ride =>
  
              ride.status === "accepted" ||
  
              ride.status === "arrived" ||
  
              ride.status === "started"
  
          );
  
        callback(
          activeRide || null
        );
  
      }
  
    );
  
  };
  
  // ============================
  // Completed Ride History
  // ============================
  
  export const subscribeToCompletedRides = (
  
    riderId,
  
    callback
  
  ) => {
  
    const q = query(
  
      collection(
        db,
        "rides"
      ),
  
      where(
        "riderId",
        "==",
        riderId
      ),
  
      where(
        "status",
        "==",
        "completed"
      )
  
    );
  
    return onSnapshot(
  
      q,
  
      (snapshot) => {
  
        const rides =
  
          snapshot.docs.map(
  
            doc => ({
  
              id: doc.id,
  
              ...doc.data()
  
            })
  
          );
  
        callback(rides);
  
      }
  
    );
  
  };