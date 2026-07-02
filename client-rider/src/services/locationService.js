import {
    doc,
    setDoc,
    onSnapshot,
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  export const updateRiderLocation =
    async (
      riderId,
      latitude,
      longitude
    ) => {
  
      await setDoc(
        doc(
          db,
          "riderLocations",
          riderId
        ),
        {
          riderId,
          latitude,
          longitude,
          updatedAt:
            Date.now(),
        }
      );
    };
  
  export const subscribeToRiderLocation =
    (
      riderId,
      callback
    ) => {
  
      return onSnapshot(
  
        doc(
          db,
          "riderLocations",
          riderId
        ),
  
        (snapshot) => {
  
          if (
            snapshot.exists()
          ) {
  
            callback(
              snapshot.data()
            );
  
          }
  
        }
  
      );
  
    };