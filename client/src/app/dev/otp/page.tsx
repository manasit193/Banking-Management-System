"use client";

import { useEffect, useState } from "react";
import { Copy, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OTPPage() {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const savedOTP = localStorage.getItem("devOTP");

    if (savedOTP) {
      setOtp(savedOTP);
    }
  }, []);

  const copyOTP = async () => {
    if (!otp) return;

    await navigator.clipboard.writeText(otp);

    alert("OTP Copied");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-green-500">
          Developer OTP
        </h1>

        <p className="mt-2 text-gray-500">
          Development use only.
        </p>

        <div className="mt-8 rounded-2xl bg-blue-50 p-8 text-center">

          <p className="text-gray-500 text-green-500">
            Generated OTP
          </p>

          <h2 className="mt-3 text-5xl font-bold tracking-[12px] text-blue-700">
            {otp || "------"}
          </h2>

        </div>

        <button
          onClick={copyOTP}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-3 text-white hover:bg-blue-800"
        >

          <Copy size={20} />

          Copy OTP

        </button>

        <Link
          href="/forgot-password"
          className="mt-5 flex items-center justify-center gap-2 text-blue-700"
        >

          <ArrowLeft size={18} />

          Back

        </Link>

      </div>

    </main>
  );
}