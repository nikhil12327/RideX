import {
    Server,
    Wifi,
    Database
  } from "lucide-react";
  
  const SystemHealthCard = () => {
  
    return (
  
      <div className="dashboard-card">
  
        <h2 className="
        text-2xl
        font-bold
        mb-6
        ">
  
          System Health
  
        </h2>
  
        <div className="space-y-5">
  
          <div className="
          flex
          justify-between
          ">
  
            <div className="
            flex
            gap-3
            ">
  
              <Server />
  
              API Server
  
            </div>
  
            <span className="
            text-green-400
            ">
  
              Online
  
            </span>
  
          </div>
  
          <div className="
          flex
          justify-between
          ">
  
            <div className="
            flex
            gap-3
            ">
  
              <Database />
  
              Firestore
  
            </div>
  
            <span className="
            text-green-400
            ">
  
              Connected
  
            </span>
  
          </div>
  
          <div className="
          flex
          justify-between
          ">
  
            <div className="
            flex
            gap-3
            ">
  
              <Wifi />
  
              Realtime Sync
  
            </div>
  
            <span className="
            text-green-400
            ">
  
              Active
  
            </span>
  
          </div>
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default SystemHealthCard;