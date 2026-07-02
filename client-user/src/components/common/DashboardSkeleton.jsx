const DashboardSkeleton = () => {

    return (
  
      <div className="space-y-5">
  
        <div className="
        h-44
        bg-zinc-800
        rounded-3xl
        animate-pulse
        " />
  
        <div className="
        grid
        grid-cols-2
        gap-4
        ">
  
          {[1,2,3,4].map((item) => (
  
            <div
  
              key={item}
  
              className="
              h-28
              bg-zinc-800
              rounded-3xl
              animate-pulse
              "
  
            />
  
          ))}
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default DashboardSkeleton;