import {
    doc,
    onSnapshot,
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  export const getAddressFromCoords =
    async (
      latitude,
      longitude
    ) => {
  
      try {
  
        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
  
        const data =
          await response.json();
  
        return (
          data.display_name
        );
  
      } catch (error) {
  
        console.log(error);
  
        return null;
  
      }
  
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