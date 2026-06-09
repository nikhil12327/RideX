import {
    collection,
    onSnapshot,
  } from "firebase/firestore";
  
  import {
    db,
  } from "../firebase/config";
  
  export const subscribeToRides =
    (callback) => {
  
      return onSnapshot(
  
        collection(
          db,
          "rides"
        ),
  
        (snapshot) => {
  
          const rides =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );
  
          callback(rides);
  
        }
  
      );
  
  };
  
  export const subscribeToRiders =
    (callback) => {
  
      return onSnapshot(
  
        collection(
          db,
          "riders"
        ),
  
        (snapshot) => {
  
          const riders =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );
  
          callback(riders);
  
        }
  
      );
  
  };