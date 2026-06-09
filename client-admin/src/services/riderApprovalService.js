import {
    doc,
    updateDoc,
  } from "firebase/firestore";
  
  import {
    db,
  } from "../firebase/config";
  
  export const approveRider =
    async (riderId) => {
  
      await updateDoc(
        doc(
          db,
          "riders",
          riderId
        ),
        {
          approved: true,
        }
      );
  
  };
  
  export const suspendRider =
    async (riderId) => {
  
      await updateDoc(
        doc(
          db,
          "riders",
          riderId
        ),
        {
          suspended: true,
        }
      );
  
  };