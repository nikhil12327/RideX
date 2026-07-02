import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
  } from "react-leaflet";

  import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
  
  const MapView = ({
    riderLocation,
  }) => {

    console.log(
      "MAPVIEW RECEIVED:",
      riderLocation
    );
  
    if (!riderLocation)
      return null;
  
    return (
  
      <MapContainer
        center={[
          riderLocation.latitude,
          riderLocation.longitude,
        ]}
        zoom={15}
        style={{
          height: "350px",
          width: "100%",
          borderRadius: "12px"
        }}
      >
  
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
  
        <Marker
          position={[
            riderLocation.latitude,
            riderLocation.longitude,
          ]}
        >
  
          <Popup>
            Rider Location
          </Popup>
  
        </Marker>
  
      </MapContainer>
  
    );
  
  };
  
  export default MapView;