"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

type Props = {
  amount?: number;
  currentBalance?: number;
};

export default function DepositSummry({
  amount = 0,
  currentBalance = 50000,
}: Props) {
  const processingFee = 0;
  const gst = 0;

  const updatedBalance = currentBalance + amount;

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
      <h2 className="text-2xl font-bold text-green-600">
        Deposit Summary
      </h2>

      <div className="mt-8 space-y-5 text-black">
        <Row
          title="Current Balance"
          value={`₹${currentBalance.toLocaleString()}`}
        />

        <Row
          title="Deposit Amount"
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
          title="Updated Balance"
          value={`₹${updatedBalance.toLocaleString()}`}
          bold
        />

        <Row
          title="Transaction Type"
          value="Deposit"
        />

        <Row
          title="Date"
          value={today}
        />
      </div>

      <div className="mt-8 rounded-2xl bg-green-100 p-5">
        <div className="flex gap-4">
          <Wallet className="text-green-700" />

          <div>
            <h3 className="font-bold text-green-700">
              Secure Deposit
            </h3>

            <p className="text-sm text-green-700">
              Your deposit is protected with bank-level security.
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
            ? "text-lg font-bold text-green-700"
            : "font-semibold text-gray-800"
        }
      >
        {value}
      </span>
    </div>
  );
}