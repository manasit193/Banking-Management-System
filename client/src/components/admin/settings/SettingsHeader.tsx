"use client";

import { Settings } from "lucide-react";
import BackButton from "@/components/admin/transactions/BackButton";
export default function SettingsHeader() {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex items-center gap-4">
        <BackButton />
        <div className="rounded-2xl bg-blue-100 p-4">
          <Settings
            size={32}
            className="text-blue-600"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Settings
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your admin profile and security settings.
          </p>
        </div>
      </div>
    </div>
  );
}