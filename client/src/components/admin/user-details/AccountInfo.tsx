"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Landmark,
  Wallet,
  CalendarDays,
} from "lucide-react";

type Props = {
  user: {
    accountNumber: string;
    accountType: string;
    balance: number;
    createdAt: string;
  };
};

export default function AccountInfo({
  user,
}: Props) {

  const accountItems = [
    {
      icon: CreditCard,
      label: "Account Number",
      value: user.accountNumber,
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      icon: Landmark,
      label: "Account Type",
      value: user.accountType,
      bg: "bg-green-100",
      color: "text-green-700",
    },
    {
      icon: Wallet,
      label: "Available Balance",
      value: `₹${user.balance.toLocaleString("en-IN")}`,
      bg: "bg-purple-100",
      color: "text-purple-700",
    },
    {
      icon: CalendarDays,
      label: "Member Since",
      value: new Date(
        user.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="rounded-3xl bg-white shadow-lg"
    >
      <div className="border-b px-6 py-5">

        <h2 className="text-2xl font-bold text-gray-800">
          Account Information
        </h2>

      </div>

      <div>

        {accountItems.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="flex items-center justify-between border-b px-6 py-4 last:border-none"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`rounded-xl p-2 ${item.bg}`}
                >

                  <Icon
                    size={18}
                    className={item.color}
                  />

                </div>

                <span className="font-medium text-gray-600">
                  {item.label}
                </span>

              </div>

              <span className="font-semibold text-gray-800">
                {item.value}
              </span>

            </div>

          );

        })}

      </div>

    </motion.div>
  );
}