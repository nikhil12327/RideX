import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const RouteLayer = ({
  pickupCoords,
  dropCoords
}) => {

  const map = useMap();

  useEffect(() => {

    if (
      !pickupCoords?.lat ||
      !(pickupCoords?.lon || pickupCoords?.lng) ||
      !dropCoords?.lat ||
      !(dropCoords?.lon || dropCoords?.lng)
    ) return;

    console.log("Drawing Route:", {
      pickup: pickupCoords,
      drop: dropCoords
    });

    const routingControl = L.Routing.control({

      waypoints: [

        L.latLng(
          pickupCoords.lat,
          pickupCoords.lon || pickupCoords.lng
        ),

        L.latLng(
          dropCoords.lat,
          dropCoords.lon || dropCoords.lng
        )

      ],

      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,

      createMarker: () => null,

      lineOptions: {
        styles: [
          {
            color: "#3b82f6",
            weight: 6,
            opacity: 0.9
          }
        ]
      }

    }).addTo(map);

    // Hide routing instructions panel
    const container =
      routingControl.getContainer();

    if (container) {

      container.style.display = "none";

    }

    return () => {

      map.removeControl(
        routingControl
      );

    };

  }, [
    pickupCoords,
    dropCoords,
    map
  ]);

  return null;
};

export default RouteLayer;