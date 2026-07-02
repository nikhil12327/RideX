import { useState } from "react";

import {
    submitReview,
  } from "../services/reviewService";
  
  import {
    updateRideReviewStatus,
  } from "../services/rideService";

import { useAuth } from "../context/AuthContext";

const ReviewForm = ({ ride }) => {

  const { user } = useAuth();

  const [rating, setRating] =
    useState(5);

  const [review, setReview] =
    useState("");

  const handleSubmit =
    async () => {

      try {

        await submitReview({

          riderId:
            ride.riderId,

          customerId:
            user.uid,

          rideId:
            ride.id,

          rating,

          review,

          createdAt:
            Date.now(),

        });
        await updateRideReviewStatus(
            ride.id
          );

          setRating(5);
          setReview("");
          
        alert(
          "Review Submitted"
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="bg-zinc-800 p-3 rounded-xl mt-3">

      <h4 className="text-yellow-400 font-bold mb-2">
        Rate Your Rider
      </h4>

      <select
        value={rating}
        onChange={(e) =>
          setRating(
            Number(
              e.target.value
            )
          )
        }
        className="w-full text-black p-2 rounded"
      >

        <option value={5}>
          ⭐⭐⭐⭐⭐
        </option>

        <option value={4}>
          ⭐⭐⭐⭐
        </option>

        <option value={3}>
          ⭐⭐⭐
        </option>

        <option value={2}>
          ⭐⭐
        </option>

        <option value={1}>
          ⭐
        </option>

      </select>

      <textarea
        placeholder="Write review..."
        value={review}
        onChange={(e) =>
          setReview(
            e.target.value
          )
        }
        className="w-full mt-3 p-2 rounded text-black"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold"
      >
        Submit Review
      </button>

    </div>
  );
};

export default ReviewForm;