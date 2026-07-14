"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-8 shadow-lg"
    >
      <div className="flex items-center gap-5">

        <div className="rounded-2xl bg-blue-100 p-4">

          <Settings
            size={34}
            className="text-blue-700"
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Settings
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your account, security and preferences.
          </p>

        </div>

      </div>
    </motion.div>
  );
}