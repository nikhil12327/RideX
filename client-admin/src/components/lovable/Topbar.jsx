import { Bell, Search, ChevronDown } from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
      
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search rides, riders, customers..."
          className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            py-2
            pl-10
            pr-4
            text-white
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button
          className="
            relative
            p-2
            rounded-full
            bg-slate-900
            hover:bg-slate-800
            transition
          "
        >
          <Bell size={18} />

          <span
            className="
              absolute
              top-1
              right-1
              w-2
              h-2
              rounded-full
              bg-yellow-400
            "
          />
        </button>

        {/* Profile */}
        <div
          className="
            flex
            items-center
            gap-3
            bg-slate-900
            px-3
            py-2
            rounded-full
          "
        >
          <div
            className="
              w-8
              h-8
              rounded-full
              bg-yellow-400
              flex
              items-center
              justify-center
              text-black
              font-bold
            "
          >
            NK
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">
              Nikhil
            </p>

            <p className="text-xs text-slate-400">
              Super Admin
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-slate-400"
          />
        </div>

      </div>
    </header>
  );
};

export default Topbar;