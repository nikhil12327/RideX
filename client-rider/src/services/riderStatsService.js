import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  // ==============================
  // Subscribe to Rider Stats
  // ==============================
  
  export const subscribeToRiderStats =
    (riderId, callback) => {
  
      return onSnapshot(
  
        doc(
          db,
          "riders",
          riderId
        ),
  
        (snapshot) => {
  
          if (snapshot.exists()) {
  
            callback({
              id: snapshot.id,
              ...snapshot.data()
            });
  
          }
  
        }
  
      );
  
    };
  
  // ==============================
  // Get Rider Stats Once
  // ==============================
  
  export const getRiderStats =
    async (riderId) => {
  
      try {
  
        const snap = await getDoc(
  
          doc(
            db,
            "riders",
            riderId
          )
  
        );
  
        if (!snap.exists()) {
  
          return null;
  
        }
  
        return {
  
          id: snap.id,
  
          ...snap.data()
  
        };
  
      } catch (error) {
  
        console.log(
          "Get Rider Stats Error:",
          error
        );
  
        return null;
  
      }
  
    };
  
  // ==============================
  // Update Online Status
  // ==============================
  
  export const updateRiderOnlineStatus =
    async (
      riderId,
      isOnline
    ) => {
  
      try {
  
        await updateDoc(
  
          doc(
            db,
            "riders",
            riderId
          ),
  
          {
            isOnline,
            lastSeen:
              Date.now()
          }
  
        );
  
      } catch (error) {
  
        console.log(
          "Update Status Error:",
          error
        );
  
      }
  
    };