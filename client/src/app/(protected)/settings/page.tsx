"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Accountsettings from "@/components/settings/Accountsettings";
import NotificationSetting from "@/components/settings/NotificationSetting";
import AppearanceSetting from "@/components/settings/AppearanceSetting";
import LogoutCard from "@/components/settings/LogoutCard";
import SecuritySettings from "@/components/settings/SecuritySettings";
export default function SettingsPage() {

  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-5xl space-y-6">

        {/* Back Button */}

        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition hover:bg-gray-100"
        >

          <ArrowLeft size={18} />

          Back to Dashboard

        </button>

        <SettingsHeader />

        <Accountsettings />

        <SecuritySettings />

        <NotificationSetting />

        <AppearanceSetting />

        <LogoutCard />

      </div>

    </main>
  );
}