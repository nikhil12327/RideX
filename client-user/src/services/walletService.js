import {
    doc,
    getDoc,
    updateDoc,
    increment,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot
  } from "firebase/firestore";
  
  import { db } from "../firebase/config";
  
  // =========================
  // Get Wallet Balance
  // =========================
  
  export const getWalletBalance = async (userId) => {
  
    const snap = await getDoc(
      doc(db, "customers", userId)
    );
  
    if (!snap.exists()) return 0;
  
    return snap.data().walletBalance || 0;
  
  };
  
  // =========================
  // Add Money
  // =========================
  
  export const addMoneyToWallet = async (
    userId,
    amount
  ) => {
  
    await updateDoc(
  
      doc(
        db,
        "customers",
        userId
      ),
  
      {
  
        walletBalance:
          increment(amount)
  
      }
  
    );
  
    await addDoc(
  
      collection(
        db,
        "walletTransactions"
      ),
  
      {
  
        userId,
  
        amount,
  
        type: "credit",
  
        description:
          "Wallet Recharge",
  
        createdAt:
          Date.now()
  
      }
  
    );
  
  };
  
  // =========================
  // Deduct Wallet Amount
  // =========================
  
  export const deductWalletAmount = async (
  
    userId,
  
    amount,
  
    rideId = ""
  
  ) => {
  
    // Customer Document
  
    const customerRef = doc(
  
      db,
  
      "customers",
  
      userId
  
    );
  
    const customerSnap = await getDoc(
      customerRef
    );
  
    if (!customerSnap.exists()) {
  
      throw new Error(
        "Customer not found"
      );
  
    }
  
    const currentBalance =
  
      customerSnap.data()
        .walletBalance || 0;
  
    // Wallet Balance Check
  
    if (currentBalance < amount) {
  
      throw new Error(
        "Insufficient Wallet Balance"
      );
  
    }
  
    // Deduct Wallet
  
    await updateDoc(
  
      customerRef,
  
      {
  
        walletBalance:
          increment(-amount),
  
        totalSpent:
          increment(amount)
  
      }
  
    );
  
    // Wallet Transaction
  
    await addDoc(
  
      collection(
        db,
        "walletTransactions"
      ),
  
      {
  
        userId,
  
        amount,
  
        rideId,
  
        type: "debit",
  
        description:
          "Ride Payment",
  
        createdAt:
          Date.now()
  
      }
  
    );
  
    // Update Ride Payment Status
  
    if (rideId) {
  
      await updateDoc(
  
        doc(
          db,
          "rides",
          rideId
        ),
  
        {
  
          paymentDone: true,
  
          paymentMethod: "wallet",
  
          paymentStatus: "paid",
  
          paymentTime: Date.now()
  
        }
  
      );
  
    }
  
  };
  
  // =========================
  // Subscribe Wallet Transactions
  // =========================
  
  export const subscribeToTransactions = (
  
    userId,
  
    callback
  
  ) => {
  
    const q = query(
  
      collection(
        db,
        "walletTransactions"
      ),
  
      where(
        "userId",
        "==",
        userId
      ),
  
      orderBy(
        "createdAt",
        "desc"
      )
  
    );
  
    return onSnapshot(
  
      q,
  
      (snapshot) => {
  
        const transactions =
  
          snapshot.docs.map(
  
            doc => ({
  
              id: doc.id,
  
              ...doc.data()
  
            })
  
          );
  
        callback(
          transactions
        );
  
      }
  
    );
  
  };