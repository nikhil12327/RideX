import {
    doc,
    setDoc
  } from "firebase/firestore";
  
  import { db }
  from "../firebase/config";
  
  export const startLocationTracking =
    (riderId) => {
  
      if (!navigator.geolocation) {
  
        console.log(
          "Geolocation not supported"
        );
  
        return null;
  
      }
  
      const watchId =
  
        navigator.geolocation.watchPosition(
  
          async (position) => {
  
            try {
  
              await setDoc(
  
                doc(
                  db,
                  "riderLocations",
                  riderId
                ),
  
                {
                    lat: position.coords.latitude,
                  
                    lon: position.coords.longitude,
                  
                    lng: position.coords.longitude,
                  
                    updatedAt: Date.now()
                  },
  
                {
                  merge: true
                }
  
              );
  
            } catch (error) {
  
              console.log(
                "Location Update Error:",
                error
              );
  
            }
  
          },
  
          (error) => {
  
            console.log(
              "Geolocation Error:",
              error
            );
  
          },
  
          {
  
            enableHighAccuracy: true,
  
            maximumAge: 5000,
  
            timeout: 10000
  
          }
  
        );
  
      return watchId;
  
    };
  
  export const stopLocationTracking =
    (watchId) => {
  
      if (watchId) {
  
        navigator.geolocation.clearWatch(
          watchId
        );
  
      }
  
    };