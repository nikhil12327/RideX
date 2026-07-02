import {
    doc,
    updateDoc,
    increment
  } from "firebase/firestore";
  
  import { db }
  from "../firebase/config";
  
  export const completePayment =
    async (
      customerId,
      rideId,
      fare,
      method
    ) => {
  
      if (method === "wallet") {
  
        await updateDoc(
  
          doc(
            db,
            "customers",
            customerId
          ),
  
          {
  
            walletBalance:
              increment(-fare)
  
          }
  
        );
  
      }
  
      await updateDoc(
  
        doc(
          db,
          "rides",
          rideId
        ),
  
        {
  
          paymentMethod:
            method,
  
          paymentStatus:
            "paid"
  
        }
  
      );
  
    };