import {
    doc,
    getDoc,
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  export const getCustomerProfile =
  async (uid) => {

    console.log(
      "Fetching customer:",
      uid
    );

    const docRef =
      doc(
        db,
        "customers",
        uid
      );

    const docSnap =
      await getDoc(docRef);

    console.log(
      "Document exists:",
      docSnap.exists()
    );

    console.log(
      "Document data:",
      docSnap.data()
    );

    if (
      docSnap.exists()
    ) {

      return docSnap.data();

    }

    return null;

};