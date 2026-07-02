import {
    collection,
    addDoc,
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  export const submitReview =
    async (reviewData) => {
  
      return await addDoc(
        collection(db, "reviews"),
        reviewData
      );
  };