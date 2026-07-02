import {
    useEffect,
    useState
  } from "react";
  
  import {
    Heart,
    Plus,
    Trash2
  } from "lucide-react";
  
  import {
    useAuth
  } from "../context/AuthContext";
  
  import {
    addFavoritePlace,
    subscribeToFavorites,
    deleteFavoritePlace
  } from "../services/favoriteService";
  
  import BottomNavV2
  from "../components/dashboard-v2/BottomNavV2";
  
  import toast
  from "react-hot-toast";
  
  const Favorites = () => {
  
    const { user } =
      useAuth();
  
    const [places, setPlaces] =
      useState([]);
  
    const [title, setTitle] =
      useState("");
  
    const [address, setAddress] =
      useState("");
  
    useEffect(() => {
  
      if (!user) return;
  
      const unsubscribe =
  
        subscribeToFavorites(
  
          user.uid,
  
          setPlaces
  
        );
  
      return () =>
        unsubscribe();
  
    }, [user]);
  
    const handleAdd =
      async () => {
  
        if (
          !title ||
          !address
        ) {
  
          toast.error(
            "Please fill all fields"
          );
  
          return;
  
        }
  
        try {
  
          await addFavoritePlace({
  
            customerId:
              user.uid,
  
            title,
  
            address,
  
            createdAt:
              Date.now()
  
          });
  
          setTitle("");
          setAddress("");
  
          toast.success(
            "Place Added"
          );
  
        } catch (error) {
  
          toast.error(
            "Unable to save place"
          );
  
        }
  
      };
  
    return (
  
      <div className="
      min-h-screen
      bg-gradient-to-b
      from-zinc-950
      via-black
      to-zinc-900
      text-white
      p-5
      pb-32
      ">
  
        <h1 className="
        text-3xl
        font-bold
        mb-8
        ">
  
          Favorite Places
  
        </h1>
  
        <div className="
        glass
        rounded-3xl
        p-5
        mb-8
        space-y-4
        ">
  
          <input
  
            placeholder="Place Name"
  
            value={title}
  
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
  
            className="
            w-full
            p-3
            rounded-2xl
            bg-zinc-900
            outline-none
            "
  
          />
  
          <input
  
            placeholder="Address"
  
            value={address}
  
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
  
            className="
            w-full
            p-3
            rounded-2xl
            bg-zinc-900
            outline-none
            "
  
          />
  
          <button
  
            onClick={
              handleAdd
            }
  
            className="
            ridex-btn-primary
            "
  
          >
  
            <Plus
              size={18}
            />
  
            Add Place
  
          </button>
  
        </div>
  
        <div className="
        space-y-4
        ">
  
          {
  
            places.map(
  
              (place) => (
  
                <div
  
                  key={place.id}
  
                  className="
                  glass
                  rounded-3xl
                  p-5
                  flex
                  justify-between
                  items-center
                  "
  
                >
  
                  <div>
  
                    <div className="
                    flex
                    items-center
                    gap-2
                    ">
  
                      <Heart
                        className="
                        text-yellow-400
                        "
                      />
  
                      <h2 className="
                      font-bold
                      ">
  
                        {place.title}
  
                      </h2>
  
                    </div>
  
                    <p className="
                    text-zinc-400
                    mt-2
                    ">
  
                      {place.address}
  
                    </p>
  
                  </div>
  
                  <button
  
                    onClick={() =>
                      deleteFavoritePlace(
                        place.id
                      )
                    }
  
                  >
  
                    <Trash2
                      className="
                      text-red-400
                      "
                    />
  
                  </button>
  
                </div>
  
              )
  
            )
  
          }
  
        </div>
  
        <BottomNavV2 />
  
      </div>
  
    );
  
  };
  
  export default Favorites;