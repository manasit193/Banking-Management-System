"use client";

import { motion } from "framer-motion";
import {
  User,
  Mail,
  CreditCard,
  CalendarDays,
} from "lucide-react";

type UserType = {
  _id: string;
  fullName: string;
  email: string;
  accountNumber: string;
  accountType: string;
  createdAt: string;
};

type Props = {
  users: UserType[];
};

export default function RecentUsers({
  users,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >
      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Recent Users
          </h2>

          <p className="mt-1 text-gray-500">
            Latest registered users
          </p>

        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {users.length} Users
        </span>

      </div>

      {users.length === 0 ? (

        <div className="py-10 text-center text-gray-500">
          No recent users found.
        </div>

      ) : (

        <div className="space-y-4">

          {users.map((user) => (

            <div
              key={user._id}
              className="flex flex-col gap-5 rounded-2xl border border-gray-200 p-5 transition hover:border-blue-300 hover:bg-blue-50 lg:flex-row lg:items-center lg:justify-between"
            >

              {/* Left */}

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

                  <User
                    size={28}
                    className="text-blue-700"
                  />

                </div>

                <div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {user.fullName}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

                    <div className="flex items-center gap-2">

                      <Mail size={16} />

                      {user.email}

                    </div>

                    <div className="flex items-center gap-2">

                      <CreditCard size={16} />

                      {user.accountNumber}

                    </div>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div className="flex flex-col items-start gap-2 lg:items-end">

                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                  {user.accountType}
                </span>

                <div className="flex items-center gap-2 text-sm text-gray-500">

                  <CalendarDays size={16} />

                  {new Date(
                    user.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </motion.div>
  );
}