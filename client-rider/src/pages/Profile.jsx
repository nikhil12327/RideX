import { useEffect, useState } from "react";
import BottomNavbar from "../components/dashboard/BottomNavbar";
import { useAuth } from "../context/AuthContext";
import {
    getRiderReviews,
  } from "../services/reviewService";

import {
  getRiderProfile,
} from "../services/riderService";

import {
  signOut,
} from "firebase/auth";

import {
  auth,
} from "../firebase/config";

import {
  useNavigate,
} from "react-router-dom";

const Profile = () => {

  const { user } = useAuth();

  const navigate = useNavigate();

  const [profile,
    setProfile] = useState(null);

  const [reviews, setReviews] =
    useState([]);
  
  const [avgRating,
    setAvgRating] =
    useState(0);  

  useEffect(() => {
    if (!user) return;

    const fetchReviews =
  async () => {

    try {

      const data =
        await getRiderReviews(
          user.uid
        );

      setReviews(data);

      if (
        data.length > 0
      ) {

        const total =
          data.reduce(
            (
              sum,
              review
            ) =>
              sum +
              review.rating,
            0
          );

        setAvgRating(
          (
            total /
            data.length
          ).toFixed(1)
        );
      }

    } catch (error) {

      console.log(error);

    }
  };

    const fetchProfile =
      async () => {

        try {

          const data =
            await getRiderProfile(
              user.uid
            );

          setProfile(data);

        } catch (error) {

          console.log(error);

        }
      };

    if (user) {

  fetchProfile();

  fetchReviews();

}
  }, [user]);

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        navigate("/login");

      } catch (error) {

        console.log(error);

      }
    };

  if (!profile) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">

      <div className="bg-zinc-900 rounded-3xl p-6">

        <div className="flex justify-center mb-6">

          <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-black text-3xl font-bold">

            {profile.name
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center mb-6">

          {profile.name}

        </h1>

        <div className="space-y-4">

          <div className="bg-zinc-800 p-4 rounded-xl">
            <p className="text-zinc-400">
              Email
            </p>
            <p>
              {profile.email}
            </p>
          </div>

          <div className="bg-zinc-800 p-4 rounded-xl">

  <p className="text-zinc-400">
    Phone Number
  </p>

  <p>
    {profile.phone}
  </p>

</div>

<div className="bg-zinc-800 p-4 rounded-xl">

  <p className="text-zinc-400">
    Vehicle Number
  </p>

  <p>
    {profile.vehicleNumber}
  </p>

</div>

          <div className="bg-zinc-800 p-4 rounded-xl">
            <p className="text-zinc-400">
              Status
            </p>
            <p>
              {profile.online
                ? "Online 🟢"
                : "Offline 🔴"}
            </p>
          </div>

          <div className="bg-zinc-800 p-4 rounded-xl">
            <p className="text-zinc-400">
              Total Earnings
            </p>
            <p className="text-yellow-400 text-xl font-bold">
              ₹{profile.earnings || 0}
            </p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-xl">

            <p className="text-zinc-400">
            Average Rating
            </p>

            <p className="text-yellow-400 text-2xl font-bold">
            ⭐ {avgRating}
            </p>

            <p className="text-zinc-500 text-sm">
            {reviews.length} Reviews
            </p>

            </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 hover:bg-red-600 transition-all py-3 rounded-xl font-bold"
        >
          Logout
        </button>

        </div>

            <div className="mt-6">

            <h2 className="text-xl font-bold mb-4">

                Customer Reviews

            </h2>

            {reviews.length === 0 ? (

                <p className="text-zinc-400">

                No Reviews Yet

                </p>

            ) : (

                reviews.map((review) => (

                <div
                    key={review.id}
                    className="bg-zinc-900 p-4 rounded-xl mb-3"
                >

                    <p className="text-yellow-400">

                    {"⭐".repeat(
                        review.rating
                    )}

                    </p>

                    <p className="mt-2">

                    {review.review}

                    </p>

                </div>

                ))

            )}

            </div>

      <BottomNavbar />
    </div>
  );
};

export default Profile;