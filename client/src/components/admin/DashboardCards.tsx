"use client";

import { motion } from "framer-motion";
import {
  Users,
  Wallet,
  ArrowRightLeft,
  Landmark,
  TrendingDown,
  Repeat,
} from "lucide-react";

type Props = {
  dashboardData: {
    totalUsers: number;
    totalTransactions: number;
    totalBalance: number;
    totalDeposits: number;
    totalWithdrawals: number;
    totalTransfers: number;
  };
};

export default function DashboardCards({
  dashboardData,
}: Props) {

  const cards = [
    {
      title: "Total Users",
      value: dashboardData.totalUsers.toLocaleString(),
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      title: "Total Balance",
      value: `₹${dashboardData.totalBalance.toLocaleString()}`,
      icon: Wallet,
      bg: "bg-green-100",
      color: "text-green-700",
    },
    {
      title: "Transactions",
      value: dashboardData.totalTransactions.toLocaleString(),
      icon: ArrowRightLeft,
      bg: "bg-purple-100",
      color: "text-purple-700",
    },
    {
      title: "Deposits",
      value: `₹${dashboardData.totalDeposits.toLocaleString()}`,
      icon: Landmark,
      bg: "bg-emerald-100",
      color: "text-emerald-700",
    },
    {
      title: "Withdrawals",
      value: `₹${dashboardData.totalWithdrawals.toLocaleString()}`,
      icon: TrendingDown,
      bg: "bg-red-100",
      color: "text-red-700",
    },
    {
      title: "Transfers",
      value: `₹${dashboardData.totalTransfers.toLocaleString()}`,
      icon: Repeat,
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -5,
            }}
            className="rounded-3xl bg-white p-6 shadow-lg transition"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
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
                  size={30}
                  className={card.color}
                />

              </div>

            </div>

          </motion.div>

        );

      })}

    </div>
  );
}