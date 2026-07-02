import { motion } from "framer-motion";

const OnlineStatusCard = ({
  online,
  onToggle
}) => {

  return (

    <div className="
    glass
    rounded-3xl
    p-5
    mb-6
    ">

      <div className="
      flex
      justify-between
      items-center
      ">

        <div>

          <h3 className="
          text-xl
          font-bold
          ">

            Availability

          </h3>

          <p className="text-zinc-400">

            {online
              ? "Online"
              : "Offline"}

          </p>

        </div>

        <motion.button

          whileTap={{
            scale: 0.95
          }}

          onClick={() =>
            onToggle(!online)
          }

          className={`
          w-24
          h-12
          rounded-full
          font-bold

          ${
            online
            ? "bg-green-500"
            : "bg-zinc-700"
          }
          `}

        >

          {online
            ? "ONLINE"
            : "OFFLINE"}

        </motion.button>

      </div>

    </div>

  );

};

export default OnlineStatusCard;