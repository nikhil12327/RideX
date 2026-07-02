import { initializeApp } from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCMyzdyGPyXpJMdpjnOAFmzvp5x22JwNMM",
    authDomain: "bike-taxi-clone-v2.firebaseapp.com",
    projectId: "bike-taxi-clone-v2",
    storageBucket: "bike-taxi-clone-v2.firebasestorage.app",
    messagingSenderId: "1098158318582",
    appId: "1:1098158318582:web:50214e3444b804b3969dd7",
    measurementId: "G-K9YRXS428P"
  };

  const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);


export { db };