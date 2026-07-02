import {
    LayoutDashboard,
    BarChart3,
    Car,
    Users,
    Bike,
    LogOut,
    X
  } from "lucide-react";
  
  import { motion } from "framer-motion";
  
  const AdminSidebar = ({
    activeTab,
    setActiveTab,
    onLogout,
    closeSidebar
  }) => {
  
    const menu = [
  
      {
        title: "Dashboard",
        icon: LayoutDashboard
      },
  
      {
        title: "Analytics",
        icon: BarChart3
      },
  
      {
        title: "Rides",
        icon: Car
      },
  
      {
        title: "Customers",
        icon: Users
      },
  
      {
        title: "Riders",
        icon: Bike
      }
  
    ];
  
    return (
  
      <motion.div
  
        initial={{
          x: -100,
          opacity: 0
        }}
  
        animate={{
          x: 0,
          opacity: 1
        }}
  
        transition={{
          duration: 0.3
        }}
  
        className="
        w-72
        min-h-screen
        bg-zinc-900/95
        backdrop-blur-xl
        border-r
        border-zinc-800
        p-6
        fixed
        lg:sticky
        top-0
        left-0
        z-50
        shadow-2xl
        "
  
      >
  
        {/* Mobile Close Button */}
  
        <div className="
        flex
        justify-between
        items-center
        lg:block
        ">
  
          <div>
  
            <h1 className="
            text-3xl
            font-bold
            text-yellow-400
            ">
  
              RideX Admin
  
            </h1>
  
            <p className="
            text-zinc-400
            mt-2
            text-sm
            ">
  
              Manage your platform
  
            </p>
  
          </div>
  
          {
  
            closeSidebar && (
  
              <button
  
                onClick={closeSidebar}
  
                className="
                lg:hidden
                p-2
                rounded-xl
                hover:bg-zinc-800
                "
  
              >
  
                <X />
  
              </button>
  
            )
  
          }
  
        </div>
  
        {/* Navigation */}
  
        <div className="
        mt-10
        space-y-3
        ">
  
          {
  
            menu.map((item) => {
  
              const Icon = item.icon;
  
              return (
  
                <motion.div
  
                  key={item.title}
  
                  whileHover={{
                    x: 6
                  }}
  
                  whileTap={{
                    scale: 0.97
                  }}
  
                  onClick={() => {
  
                    setActiveTab(
                      item.title
                    );
  
                    if (closeSidebar) {
  
                      closeSidebar();
  
                    }
  
                  }}
  
                  className={`
                  flex
                  items-center
                  gap-4
                  p-4
                  rounded-2xl
                  cursor-pointer
                  transition-all
                  duration-300
  
                  ${
  
                    activeTab === item.title
  
                      ?
  
                      "bg-yellow-400 text-black shadow-lg"
  
                      :
  
                      "text-zinc-300 hover:bg-zinc-800"
  
                  }
                  `}
  
                >
  
                  <Icon size={22} />
  
                  <span className="
                  font-medium
                  ">
  
                    {item.title}
  
                  </span>
  
                </motion.div>
  
              );
  
            })
  
          }
  
        </div>
  
        {/* Logout */}
  
        <div className="
        absolute
        bottom-8
        left-6
        right-6
        ">
  
          <button
  
            onClick={onLogout}
  
            className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            bg-red-500
            hover:bg-red-600
            transition-all
            duration-300
            py-4
            rounded-2xl
            font-bold
            shadow-lg
            "
  
          >
  
            <LogOut size={20} />
  
            Logout
  
          </button>
  
        </div>
  
      </motion.div>
  
    );
  
  };
  
  export default AdminSidebar;