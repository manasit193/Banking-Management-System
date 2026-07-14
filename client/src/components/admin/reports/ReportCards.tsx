"use client";

import {
  Landmark,
  TrendingDown,
  Repeat,
  ArrowRightLeft,
} from "lucide-react";

type Props = {
  reports: {
    totalDeposits: number;
    totalWithdrawals: number;
    totalTransfers: number;
    totalTransactions: number;
  };
};

export default function ReportsCards({
  reports,
}: Props) {

  const cards = [
    {
      title: "Total Deposits",
      value: `₹${reports.totalDeposits.toLocaleString("en-IN")}`,
      icon: Landmark,
      color: "text-green-700",
      bg: "bg-green-100",
    },
    {
      title: "Total Withdrawals",
      value: `₹${reports.totalWithdrawals.toLocaleString("en-IN")}`,
      icon: TrendingDown,
      color: "text-red-700",
      bg: "bg-red-100",
    },
    {
      title: "Total Transfers",
      value: `₹${reports.totalTransfers.toLocaleString("en-IN")}`,
      icon: Repeat,
      color: "text-blue-700",
      bg: "bg-blue-100",
    },
    {
      title: "Transactions",
      value: reports.totalTransactions.toString(),
      icon: ArrowRightLeft,
      color: "text-purple-700",
      bg: "bg-purple-100",
    },
  ];

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-3xl bg-white p-6 shadow-lg"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-800">
                  {card.value}
                </h2>

              </div>

              <div
                className={`rounded-2xl p-4 ${card.bg}`}
              >

                <Icon
                  className={card.color}
                  size={28}
                />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}