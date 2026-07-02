import {
    collection,
    addDoc
  } from "firebase/firestore";
  
  import { db }
  from "../firebase/config";
  
  export const createSOSAlert =
    async (alertData) => {
  
      try {
  
        await addDoc(
  
          collection(
            db,
            "sosAlerts"
          ),
  
          alertData
  
        );
  
      } catch (error) {
  
        console.log(
          "SOS Error:",
          error
        );
  
        throw error;
  
      }
  
    };