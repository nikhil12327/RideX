import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";

  import {
    onSnapshot,
  } from "firebase/firestore";
  
  export const createRiderProfile = async (
    uid,
    riderData
  ) => {
    console.log("Creating rider profile...");
  
    await setDoc(
      doc(db, "riders", uid),
      riderData
    );
  
    console.log("Profile created successfully");
  };
  
  export const getRiderProfile = async (
    uid
  ) => {
    const docRef = doc(db, "riders", uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data();
    }
  
    return null;
  };
  
  export const updateRiderStatus = async (
    uid,
    status
  ) => {
    console.log("Updating rider:", uid);
    console.log("Status:", status);
  
    const riderRef = doc(db, "riders", uid);
  
    await updateDoc(riderRef, {
      online: status,
    });
  
    console.log("Firestore update completed");
  };

  export const addEarnings = async (
    riderId,
    amount
  ) => {
  
    const riderRef = doc(
      db,
      "riders",
      riderId
    );
  
    const riderSnap =
      await getDoc(riderRef);
  
    if (!riderSnap.exists()) {
      return;
    }
  
    const currentEarnings =
      riderSnap.data().earnings || 0;
  
    await updateDoc(
      riderRef,
      {
        earnings:
          currentEarnings + amount,
      }
    );
  };

  export const subscribeToRider = (
    riderId,
    callback
  ) => {
  
    const riderRef = doc(
      db,
      "riders",
      riderId
    );
  
    return onSnapshot(
      riderRef,
      (snapshot) => {
  
        console.log(
          "Document Exists:",
          snapshot.exists()
        );
  
        console.log(
          "Document Data:",
          snapshot.data()
        );
  
        if (
          snapshot.exists()
        ) {
  
          callback(
            snapshot.data()
          );
  
        } else {
  
          callback(null);
  
        }
  
      }
    );
  
  };