import { motion } from "framer-motion";

const AdminHero = ({ stats }) => {

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
hero-card
bg-gradient-to-r
from-yellow-400
to-orange-500
rounded-[36px]
text-black
shadow-2xl
"

    >

      <h1 className="
      text-4xl
      font-bold
      ">

        Admin Dashboard

      </h1>

      <p className="
      mt-2
      opacity-80
      ">

        Monitor your entire platform

      </p>

      <div className="
      grid
      grid-cols-2
      lg:grid-cols-4
      gap-4
      mt-8
      ">

        <div>

          <h2 className="
          text-3xl
          font-bold
          ">

            {stats?.totalRides || 0}

          </h2>

          <p>Total Rides</p>

        </div>

        <div>

          <h2 className="
          text-3xl
          font-bold
          ">

            {stats?.totalCustomers || 0}

          </h2>

          <p>Customers</p>

        </div>

        <div>

          <h2 className="
          text-3xl
          font-bold
          ">

            {stats?.totalRiders || 0}

          </h2>

          <p>Riders</p>

        </div>

        <div>

          <h2 className="
          text-3xl
          font-bold
          ">

            ₹{stats?.totalRevenue || 0}

          </h2>

          <p>Revenue</p>

        </div>

      </div>

    </motion.div>

  );

};

export default AdminHero;