import {
    House,
    History,
    User,
  } from "lucide-react";
  
  import {
    Link,
    useLocation,
  } from "react-router-dom";
  
  const BottomNavbar = () => {
  
    const location =
      useLocation();
  
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 py-3 flex justify-around">
  
        <Link
          to="/dashboard"
          className={`flex flex-col items-center ${
            location.pathname === "/dashboard"
              ? "text-yellow-400"
              : "text-zinc-400"
          }`}
        >
          <House size={22} />
          <span className="text-xs">
            Home
          </span>
        </Link>
  
        <Link
          to="/history"
          className={`flex flex-col items-center ${
            location.pathname === "/history"
              ? "text-yellow-400"
              : "text-zinc-400"
          }`}
        >
          <History size={22} />
          <span className="text-xs">
            History
          </span>
        </Link>
  
        <Link
          to="/profile"
          className={`flex flex-col items-center ${
            location.pathname === "/profile"
              ? "text-yellow-400"
              : "text-zinc-400"
          }`}
        >
          <User size={22} />
          <span className="text-xs">
            Profile
          </span>
        </Link>
  
      </div>
    );
  };
  
  export default BottomNavbar;