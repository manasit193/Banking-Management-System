"use client";

import { motion } from "framer-motion";
import {
  User,
  Camera,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountSettings() {

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Account Settings
      </h2>

      {/* Edit Profile */}

      <button
        onClick={() => router.push("/profile")}
        className="flex w-full items-center justify-between rounded-2xl border border-gray-200 p-5 transition hover:bg-gray-50"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-100 p-3">

            <User
              className="text-blue-700"
              size={24}
            />

          </div>

          <div className="text-left">

            <h3 className="font-semibold text-gray-800">
              Edit Profile
            </h3>

            <p className="text-sm text-gray-500">
              Update your personal information.
            </p>

          </div>

        </div>

        <ChevronRight className="text-gray-400" />

      </button>


    </motion.div>
  );
}