"use client";

import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  amount: string;
  setAmount: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
  balance?: number;
};

export default function AmountInput({
  amount,
  setAmount,
  note,
  setNote,
  balance = 0,
}: Props) {
  const availableBalance = Number.isFinite(balance) ? balance : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Amount */}

      <div>

        <label className="mb-2 block font-semibold text-black">
          Transfer Amount
        </label>

        <div className="relative">

          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-black">
            ₹
          </span>

          <input
            type="number"
            value={amount}
            onChange={(e) => {
            const value = e.target.value;
            if (Number(value) > availableBalance) return;
            setAmount(value);}}
            placeholder="Enter amount"
            className="w-full rounded-2xl border border-gray-500 text-gray-700 py-4 pl-12 pr-4 text-2xl font-semibold outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />

        </div>

      </div>

      {/* Balance Card */}

      <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 p-5">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-100 p-3">

            <Wallet className="text-blue-700" />

          </div>

          <div>

            <p className="text-sm text-gray-500 text-green-700">
              Available Balance
            </p>

            <h2 className="text-xl font-bold text-blue-700">
              ₹{availableBalance.toLocaleString()}
            </h2>
            {Number(amount) > availableBalance && (
            <p className="text-sm font-medium text-red-600">
            Insufficient balance.
           </p>)}
          </div>

        </div>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          Active
        </span>

      </div>

      {/* Note */}

      <div>

        <label className="mb-2 block font-semibold text-black">
          Transfer Note (Optional)
        </label>

        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          className="w-full rounded-2xl border border-gray-500 text-gray-700 p-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 resize-none"
        />

      </div>

    </motion.div>
  );
}