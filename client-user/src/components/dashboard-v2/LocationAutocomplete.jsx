import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

import {
  searchLocations
}
from "../../services/locationSearchService";

const LocationAutocomplete = ({
  value,
  setValue,
  onSelect
}) => {

  const [suggestions,
    setSuggestions] =
    useState([]);

  useEffect(() => {

    const delay = setTimeout(

      async () => {

        if (value.length > 1) {

          const results =

            await searchLocations(
              value
            );

          setSuggestions(
            results
          );

        } else {

          setSuggestions([]);

        }

      },

      400

    );

    return () =>
      clearTimeout(delay);

  }, [value]);

  return (

    <div className="relative">

      <input

        value={value}

        onChange={(e) =>
          setValue(e.target.value)
        }

        className="
        ridex-input
        w-full
        "

        placeholder="Search location"

      />

      {

        suggestions.length > 0 && (

          <div className="
          absolute
          top-full
          left-0
          right-0
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          mt-2
          z-50
          max-h-64
          overflow-y-auto
          ">

            {

              suggestions.map(

                place => (

                  <div

                    key={place.place_id}

                    onClick={() => {

                      setValue(
                        place.display_name
                      );

                      onSelect({

                        lat:
                          Number(
                            place.lat
                          ),

                        lon:
                          Number(
                            place.lon
                          )

                      });

                      setSuggestions(
                        []
                      );

                    }}

                    className="
                    p-4
                    cursor-pointer
                    hover:bg-zinc-800
                    flex
                    gap-3
                    "

                  >

                    <MapPin
                      size={18}
                      className="
                      text-yellow-400
                      mt-1
                      "
                    />

                    <span>

                      {
                        place.display_name
                      }

                    </span>

                  </div>

                )

              )

            }

          </div>

        )

      }

    </div>

  );

};

export default LocationAutocomplete;