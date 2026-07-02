export const getRouteInfo =
async (
  startLat,
  startLon,
  endLat,
  endLon
) => {

  try {

    const response =
      await fetch(

        `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=false`

      );

    const data =
      await response.json();

    if (
      !data.routes ||
      !data.routes.length
    ) {

      return null;

    }

    return {

      distance:
        (
          data.routes[0]
            .distance / 1000
        ).toFixed(1),

      duration:
        Math.ceil(
          data.routes[0]
            .duration / 60
        ),

    };

  } catch (error) {

    console.log(error);

    return null;

  }

};