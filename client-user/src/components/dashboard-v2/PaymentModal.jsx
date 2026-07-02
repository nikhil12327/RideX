import { useState } from "react";
import { Wallet, Banknote } from "lucide-react";
import { motion } from "framer-motion";

const PaymentModal = ({
  fare,
  onPay,
  onClose
}) => {

  const [method, setMethod] =
    useState("wallet");

  return (

    <div className="
    fixed inset-0
    bg-black/70
    backdrop-blur-sm
    flex items-center
    justify-center
    z-[1000]
    ">

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.9
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        className="
        bg-zinc-900
        border border-zinc-800
        rounded-3xl
        p-6
        w-[90%]
        max-w-md
        "

      >

        <h2 className="
        text-2xl
        font-bold
        mb-4
        text-center
        ">

          Complete Payment

        </h2>

        <div className="
        text-center
        text-4xl
        font-bold
        text-yellow-400
        mb-6
        ">

          ₹{fare}

        </div>

        <div className="space-y-3">

          <button

            onClick={() =>
              setMethod("wallet")
            }

            className={`

            w-full
            p-4
            rounded-2xl
            flex items-center
            gap-3

            ${

              method === "wallet"

              ?

              "bg-yellow-400 text-black"

              :

              "bg-zinc-800"

            }

            `}

          >

            <Wallet />

            Wallet

          </button>

          <button

            onClick={() =>
              setMethod("cash")
            }

            className={`

            w-full
            p-4
            rounded-2xl
            flex items-center
            gap-3

            ${

              method === "cash"

              ?

              "bg-yellow-400 text-black"

              :

              "bg-zinc-800"

            }

            `}

          >

            <Banknote />

            Cash

          </button>

        </div>

        <div className="
        flex gap-3 mt-6
        ">

          <button

            onClick={onClose}

            className="
            flex-1
            bg-zinc-800
            py-3
            rounded-2xl
            "

          >

            Cancel

          </button>

          <button

            onClick={() =>
              onPay(method)
            }

            className="
            flex-1
            bg-yellow-400
            text-black
            py-3
            rounded-2xl
            font-bold
            "

          >

            Pay Now

          </button>

        </div>

      </motion.div>

    </div>

  );

};

export default PaymentModal;