"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Landmark } from "lucide-react";
import BackButton from "@/components/auth/BackButton";
export default function LoginBanner() {
  return (
    <motion.div
      initial={false}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-10 text-white"
    >
      
      <BackButton />
    
      <div>
        

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-white/20 p-3">
            <Landmark size={32} />
          </div>

          <h1 className="text-3xl font-bold">
            Nexa Bank
          </h1>

        </div>

        <h2 className="mt-12 text-4xl font-bold leading-tight">
          Secure Banking,
          <br />
          Simplified.
        </h2>

        <p className="mt-6 text-blue-100 leading-7">
          Access your account securely, manage transactions, and track your finances with confidence.
        </p>

      </div>

      <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-green-300" />

          <div>

            <h3 className="font-semibold">
              Bank-Level Security
            </h3>

            <p className="text-sm text-blue-100">
              Protected with JWT Authentication & Encryption.
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}