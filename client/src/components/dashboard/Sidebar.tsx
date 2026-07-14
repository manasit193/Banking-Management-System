"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {LayoutDashboard,Wallet,ArrowDownCircle,Send,History,User,LogOut,} from "lucide-react";
import LogoutCard from "./LogoutCard";
export default function Sidebar() {
  return (
    <motion.aside
      initial={false}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-72 min-h-screen bg-gradient-to-b from-blue-700 via-blue-800 to-slate-900 text-white shadow-2xl flex flex-col justify-between"
    >
      <div>

        <div className="flex items-center gap-3 p-8">

          
          <div>

            <h1 className="text-2xl font-bold">
              NEXA BANK
            </h1>

            <p className="text-blue-200 text-sm">
              Banking System
            </p>

          </div>

        </div>

        <nav className="px-5 space-y-2">

          <Link
            href="/dashboard"
            className="flex items-center gap-4 rounded-xl px-5 py-4 bg-blue-600 hover:bg-blue-500 transition"
          >
            <LayoutDashboard size={22} />
            Dashboard
          </Link>

          <Link
            href="/deposit"
            className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-blue-700 transition"
          >
            <Wallet size={22} />
            Deposit
          </Link>

          <Link
            href="/withdraw"
            className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-blue-700 transition"
          >
            <ArrowDownCircle size={22} />
            Withdraw
          </Link>

          <Link
            href="/transfer"
            className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-blue-700 transition"
          >
            <Send size={22} />
            Transfer
          </Link>

          <Link
            href="/history"
            className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-blue-700 transition"
          >
            <History size={22} />
            Transaction History
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-blue-700 transition"
          >
            <User size={22} />
            Profile
          </Link>

        </nav>
        <LogoutCard />
      </div>

      

    </motion.aside>
  );
}