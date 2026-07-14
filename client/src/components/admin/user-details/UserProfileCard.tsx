"use client";

import { motion } from "framer-motion";
import {
  User,
  Mail,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

type Props = {
  user: {
    fullName: string;
    email: string;
    accountNumber: string;
    kycStatus: string;
    profileImage?: string;
  };
};

export default function UserProfileCard({
  user,
}: Props) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white p-8 shadow-lg"
    >
      <div className="flex flex-col items-center gap-5 lg:flex-row">

        <img
          src={
            user.profileImage ||
            "https://i.pravatar.cc/200"
          }
          alt={user.fullName}
          className="h-32 w-32 rounded-full border-4 border-blue-600 object-cover"
        />

        <div className="flex-1">

          <h1 className="text-3xl font-bold text-gray-800">
            {user.fullName}
          </h1>

          <div className="mt-4 flex flex-col gap-3 text-gray-600">

            <div className="flex items-center gap-3">

              <Mail
                size={18}
                className="text-blue-600"
              />

              <span>{user.email}</span>

            </div>

            <div className="flex items-center gap-3">

              <CreditCard
                size={18}
                className="text-blue-600"
              />

              <span>{user.accountNumber}</span>

            </div>

          </div>

        </div>

        <div>

          <span
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${
              user.kycStatus === "Verified"
                ? "bg-green-100 text-green-700"
                : user.kycStatus === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >

            <BadgeCheck size={18} />

            {user.kycStatus}

          </span>

        </div>

      </div>
    </motion.div>
  );
}