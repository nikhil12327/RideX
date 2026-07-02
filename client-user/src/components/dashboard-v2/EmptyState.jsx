import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

const EmptyState = ({
  title,
  subtitle,
}) => {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      className="
      text-center
      py-10
      "

    >

      <div className="
      w-20
      h-20
      mx-auto
      rounded-full
      bg-zinc-900
      flex
      items-center
      justify-center
      mb-5
      ">

        <SearchX
          size={36}
          className="text-zinc-500"
        />

      </div>

      <h3 className="
      text-xl
      font-semibold
      mb-2
      ">

        {title}

      </h3>

      <p className="
      text-zinc-400
      ">

        {subtitle}

      </p>

    </motion.div>

  );

};

export default EmptyState;