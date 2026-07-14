"use client";

import { motion } from "framer-motion";
import {BadgeCheck,CreditCard,Wallet,} from "lucide-react";

type Props = {
  receiver: {
    fullName: string;
    accountNumber: string;
  } | null;
  amount: string;
  currentBalance: number;
};

export default function TransferSummary({receiver,amount,currentBalance,}: Props) {
  const transferAmount = Number(amount) || 0;

  const transferFee = 0;
  const gst = 0;

  const totalPayable =
    transferAmount + transferFee + gst;

  const remainingBalance =
    currentBalance - totalPayable;

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Transfer Summary
      </h2>

      <p className="mt-2 text-gray-500">
        Review your transaction before confirming.
      </p>

      {receiver && (
        <div className="mt-8 flex items-center gap-4 rounded-2xl bg-blue-50 p-5">
          <div className="rounded-full bg-blue-100 p-3">
            <CreditCard className="text-blue-700" />
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-bold text-gray-800">
              {receiver.fullName}

              <BadgeCheck
                size={18}
                className="text-blue-600"
              />
            </h3>

            <p className="text-sm text-gray-500">
              {receiver.accountNumber}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-5">

        <SummaryRow
          title="Available Balance"
          value={`₹${currentBalance.toLocaleString()}`}
        />

        <SummaryRow
          title="Transfer Amount"
          value={`₹${transferAmount.toLocaleString()}`}
        />

        <SummaryRow
          title="Transfer Fee"
          value={`₹${transferFee}`}
        />

        <SummaryRow
          title="GST"
          value={`₹${gst}`}
        />

        <hr />

        <SummaryRow
          title="Remaining Balance"
          value={`₹${remainingBalance.toLocaleString()}`}
          bold
        />

      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 p-4">

        <Wallet className="text-green-600" />

        <div>

          <h3 className="font-semibold text-green-700">
            Secure Transaction
          </h3>

          <p className="text-sm text-green-600">
            Protected with bank-level encryption.
          </p>

        </div>

      </div>

    </motion.div>
  );
}

type SummaryRowProps = {
  title: string;
  value: string;
  bold?: boolean;
};

function SummaryRow({
  title,
  value,
  bold = false,
}: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between">

      <span
        className={
          bold
            ? "text-lg font-bold text-gray-800"
            : "text-gray-600"
        }
      >
        {title}
      </span>

      <span
        className={
          bold
            ? "text-xl font-bold text-blue-700"
            : "font-semibold text-gray-800"
        }
      >
        {value}
      </span>

    </div>
  );
}