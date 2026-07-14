"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

type Props = {
  amount?: number;
  currentBalance?: number;
};

export default function WithdrawSummary({
  amount = 0,
  currentBalance = 50000,
}: Props) {
  const processingFee = 0;
  const gst = 0;

  const remainingBalance = currentBalance - amount;

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-gray-200 bg-gray-50 p-8"
    >
      <h2 className="text-2xl font-bold text-red-600">
        Withdraw Summary
      </h2>

      <div className="mt-8 space-y-5">

        <Row
          title="Current Balance"
          value={`₹${currentBalance.toLocaleString()}`}
        />

        <Row
          title="Withdraw Amount"
          value={`₹${amount.toLocaleString()}`}
        />

        <Row
          title="Processing Fee"
          value={`₹${processingFee.toLocaleString()}`}
        />

        <Row
          title="GST"
          value={`₹${gst.toLocaleString()}`}
        />

        <hr />

        <Row
          title="Remaining Balance"
          value={`₹${remainingBalance.toLocaleString()}`}
          bold
        />

        <Row
          title="Transaction Type"
          value="Withdraw"
        />

        <Row
          title="Date"
          value={today}
        />

      </div>

      <div className="mt-8 rounded-2xl bg-red-100 p-5">

        <div className="flex gap-4">

          <Wallet className="text-red-700" />

          <div>

            <h3 className="font-bold text-red-700">
              Secure Withdrawal
            </h3>

            <p className="text-sm text-red-700">
              Your withdrawal is protected with bank-level security.
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

function Row({
  title,
  value,
  bold = false,
}: {
  title: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span
        className={
          bold
            ? "text-lg font-bold text-gray-800"
            : "text-gray-500"
        }
      >
        {title}
      </span>

      <span
        className={
          bold
            ? "text-lg font-bold text-red-700"
            : "font-semibold text-gray-800"
        }
      >
        {value}
      </span>

    </div>
  );
}