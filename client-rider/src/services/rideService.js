import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    onSnapshot,
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  export const createRide = async (
    rideData
  ) => {
    return await addDoc(
      collection(db, "rides"),
      rideData
    );
  };
  
  export const getPendingRides = async () => {
    const q = query(
      collection(db, "rides"),
      where("status", "==", "pending")
    );
  
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  
  export const subscribeToPendingRides = (
    callback
  ) => {
    const q = query(
      collection(db, "rides"),
      where("status", "==", "pending")
    );
  
    return onSnapshot(q, (snapshot) => {
      const rides = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      callback(rides);
    });
  };
  
  export const acceptRide = async (
    rideId,
    rider
  ) => {
    if (!rider || !rider.uid) {
      console.error("Rider data missing", rider);
      return;
    }
  
    const rideRef = doc(db, "rides", rideId);
  
    await updateDoc(rideRef, {
      status: "accepted",
      riderId: rider.uid,
      riderName: rider.name || "",
      riderPhone: rider.phone || "",
      vehicleNumber: rider.vehicleNumber || "",
    });
  };
  
  export const updateRideStatus = async (
    rideId,
    status
  ) => {
    const rideRef = doc(db, "rides", rideId);
  
    await updateDoc(rideRef, {
      status,
    });
  };
  
  export const getAcceptedRides = async (
    riderId
  ) => {
    const q = query(
      collection(db, "rides"),
      where("riderId", "==", riderId)
    );
  
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  export const subscribeToAcceptedRides =
(
  riderId,
  callback
) => {

  const q = query(
    collection(db, "rides"),
    where("riderId", "==", riderId)
  );

  return onSnapshot(
    q,
    (snapshot) => {

      const rides =
        snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            ride =>
              ride.status !== "completed" &&
              ride.status !== "cancelled"
          );

      callback(rides);

    }
  );
};

  export const subscribeToCompletedRides =
(
  riderId,
  callback
) => {

  const q = query(
    collection(db, "rides"),
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
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

      callback(rides);

    }
  );
};

export const cancelRide =
  async (
    rideId
  ) => {

    await updateDoc(
      doc(
        db,
        "rides",
        rideId
      ),
      {
        status:
          "cancelled",
      }
    );

};