"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  ShieldCheck,
} from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";

export default function AdminHeader() {

  const [open, setOpen] = useState(false);

  const [adminName, setAdminName] =
    useState("Administrator");

  const [backendOnline, setBackendOnline] =
    useState(false);

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (user?.fullName) {

      setAdminName(user.fullName);

    }

    checkBackend();

  }, []);

  const checkBackend = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/v1/health"
      );

      setBackendOnline(response.ok);

    } catch {

      setBackendOnline(false);

    }

  };

  return (

    <motion.header
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-lg lg:flex-row lg:items-center lg:justify-between"
    >

      {/* Left */}

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-4">

          <ShieldCheck
            size={30}
            className="text-blue-700"
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            Admin Dashboard

          </h1>

          <p className="mt-1 text-gray-500">

            Welcome back,

            <span className="font-semibold text-blue-600">

              {" "}
              {adminName}

            </span>

            👋

          </p>

          <div
            className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
              backendOnline
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >

            <span
              className={`h-2.5 w-2.5 rounded-full ${
                backendOnline
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />

            {backendOnline
              ? " Online"
              : " Offline"}

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Notification */}

        <button
          onClick={() => setOpen(!open)}
          className="relative rounded-xl bg-gray-100 p-3 transition hover:bg-blue-100"
        >

          <Bell
            size={22}
            className="text-gray-700"
          />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

        </button>

        <NotificationDropdown
          open={open}
          onClose={() => setOpen(false)}
        />

        {/* Admin Profile */}

        <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3">

          <img
            src="https://i.pravatar.cc/150?img=68"
            alt="Admin"
            className="h-12 w-12 rounded-full border-2 border-blue-600 object-cover"
          />

          <div>

            <h2 className="font-semibold text-gray-800">

              {adminName}

            </h2>

            <p className="text-sm text-gray-500">

              Super Admin

            </p>

          </div>

        </div>

      </div>

    </motion.header>

  );

}