import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    deleteDoc,
    doc
  } from "firebase/firestore";
  
  import { db }
  from "../firebase/config";
  
  export const addFavoritePlace =
    async (data) => {
  
      return await addDoc(
  
        collection(
          db,
          "favoritePlaces"
        ),
  
        data
  
      );
  
    };
  
  export const subscribeToFavorites = (
  
    userId,
  
    callback
  
  ) => {
  
    const q = query(
  
      collection(
        db,
        "favoritePlaces"
      ),
  
      where(
        "customerId",
        "==",
        userId
      )
  
    );
  
    return onSnapshot(
  
      q,
  
      (snapshot) => {
  
        const places =
  
          snapshot.docs.map(
  
            (doc) => ({
  
              id: doc.id,
  
              ...doc.data()
  
            })
  
          );
  
        callback(places);
  
      }
  
    );
  
  };
  
  export const deleteFavoritePlace =
    async (id) => {
  
      await deleteDoc(
  
        doc(
          db,
          "favoritePlaces",
          id
        )
  
      );
  
    };