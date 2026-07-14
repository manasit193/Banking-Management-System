"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/auth.service";

type Props = {
  email: string;
  otp: string;
  back: () => void;
};

export default function ResetPasswordStep({
  email,
  otp,
  back,
}: Props) {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] = useState(false);

  const getStrength = () => {
    if (newPassword.length < 6)
      return {
        text: "Weak",
        color: "bg-red-500",
      };

    if (newPassword.length < 10)
      return {
        text: "Medium",
        color: "bg-yellow-500",
      };

    return {
      text: "Strong",
      color: "bg-green-500",
    };
  };

  const strength = getStrength();

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(
        email,
        otp,
        newPassword
      );

      alert(
        "Password Reset Successfully"
      );

      router.replace("/login");

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* New Password */}

      <div>

        <label className="mb-2 block font-medium text-black" >
          New Password
        </label>

        <div className="relative">

          <Lock className="absolute left-4 top-4 text-gray-400" />

          <input
            type={
              showNewPassword
                ? "text"
                : "password"
            }
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            placeholder="Enter new password"
            className="w-full rounded-xl border border-gray-700 py-3 pl-12 pr-12 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-gray-700"
          />

          <button
            type="button"
            onClick={() =>
              setShowNewPassword(
                !showNewPassword
              )
            }
            className="absolute right-4 top-4 text-gray-700"
          >
            {showNewPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

      </div>

      {/* Password Strength */}

      <div>

        <div className="h-2 rounded-full bg-gray-200">

          <div
            className={`h-2 rounded-full ${strength.color}`}
            style={{
              width:
                strength.text === "Weak"
                  ? "30%"
                  : strength.text ===
                    "Medium"
                  ? "60%"
                  : "100%",
            }}
          />

        </div>

        <p className="mt-2 text-sm text-gray-500">
          Password Strength:
          <span className="ml-1 font-semibold">
            {strength.text}
          </span>
        </p>

      </div>

      {/* Confirm Password */}

      <div>

        <label className="mb-2 block font-medium text-green-600">
          Confirm Password
        </label>

        <div className="relative">

          <Lock className="absolute left-4 top-4 text-gray-700" />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            placeholder="Confirm password"
            className="w-full rounded-xl border border-gray-700 py-3 pl-12 pr-12 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-gray-700"
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

      {/* Password Match */}

      {confirmPassword && (
        <p
          className={`text-sm font-medium ${
            newPassword ===
            confirmPassword
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {newPassword ===
          confirmPassword
            ? "✓ Passwords match"
            : "✗ Passwords do not match"}
        </p>
      )}

      {/* Buttons */}

      <div className="flex gap-4">

        <button
          onClick={back}
          className="flex-1 rounded-xl border py-3 text-red-600"
        >
          Back
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>

      </div>

    </div>
  );
}