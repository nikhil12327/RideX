import {
    Home,
    User,
    History,
    Map
  } from "lucide-react";
  
  import { Link } from "react-router-dom";
  
  const BottomNavV2 = () => {
  
    return (
  
      <div className="
        fixed
        bottom-5
        left-4
        right-4
        z-[999]
        bg-zinc-900/90
        backdrop-blur-xl
        border border-zinc-800
        rounded-3xl
        p-4
        flex
        justify-around
      ">
  
        <Link to="/dashboard">
          <Home />
        </Link>
  
        <Link to="/history">
          <History />
        </Link>
  
        <Link to="/test-ride">
          <Map />
        </Link>
  
        <Link to="/profile">
          <User />
        </Link>
  
      </div>
  
    );
  
  };
  
  export default BottomNavV2;