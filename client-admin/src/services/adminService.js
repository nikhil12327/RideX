import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";


// ========================================
// DASHBOARD STATS
// ========================================

export const getDashboardStats =
  async () => {

    try {

      const ridesSnapshot =
        await getDocs(
          collection(db, "rides")
        );

      const ridersSnapshot =
        await getDocs(
          collection(db, "riders")
        );

      const customersSnapshot =
        await getDocs(
          collection(db, "customers")
        );

      const rides =
        ridesSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      const totalRevenue =
        rides
          .filter(
            (ride) =>
              ride.status === "completed"
          )
          .reduce(
            (sum, ride) =>
              sum + Number(ride.fare || 0),
            0
          );

      return {

        totalRides:
          rides.length,

        totalRiders:
          ridersSnapshot.size,

        totalCustomers:
          customersSnapshot.size,

        totalRevenue,

        pendingRides:
          rides.filter(
            (ride) =>
              ride.status === "pending"
          ).length,

        activeRides:
          rides.filter(
            (ride) =>
              [
                "accepted",
                "arrived",
                "started",
              ].includes(
                ride.status
              )
          ).length,

        completedRides:
          rides.filter(
            (ride) =>
              ride.status === "completed"
          ).length,

        cancelledRides:
          rides.filter(
            (ride) =>
              ride.status === "cancelled"
          ).length,

      };

    } catch (error) {

      console.log(
        "Dashboard Stats Error:",
        error
      );

      throw error;

    }

  };


// ========================================
// GET ALL RIDERS
// ========================================

export const getAllRiders =
  async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "riders")
        );

      return snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    } catch (error) {

      console.log(
        "Get Riders Error:",
        error
      );

      throw error;

    }

  };


// ========================================
// GET ALL CUSTOMERS
// ========================================

export const getAllCustomers =
  async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "customers")
        );

      return snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    } catch (error) {

      console.log(
        "Get Customers Error:",
        error
      );

      throw error;

    }

  };


// ========================================
// GET ALL RIDES
// ========================================

export const getAllRides =
  async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "rides")
        );

      return snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    } catch (error) {

      console.log(
        "Get Rides Error:",
        error
      );

      throw error;

    }

  };


// ========================================
// APPROVE RIDER
// ========================================

export const approveRider =
  async (riderId) => {

    try {

      await updateDoc(

        doc(
          db,
          "riders",
          riderId
        ),

        {
          isApproved: true,
        }

      );

    } catch (error) {

      console.log(
        "Approve Rider Error:",
        error
      );

      throw error;

    }

  };


// ========================================
// SUSPEND / ACTIVATE RIDER
// ========================================

export const suspendRider =
  async (
    riderId,
    currentStatus
  ) => {

    try {

      await updateDoc(

        doc(
          db,
          "riders",
          riderId
        ),

        {
          isSuspended:
            !currentStatus,
        }

      );

    } catch (error) {

      console.log(
        "Suspend Rider Error:",
        error
      );

      throw error;

    }

  };


// ========================================
// DELETE CUSTOMER
// ========================================

export const deleteCustomer =
  async (customerId) => {

    try {

      await deleteDoc(

        doc(
          db,
          "customers",
          customerId
        )

      );

    } catch (error) {

      console.log(
        "Delete Customer Error:",
        error
      );

      throw error;

    }

  };