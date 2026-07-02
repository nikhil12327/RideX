import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
  } from "react-leaflet";
  
  import "leaflet/dist/leaflet.css";
  
  const LiveRideMap = ({
    activeRides = []
  }) => {
  
    return (
  
      <div className="
      dashboard-card
      ">
  
        <h2 className="
        text-2xl
        font-bold
        mb-6
        ">
  
          Live Ride Monitoring
  
        </h2>
  
        <div className="
        h-[500px]
        rounded-3xl
        overflow-hidden
        ">
  
          <MapContainer
  
            center={[16.24, 80.05]}
  
            zoom={12}
  
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
  
              activeRides.map(
                (ride) => {
  
                  if (
                    !ride.riderLocation
                  ) return null;
  
                  return (
  
                    <Marker
  
                      key={ride.id}
  
                      position={[
  
                        ride.riderLocation.lat,
  
                        ride.riderLocation.lng
  
                      ]}
  
                    >
  
                      <Popup>
  
                        <div>
  
                          <h3>
  
                            {
  
                              ride.customerName
  
                            }
  
                          </h3>
  
                          <p>
  
                            {
  
                              ride.pickup
  
                            }
  
                          </p>
  
                          <p>
  
                            {
  
                              ride.drop
  
                            }
  
                          </p>
  
                          <p>
  
                            Status:
  
                            {" "}
  
                            {
  
                              ride.status
  
                            }
  
                          </p>
  
                        </div>
  
                      </Popup>
  
                    </Marker>
  
                  );
  
                }
              )
  
            }
  
          </MapContainer>
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default LiveRideMap;