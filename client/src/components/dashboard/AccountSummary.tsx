"use client";

import { motion } from "framer-motion";
import {User,CreditCard,Landmark,ShieldCheck,CalendarDays,BadgeCheck,} from "lucide-react";

type Props = {
  user: {
    fullName: string;
    accountNumber: string;
    accountType: string;
    kycStatus: string;
    createdAt: string;
  };
};

export default function AccountSummary({
  user,
}: Props) {

  const memberSince = new Date(
    user.createdAt
  ).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const accountData = [
    {
      icon: User,
      label: "Account Holder",
      value: user.fullName,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      icon: CreditCard,
      label: "Account Number",
      value: user.accountNumber,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      icon: Landmark,
      label: "Account Type",
      value: user.accountType,
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
    },
    {
      icon: ShieldCheck,
      label: "Account Status",
      value: "Active",
      badge: true,
      badgeColor: "bg-green-100 text-green-700",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700",
    },
    {
      icon: CalendarDays,
      label: "Member Since",
      value: memberSince,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: BadgeCheck,
      label: "KYC Status",
      value: user.kycStatus,
      badge: true,
      badgeColor:
        user.kycStatus === "Verified"
          ? "bg-blue-100 text-blue-700"
          : user.kycStatus === "Rejected"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >

      <div className="border-b px-5 py-4">

        <h2 className="text-xl font-bold text-gray-900">
          Account Summary
        </h2>

      </div>

      <div>

        {accountData.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="flex items-center justify-between border-b px-5 py-3 last:border-b-0"
            >

              <div className="flex items-center gap-3">

                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.iconBg}`}
                >

                  <Icon
                    className={`h-4 w-4 ${item.iconColor}`}
                  />

                </div>

                <p className="text-sm text-gray-600">
                  {item.label}
                </p>

              </div>

              {item.badge ? (

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${item.badgeColor}`}
                >
                  {item.value}
                </span>

              ) : (

                <p className="text-sm font-semibold text-gray-900">
                  {item.value}
                </p>

              )}

            </div>

          );

        })}

      </div>

    </motion.div>
  );
}