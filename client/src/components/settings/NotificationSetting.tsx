"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

export default function NotificationSettings() {

  const [emailNotification, setEmailNotification] =
    useState(true);

  const [pushNotification, setPushNotification] =
    useState(true);

  const [transactionAlert, setTransactionAlert] =
    useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Notification Settings
      </h2>

      <SettingItem
        icon={<Mail className="text-blue-600" />}
        title="Email Notifications"
        description="Receive account updates by email."
        checked={emailNotification}
        onChange={() =>
          setEmailNotification(!emailNotification)
        }
      />

      <SettingItem
        icon={<Smartphone className="text-green-600" />}
        title="Push Notifications"
        description="Receive notifications on your device."
        checked={pushNotification}
        onChange={() =>
          setPushNotification(!pushNotification)
        }
      />

      <SettingItem
        icon={<Bell className="text-red-600" />}
        title="Transaction Alerts"
        description="Get notified for every deposit, withdrawal and transfer."
        checked={transactionAlert}
        onChange={() =>
          setTransactionAlert(!transactionAlert)
        }
      />

    </motion.div>
  );
}

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function SettingItem({
  icon,
  title,
  description,
  checked,
  onChange,
}: SettingItemProps) {
  return (
    <div className="mb-5 flex items-center justify-between rounded-2xl border border-gray-200 p-5 last:mb-0">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-gray-100 p-3">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold text-gray-800">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            {description}
          </p>

        </div>

      </div>

      <button
        onClick={onChange}
        className={`relative h-7 w-14 rounded-full transition ${
          checked
            ? "bg-blue-600"
            : "bg-gray-300"
        }`}
      >

        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked
              ? "left-8"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}