import { motion } from "framer-motion";

const MetricCard = ({
  title,
  value,
  icon: Icon,
  color = "text-yellow-400"
}) => {

  return (

    <motion.div

      whileHover={{
        y: -6
      }}

      className="
dashboard-card
metric-card
"

    >

      <div className="
      flex
      justify-between
      items-center
      ">

        <div>

          <p className="
          text-zinc-400
          text-sm
          ">

            {title}

          </p>

          <h1 className="
          text-3xl
          font-bold
          mt-3
          ">

            {value}

          </h1>

        </div>

        {

          Icon &&

          <div className="
          w-14
          h-14
          rounded-2xl
          bg-zinc-800
          flex
          items-center
          justify-center
          ">

            <Icon
              className={color}
              size={28}
            />

          </div>

        }

      </div>

    </motion.div>

  );

};

export default MetricCard;