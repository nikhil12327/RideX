import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange
}) => {

  return (

    <div className="
    mb-8
    bg-zinc-900
    rounded-2xl
    px-5
    py-4
    flex
    items-center
    gap-3
    ">

      <Search
        className="
        text-yellow-400
        "
      />

      <input

        value={value}

        onChange={onChange}

        placeholder="
        Search rides, customers, riders
        "

        className="
        bg-transparent
        outline-none
        text-white
        w-full
        "

      />

    </div>

  );

};

export default SearchBar;