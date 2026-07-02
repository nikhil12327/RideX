import {
  collection,
  query,
  where,
  onSnapshot
}
from "firebase/firestore";
  
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

      },

      (error) => {

        console.error(
          "RIDES SNAPSHOT ERROR:",
          error
        );

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

      },

      (error) => {

        console.error(
          "RIDERS SNAPSHOT ERROR:",
          error
        );

      }

    );

};

export const subscribeToSOSAlerts =
  (callback) => {

    const q = query(

      collection(
        db,
        "sosAlerts"
      ),

      where(
        "status",
        "==",
        "active"
      )

    );

    return onSnapshot(

      q,

      (snapshot) => {

        callback(

          snapshot.docs.map(
            doc => ({
              id: doc.id,
              ...doc.data()
            })
          )

        );

      }

    );

  };