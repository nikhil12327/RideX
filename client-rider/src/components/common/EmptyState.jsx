import {
    SearchX
  } from "lucide-react";
  
  const EmptyState = ({
    title,
    subtitle
  }) => {
  
    return (
  
      <div className="
      py-16
      text-center
      ">
  
        <div className="
        w-20
        h-20
        mx-auto
        rounded-full
        bg-zinc-900
        flex
        items-center
        justify-center
        mb-6
        ">
  
          <SearchX
            size={36}
            className="
            text-zinc-500
            "
          />
  
        </div>
  
        <h2 className="
        text-2xl
        font-bold
        ">
  
          {title}
  
        </h2>
  
        <p className="
        text-zinc-400
        mt-2
        ">
  
          {subtitle}
  
        </p>
  
      </div>
  
    );
  
  };
  
  export default EmptyState;