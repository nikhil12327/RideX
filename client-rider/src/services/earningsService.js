import {
    doc,
    updateDoc,
    increment
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  export const updateRiderEarnings =
    async (riderId, fare) => {
  
      await updateDoc(
  
        doc(db, "riders", riderId),
  
        {
          totalEarnings:
            increment(fare),
  
          completedRides:
            increment(1)
        }
  
      );
  
    };