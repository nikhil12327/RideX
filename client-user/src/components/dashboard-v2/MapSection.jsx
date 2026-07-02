import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import { motion } from "framer-motion";

import RouteLayer from "./RouteLayer";

import "leaflet/dist/leaflet.css";

// Fix Leaflet Icons

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});

const MapSection = ({
  riderLocation,
  pickupCoords,
  dropCoords
}) => {

  const defaultCenter = [
    15.9129,
    79.7400
  ];

  console.log(
    "Rider Location:",
    riderLocation
  );
  console.log("Pickup:", pickupCoords);
console.log("Drop:", dropCoords);

  return (

    <motion.div

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      className="
      mb-6
      rounded-3xl
      overflow-hidden
      border
      border-zinc-800
      "

    >

      <MapContainer

        center={

          pickupCoords?.lat &&
          (pickupCoords?.lon || pickupCoords?.lng)

            ? [

                pickupCoords.lat,

                pickupCoords.lon
                ||
                pickupCoords.lng

              ]

            : defaultCenter

        }

        zoom={13}

        style={{
          height: "350px",
          width: "100%"
        }}

      >

        <TileLayer

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        />

        {/* Pickup Marker */}

        {

          pickupCoords?.lat &&

          (pickupCoords?.lon ||
            pickupCoords?.lng)

          && (

            <Marker

              position={[

                pickupCoords.lat,

                pickupCoords.lon
                ||
                pickupCoords.lng

              ]}

            >

              <Popup>

                Pickup Location

              </Popup>

            </Marker>

          )

        }

        {/* Drop Marker */}

        {

          dropCoords?.lat &&

          (dropCoords?.lon ||
            dropCoords?.lng)

          && (

            <Marker

              position={[

                dropCoords.lat,

                dropCoords.lon
                ||
                dropCoords.lng

              ]}

            >

              <Popup>

                Drop Location

              </Popup>

            </Marker>

          )

        }

        {/* Rider Marker */}

        {

          riderLocation?.lat &&

          (riderLocation?.lon ||
            riderLocation?.lng)

          && (

            <Marker

              position={[

                riderLocation.lat,

                riderLocation.lon
                ||
                riderLocation.lng

              ]}

            >

              <Popup>

                Rider Location

              </Popup>

            </Marker>

          )

        }

        {/* Route */}

        {

          pickupCoords?.lat &&

          dropCoords?.lat

          && (

            <RouteLayer

              pickupCoords={
                pickupCoords
              }

              dropCoords={
                dropCoords
              }

            />

          )

        }

      </MapContainer>

    </motion.div>

  );

};

export default MapSection;