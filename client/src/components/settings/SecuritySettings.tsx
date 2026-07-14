"use client";

import { motion } from "framer-motion";
import {
  Lock,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SecuritySettings() {

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Security
      </h2>

      <button
        onClick={() => router.push("/forgot-password")}
        className="flex w-full items-center justify-between rounded-2xl border border-gray-200 p-5 transition hover:bg-gray-50"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-red-100 p-3">

            <Lock
              size={24}
              className="text-red-600"
            />

          </div>

          <div className="text-left">

            <h3 className="font-semibold text-gray-800">
              Change Password
            </h3>

            <p className="text-sm text-gray-500">
              Reset or change your account password securely.
            </p>

          </div>

        </div>

        <ChevronRight className="text-gray-400" />

      </button>

    </motion.div>
  );
}