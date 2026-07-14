"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function ResetPasswordForm() {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (

    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-2xl bg-green-100 p-3">

          <CheckCircle className="text-green-600" />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-blue-700">
            Reset Password
          </h1>

          <p className="text-gray-500">
            Create a strong new password.
          </p>

        </div>

      </div>

      <form className="space-y-6">

        {/* Password */}

        <div>

          <label className="mb-2 block font-medium text-gray-700">
            New Password
          </label>

          <div className="relative">

            <Lock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 text-gray-700"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Confirm */}

        <div>

          <label className="mb-2 block font-medium text-green-700">
            Confirm Password
          </label>

          <div className="relative">

            <Lock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 text-green-700"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-4 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Password Strength */}

        <div>

          <div className="mb-2 flex justify-between text-sm text-black">

            <span>Password Strength</span>

            <span className="font-semibold text-green-600">
              Strong
            </span>

          </div>

          <div className="h-2 rounded-full bg-gray-200">

            <div className="h-2 w-4/5 rounded-full bg-green-500"></div>

          </div>

        </div>

        <button
          className="w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition hover:bg-green-700"
        >
          Reset Password
        </button>

      </form>

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-blue-700 hover:underline"
      >

        <ArrowLeft size={18} />

        Back to Login

      </Link>

    </div>

  );
}