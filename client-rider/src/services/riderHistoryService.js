import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  export const subscribeToRiderHistory =
    (riderId, callback) => {
  
      const q = query(
  
        collection(db, "rides"),
  
        where(
          "riderId",
          "==",
          riderId
        ),
  
        orderBy(
          "createdAt",
          "desc"
        )
  
      );
  
      return onSnapshot(
  
        q,
  
        (snapshot) => {
  
          const rides =
  
            snapshot.docs.map(doc => ({
  
              id: doc.id,
  
              ...doc.data()
  
            }));
  
          callback(rides);
  
        }
  
      );
  
    };