import {
    Bell,
    LogOut,
  } from "lucide-react";
  
  import { logout } from "../../services/authService";
  
  import { useNavigate } from "react-router-dom";
  const TopNavbar = ({ name }) => {

    const navigate = useNavigate();
  
    const handleLogout = async () => {
  
      try {
  
        await logout();
  
        navigate("/login");
  
      } catch (error) {
  
        console.log(error);
  
      }
    };
  
    return (
      <div className="flex justify-between items-center mb-6">
  
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">
            Rider Dashboard
          </h1>
  
          <p className="text-zinc-400 text-sm">
            Welcome back, {name}
          </p>
        </div>
  
        <div className="flex items-center gap-3">
  
          <button className="bg-zinc-900 p-3 rounded-full">
            <Bell size={20} className="text-yellow-400" />
          </button>
  
          <button
            onClick={handleLogout}
            className="bg-red-500 p-3 rounded-full"
          >
            <LogOut size={18} />
          </button>
  
        </div>
  
      </div>
    );
  };
  
  export default TopNavbar;