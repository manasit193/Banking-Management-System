"use client";

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
} from "lucide-react";

type Transaction = {
  _id: string;
  type: "Deposit" | "Withdraw" | "Transfer";
  amount: number;
};

type Props = {
  transactions: Transaction[];
};

export default function HistoryStats({
  transactions,
}: Props) {

  const totalTransactions = transactions.length;

  const depositAmount = transactions
    .filter((item) => item.type === "Deposit")
    .reduce((total, item) => total + item.amount, 0);

  const withdrawAmount = transactions
    .filter((item) => item.type === "Withdraw")
    .reduce((total, item) => total + item.amount, 0);

  const transferAmount = transactions
    .filter((item) => item.type === "Transfer")
    .reduce((total, item) => total + item.amount, 0);

  const stats = [
    {
      title: "Transactions",
      value: totalTransactions.toString(),
      icon: Wallet,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Deposit",
      value: `₹${depositAmount.toLocaleString()}`,
      icon: ArrowDownCircle,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Withdraw",
      value: `₹${withdrawAmount.toLocaleString()}`,
      icon: ArrowUpCircle,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Transfer",
      value: `₹${transferAmount.toLocaleString()}`,
      icon: Repeat,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => (

        <div
          key={item.title}
          className="rounded-2xl bg-white p-6 shadow-lg"
        >

          <div
            className={`inline-flex rounded-xl p-3 ${item.color}`}
          >
            <item.icon size={24} />
          </div>

          <h3 className="mt-5 text-gray-500">
            {item.title}
          </h3>

          <p className="mt-2 text-3xl font-bold text-gray-800">
            {item.value}
          </p>

        </div>

      ))}

    </div>
  );
}