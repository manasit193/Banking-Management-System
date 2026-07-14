"use client";
import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import NotificationDropdown from "./NotificationDropdown";
import { motion } from "framer-motion";
import {
  Bell,
  Settings,
} from "lucide-react";

type Props = {
  user: {
    fullName: string;
    accountType: string;
    profileImage: string;
  };
};

export default function DashboardHeader({
  user,
}: Props) {

  const hour = new Date().getHours();
  const router = useRouter();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const [open, setOpen] = useState(false);
  const [backendOnline, setBackendOnline] =useState(false);
  useEffect(() => {
   
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

  checkBackend();

  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-white p-6 shadow-lg lg:flex-row"
    >

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          {greeting} 👋
        </h1>

        <p className="mt-2 text-gray-500">

          Welcome back,

          <span className="ml-1 font-semibold text-blue-700">
            {user.fullName}
          </span>

        </p>

        <p className="mt-1 text-sm text-gray-400">
          Here's your latest banking overview.
        </p>

      </div>

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


      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Notification */}
        
        <div className="relative">

        <button
        onClick={() => setOpen(!open)}
        className="relative rounded-xl bg-gray-100 p-3 transition hover:bg-blue-100">

       <Bell size={22} className="text-gray-700"/>

      <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

      </button>

      <NotificationDropdown
      open={open}
      onClose={() => setOpen(false)}/>

      </div>

        

      <button
       onClick={() => router.push("/settings")}
       className="rounded-xl bg-gray-100 p-3 transition hover:bg-blue-100">
      <Settings
      size={22}
      className="text-gray-700"/>
      </button>

        {/* User */}

        <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-3 py-2">

          <img
            src={
              user.profileImage ||
              "https://i.pravatar.cc/150?img=12"
            }
            alt="Profile"
            className="h-11 w-11 rounded-full border-2 border-blue-600 object-cover"
          />

          <div>

            <h2 className="font-semibold text-gray-800">
              {user.fullName}
            </h2>

            <p className="text-sm text-gray-500">
              {user.accountType} Account
            </p>

          </div>

        </div>

      </div>

    </motion.header>
  );
}