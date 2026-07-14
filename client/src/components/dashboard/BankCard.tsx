"use client";

import { motion } from "framer-motion";
import { CreditCard, Wifi } from "lucide-react";

type Props = {
  user: {
    fullName: string;
    accountNumber: string;
    accountType: string;
    balance: number;
  };
};

export default function BankCard({
  user,
}: Props) {
  const formattedAccountNumber =
    user.accountNumber.replace(
      /(\d{4})(?=\d)/g,
      "$1 "
    );

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{
        rotateY: 8,
        rotateX: 2,
        scale: 1.02,
      }}
      transition={{ duration: 0.5 }}
      className="group relative w-full max-w-[520px] aspect-[1.586/1] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 shadow-2xl"
    >
      {/* Background Glow */}

      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Shine */}

      <motion.div
        animate={{
          x: ["-120%", "180%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
        className="absolute left-0 top-0 h-full w-24 rotate-12 bg-white/20 blur-xl"
      />

      <div className="relative flex h-full flex-col justify-between p-8 text-white">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm text-blue-100">
              {user.accountType} Account
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Nexa Bank
            </h1>

          </div>

          <CreditCard size={34} />

        </div>

        {/* Chip */}

        <div className="flex items-center justify-between">

          <div className="relative h-14 w-20 rounded-xl bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 shadow-lg">

            <div className="absolute left-4 top-0 h-full w-[2px] bg-yellow-700/40" />

            <div className="absolute left-9 top-0 h-full w-[2px] bg-yellow-700/40" />

            <div className="absolute top-5 h-[2px] w-full bg-yellow-700/40" />

          </div>

          <Wifi
            size={30}
            className="rotate-90"
          />

        </div>

        {/* Account Number */}

        <div>

          <h2 className="tracking-[4px] text-2xl font-semibold">

            {formattedAccountNumber}

          </h2>

        </div>

        {/* Footer */}

        <div className="flex items-end justify-between">

          <div>

            <p className="text-xs uppercase text-blue-200">
              Account Holder
            </p>

            <h3 className="mt-1 text-lg font-bold uppercase">

              {user.fullName}

            </h3>

          </div>

          <div>

            <p className="text-xs uppercase text-blue-200">
              Balance
            </p>

            <h3 className="mt-1 text-lg font-bold">

              ₹{user.balance.toLocaleString()}

            </h3>

          </div>

          <div>

            <h2 className="text-4xl font-extrabold italic opacity-90">
              VISA
            </h2>

          </div>

        </div>

      </div>

    </motion.div>
  );
}