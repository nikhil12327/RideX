import { createRide } from "../services/rideService";

const TestRide = () => {

  const createDummyRide = async () => {

    try {

      await createRide({
        pickup: "Brodipet",
        drop: "Lakshmipuram",
        fare: 120,
        status: "pending",
        riderId: "",
        customerId: "test-user",
        createdAt: Date.now(),
      });

      alert("Ride Created");

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <button
        onClick={createDummyRide}
        className="bg-yellow-400 px-6 py-3 rounded-lg font-bold"
      >
        Create Test Ride
      </button>

    </div>
  );
};

export default TestRide;