import { LocateFixed } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

import LocationAutocomplete
from "./LocationAutocomplete";

const SearchRideCard = ({
  pickup,
  drop,
  setPickup,
  setDrop,
  setPickupCoords,
  setDropCoords,
  onBookRide,
}) => {

  const [loadingLocation,
    setLoadingLocation] =
    useState(false);

  // ====================================
  // Current Location
  // ====================================

  const handleCurrentLocation = () => {

    if (!navigator.geolocation) {

      toast.error(
        "Geolocation not supported"
      );

      return;

    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        try {

          const response =
            await fetch(

              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

            );

          const data =
            await response.json();

          setPickup(
            data.display_name
          );

          setPickupCoords({

            lat: latitude,
            lon: longitude

          });

          toast.success(
            "Current location selected"
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Unable to fetch address"
          );

        } finally {

          setLoadingLocation(false);

        }

      },

      (error) => {

        console.log(error);

        toast.error(
          "Location permission denied"
        );

        setLoadingLocation(false);

      },

      {
        enableHighAccuracy: true
      }

    );

  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        delay: 0.2
      }}

      className="
      ridex-card
      p-5
      mb-6
      backdrop-blur-xl
      "

    >

      <h2 className="
      text-xl
      font-bold
      mb-5
      ">

        Book Your Ride

      </h2>

      <div className="space-y-4">

        {/* Pickup */}

        <div>

          <label className="
          text-sm
          text-zinc-400
          mb-2
          block
          ">

            Pickup Location

          </label>

          <LocationAutocomplete

            value={pickup}

            setValue={setPickup}

            onSelect={
              setPickupCoords
            }

          />

        </div>

        {/* Current Location */}

        <button

          onClick={
            handleCurrentLocation
          }

          className="
          w-full
          bg-zinc-800
          hover:bg-zinc-700
          transition-all
          py-3
          rounded-2xl
          font-semibold
          flex
          justify-center
          items-center
          gap-2
          "

        >

          <LocateFixed size={18} />

          {

            loadingLocation

            ?

            "Fetching Location..."

            :

            "Use Current Location"

          }

        </button>

        {/* Drop */}

        <div>

          <label className="
          text-sm
          text-zinc-400
          mb-2
          block
          ">

            Drop Location

          </label>

          <LocationAutocomplete

            value={drop}

            setValue={setDrop}

            onSelect={
              setDropCoords
            }

          />

        </div>

        {/* Book Ride */}

        <motion.button

          whileTap={{
            scale: 0.95
          }}

          whileHover={{
            scale: 1.02
          }}

          onClick={onBookRide}

          className="
          ridex-btn-primary
          mt-2
          w-full
          "

        >

          Search Rides

        </motion.button>

      </div>

    </motion.div>

  );

};

export default SearchRideCard;