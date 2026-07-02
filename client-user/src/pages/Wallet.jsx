import { useEffect, useState } from "react";

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle
} from "lucide-react";

import { useAuth }
from "../context/AuthContext";

import BottomNavV2
from "../components/dashboard-v2/BottomNavV2";

import {
  addMoneyToWallet,
  subscribeToTransactions,
  getWalletBalance
}
from "../services/walletService";

import toast
from "react-hot-toast";

const WalletPage = () => {

  const { user } = useAuth();

  const [balance, setBalance] =
    useState(0);

  const [transactions,
    setTransactions] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // Load Wallet

  useEffect(() => {

    if (!user) return;

    const loadWallet =
      async () => {

        try {

          const walletBalance =

            await getWalletBalance(
              user.uid
            );

          setBalance(
            walletBalance
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Unable to load wallet"
          );

        } finally {

          setLoading(false);

        }

      };

    loadWallet();

    const unsubscribe =

      subscribeToTransactions(

        user.uid,

        async (transactionsData) => {

          setTransactions(
            transactionsData
          );

          // Refresh Balance

          const latestBalance =

            await getWalletBalance(
              user.uid
            );

          setBalance(
            latestBalance
          );

        }

      );

    return () =>
      unsubscribe();

  }, [user]);

  // Add Money

  const handleAddMoney =
    async (amount) => {

      const confirmRecharge =

        window.confirm(

          `Add ₹${amount} to wallet?`

        );

      if (!confirmRecharge)
        return;

      try {

        await addMoneyToWallet(

          user.uid,

          amount

        );

        toast.success(
          `₹${amount} Added Successfully`
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Unable to add money"
        );

      }

    };

  if (loading) {

    return (

      <div className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      ">

        Loading Wallet...

      </div>

    );

  }

  return (

    <div className="
    min-h-screen
    bg-gradient-to-b
    from-zinc-950
    via-black
    to-zinc-900
    text-white
    p-5
    pb-32
    ">

      {/* Wallet Card */}

      <div className="
      glass
      rounded-[32px]
      p-8
      text-center
      mb-8
      ">

        <Wallet

          size={50}

          className="
          mx-auto
          text-yellow-400
          mb-4
          "

        />

        <p className="
        text-zinc-400
        ">

          Wallet Balance

        </p>

        <h1 className="
        text-5xl
        font-bold
        mt-3
        ">

          ₹{balance}

        </h1>

      </div>

      {/* Recharge */}

      <h2 className="
      text-xl
      font-bold
      mb-5
      ">

        Add Money

      </h2>

      <div className="
      grid
      grid-cols-3
      gap-4
      mb-8
      ">

        {

          [100, 500, 1000].map(

            amount => (

              <button

                key={amount}

                onClick={() =>
                  handleAddMoney(
                    amount
                  )
                }

                className="
                bg-yellow-400
                text-black
                py-4
                rounded-2xl
                font-bold
                hover:scale-105
                transition-all
                "

              >

                +₹{amount}

              </button>

            )

          )

        }

      </div>

      {/* Transactions */}

      <h2 className="
      text-xl
      font-bold
      mb-5
      ">

        Transactions

      </h2>

      <div className="
      space-y-4
      ">

        {

          transactions.length === 0

          ? (

            <div className="
            glass
            p-8
            rounded-3xl
            text-center
            text-zinc-400
            ">

              No Transactions Yet

            </div>

          )

          : (

            transactions.map(

              transaction => (

                <div

                  key={transaction.id}

                  className="
                  glass
                  rounded-3xl
                  p-5
                  flex
                  justify-between
                  items-center
                  "

                >

                  <div className="
                  flex
                  items-center
                  gap-4
                  ">

                    {

                      transaction.type ===
                      "credit"

                      ?

                      (

                        <ArrowDownCircle
                          className="
                          text-green-400
                          "
                        />

                      )

                      :

                      (

                        <ArrowUpCircle
                          className="
                          text-red-400
                          "
                        />

                      )

                    }

                    <div>

                      <h3 className="
                      font-bold
                      ">

                        {
                          transaction.description
                        }

                      </h3>

                      <p className="
                      text-zinc-400
                      text-sm
                      ">

                        {

                          new Date(

                            transaction.createdAt

                          ).toLocaleString()

                        }

                      </p>

                    </div>

                  </div>

                  <h3 className={`

                    text-xl
                    font-bold

                    ${

                      transaction.type ===
                      "credit"

                      ?

                      "text-green-400"

                      :

                      "text-red-400"

                    }

                  `}>

                    {

                      transaction.type ===
                      "credit"

                      ? "+"

                      : "-"

                    }

                    ₹

                    {transaction.amount}

                  </h3>

                </div>

              )

            )

          )

        }

      </div>

      <BottomNavV2 />

    </div>

  );

};

export default WalletPage;