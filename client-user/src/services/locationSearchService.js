export const searchLocations =
async (query) => {

  if (!query) return [];

  try {

    const response =
      await fetch(

        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`

      );

    const data =
      await response.json();

    return data.features.map(
      (item) => ({

        place_id:
          item.properties.osm_id,

        display_name:
          item.properties.name +
          ", " +
          (
            item.properties.city ||
            item.properties.state ||
            ""
          ),

        lat:
          item.geometry.coordinates[1],

        lon:
          item.geometry.coordinates[0],

      })
    );

  } catch (error) {

    console.log(error);

    return [];

  }

};