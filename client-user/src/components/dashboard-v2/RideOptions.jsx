import {
    Bike,
    Car,
    CarTaxiFront
  } from "lucide-react";
  
  import { motion } from "framer-motion";
  
  const options = [
  
    {
      title: "Bike",
      eta: "2 mins",
      price: "₹50",
      icon: Bike
    },
  
    {
      title: "Auto",
      eta: "4 mins",
      price: "₹80",
      icon: Car
    },
  
    {
      title: "Cab",
      eta: "6 mins",
      price: "₹120",
      icon: CarTaxiFront
    }
  
  ];
  
  const RideOptions = () => {
  
    return (
  
      <div className="mb-6">
  
        <h2 className="ridex-section-label">
  
          AVAILABLE RIDES
  
        </h2>
  
        <div className="space-y-3">
  
          {options.map((option, index) => {
  
            const Icon = option.icon;
  
            return (
  
              <motion.div
  
                key={option.title}
  
                initial={{
                  opacity: 0,
                  x: -20
                }}
  
                animate={{
                  opacity: 1,
                  x: 0
                }}
  
                transition={{
                  delay: index * 0.15
                }}
  
                whileHover={{
                  scale: 1.02
                }}
  
                className="
                ridex-card
                p-4
                flex
                items-center
                justify-between
                cursor-pointer
                "
  
              >
  
                <div className="
                flex
                items-center
                gap-4
                ">
  
                  <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-yellow-400/10
                  flex
                  items-center
                  justify-center
                  ">
  
                    <Icon
                      className="
                      text-yellow-400
                      "
                      size={24}
                    />
  
                  </div>
  
                  <div>
  
                    <h3 className="font-semibold">
  
                      {option.title}
  
                    </h3>
  
                    <p className="
                    text-zinc-400
                    text-sm
                    ">
  
                      {option.eta}
  
                    </p>
  
                  </div>
  
                </div>
  
                <h3 className="
                font-bold
                text-lg
                text-yellow-400
                ">
  
                  {option.price}
  
                </h3>
  
              </motion.div>
  
            );
  
          })}
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default RideOptions;