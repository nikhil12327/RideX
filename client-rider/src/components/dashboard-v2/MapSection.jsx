import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
  } from "react-leaflet";
  
  import "leaflet/dist/leaflet.css";
  
  const MapSection = ({
    riderLocation
  }) => {
  
    const defaultCenter =
  
      riderLocation
  
      ?
  
      [
        riderLocation.lat,
        riderLocation.lon
      ]
  
      :
  
      [15.8167, 80.3500];
  
    return (
  
      <div className="
      h-72
      rounded-[32px]
      overflow-hidden
      mb-6
      border
      border-zinc-800
      ">
  
        <MapContainer
  
          center={defaultCenter}
  
          zoom={13}
  
          style={{
            height: "100%",
            width: "100%"
          }}
  
        >
  
          <TileLayer
  
            url="
            https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
            "
  
          />
  
          {
  
            riderLocation && (
  
              <Marker
  
                position={[
  
                  riderLocation.lat,
  
                  riderLocation.lon
  
                ]}
  
              >
  
                <Popup>
  
                  Rider Location
  
                </Popup>
  
              </Marker>
  
            )
  
          }
  
        </MapContainer>
  
      </div>
  
    );
  
  };
  
  export default MapSection;