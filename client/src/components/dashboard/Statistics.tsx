"use client";

import {TrendingUp,TrendingDown,Wallet,Repeat} from "lucide-react";

type Props = {
  stats: {
    totalTransactions: number;
    totalDeposit: number;
    totalWithdraw: number;
    totalTransfer: number;
  };
};

export default function Statistics({
  stats,
}: Props) {

  const saving =
    stats.totalDeposit -
    stats.totalWithdraw -
    stats.totalTransfer;

  const cards = [
    {
      title: "Income",
      value: `₹${stats.totalDeposit.toLocaleString()}`,
      icon: TrendingUp,
      bg: "bg-green-100",
      iconColor: "text-green-700",
      titleColor: "text-green-600",
    },
    {
      title: "Expense",
      value: `₹${stats.totalWithdraw.toLocaleString()}`,
      icon: TrendingDown,
      bg: "bg-red-100",
      iconColor: "text-red-700",
      titleColor: "text-red-600",
    },
    {
      title: "Transfer",
      value: `₹${stats.totalTransfer.toLocaleString()}`,
      icon: Repeat,
      bg: "bg-blue-100",
      iconColor: "text-blue-700",
      titleColor: "text-blue-600",
    },
    {
      title: "Net Saving",
      value: `₹${saving.toLocaleString()}`,
      icon: Wallet,
      bg: "bg-purple-100",
      iconColor: "text-purple-700",
      titleColor: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className={`${card.bg} rounded-2xl p-6 shadow-sm`}
          >

            <Icon
              className={card.iconColor}
              size={35}
            />

            <h2
              className={`mt-5 text-xl font-bold ${card.titleColor}`}
            >
              {card.title}
            </h2>

            <p className="mt-2 text-lg font-bold text-gray-700">
              {card.value}
            </p>

          </div>

        );

      })}

    </div>
  );
}