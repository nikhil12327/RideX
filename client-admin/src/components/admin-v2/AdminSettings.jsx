const AdminSettings = () => {

    return (
  
      <div className="
      bg-zinc-900/80
      rounded-3xl
      p-8
      ">
  
        <h2 className="
        text-3xl
        font-bold
        mb-6
        ">
  
          Settings
  
        </h2>
  
        <div className="space-y-6">
  
          <div>
  
            <label className="
            block
            text-zinc-400
            mb-2
            ">
  
              Platform Name
  
            </label>
  
            <input
  
              defaultValue="RideX"
  
              className="
              w-full
              bg-zinc-800
              p-4
              rounded-2xl
              outline-none
              "
  
            />
  
          </div>
  
          <div>
  
            <label className="
            block
            text-zinc-400
            mb-2
            ">
  
              Support Email
  
            </label>
  
            <input
  
              defaultValue="
              support@ridex.com
              "
  
              className="
              w-full
              bg-zinc-800
              p-4
              rounded-2xl
              outline-none
              "
  
            />
  
          </div>
  
          <button className="
          bg-yellow-400
          text-black
          px-6
          py-3
          rounded-2xl
          font-bold
          ">
  
            Save Changes
  
          </button>
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default AdminSettings;