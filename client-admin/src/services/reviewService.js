import {
    collection,
    getDocs,
  } from "firebase/firestore";
  
  import {
    db,
  } from "../firebase/config";
  
  export const getAllReviews = async () => {
  
    const snapshot =
      await getDocs(
        collection(
          db,
          "reviews"
        )
      );
  
    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  
  };
  console.log("reviewService loaded");