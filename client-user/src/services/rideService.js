import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  onSnapshot,
} from "firebase/firestore";

import {
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const subscribeToPendingRides =
  (callback) => {

    const q = query(
      collection(db, "rides"),
      where(
        "status",
        "==",
        "pending"
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

export const subscribeToCustomerRides = (
  customerId,
  callback
) => {

  const q = query(
    collection(db, "rides"),
    where(
      "customerId",
      "==",
      customerId
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

export const createRide = async (
  rideData
) => {

  return await addDoc(
    collection(db, "rides"),
    rideData
  );
};

export const getCustomerRides =
  async (customerId) => {

    const q = query(
      collection(db, "rides"),
      where(
        "customerId",
        "==",
        customerId
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
};

export const subscribeToCompletedCustomerRides =
(
  customerId,
  callback
) => {

  const q = query(
    collection(db, "rides"),
    where(
      "customerId",
      "==",
      customerId
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

export const cancelRide = async (
  rideId
) => {

  const rideRef = doc(
    db,
    "rides",
    rideId
  );

  await updateDoc(
    rideRef,
    {
      status: "cancelled",
    }
  );
};

export const updateRideReviewStatus =
  async (rideId) => {

    const rideRef =
      doc(
        db,
        "rides",
        rideId
      );

    await updateDoc(
      rideRef,
      {
        reviewSubmitted: true,
      }
    );
};