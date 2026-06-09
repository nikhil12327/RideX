const StatsCard = ({
    title,
    value,
  }) => {
  
    return (
  
      <div className="bg-zinc-900 p-5 rounded-2xl">
  
        <h3 className="text-zinc-400">
  
          {title}
  
        </h3>
  
        <p className="text-3xl font-bold text-yellow-400 mt-2">
  
          {value}
  
        </p>
  
      </div>
  
    );
  
  };
  
  export default StatsCard;