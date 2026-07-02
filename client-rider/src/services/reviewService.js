import {
    collection,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  export const getRiderReviews =
    async (riderId) => {
  
      const q = query(
        collection(db, "reviews"),
        where(
          "riderId",
          "==",
          riderId
        )
      );
  
      const snapshot =
        await getDocs(q);
  
      return snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data(),
        })
      );
  };