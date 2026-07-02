import { useState, useEffect } from "react";

import {
  searchLocations,
} from "../services/locationSearchService";

const LocationSearch = ({
  placeholder,
  value,
  onSelect,
}) => {

    const [query, setQuery] =
    useState(value || "");
  
  const [results, setResults] =
    useState([]);
  
  useEffect(() => {
  
    setQuery(value || "");
  
  }, [value]);

  useEffect(() => {

    const fetchLocations =
      async () => {

        if (
          query.length < 3
        ) {

          setResults([]);

          return;

        }

        const data =
          await searchLocations(
            query
          );

        setResults(data);

      };

    fetchLocations();

  }, [query]);

  return (

    <div className="mb-4 relative">

      <input
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        placeholder={placeholder}
        className="w-full p-3 rounded text-black"
      />

      {
        results.length > 0 && (

          <div className="absolute w-full bg-white text-black rounded shadow-lg z-50 max-h-60 overflow-auto">

            {
              results.map(
                (location) => (

                  <div
                    key={location.place_id}
                    className="p-3 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {

                      setQuery(
                        location.display_name
                      );

                      onSelect(
                        location
                      );

                      setResults([]);

                    }}
                  >

                    {
                      location.display_name
                    }

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

export default LocationSearch;