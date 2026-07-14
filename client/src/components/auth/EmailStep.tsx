"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { forgotPassword } from "@/services/auth.service";
import { useRouter } from "next/navigation";

type Props = {
  email: string;
  setEmail: (email: string) => void;
  next: () => void;
};

export default function EmailStep({
  email,
  setEmail,
  next,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await forgotPassword(email);

      localStorage.setItem(
      "devOTP",
      response.otp
);

next();

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>

        <label className="mb-2 block font-medium text-green-500">
          Registered Email
        </label>

        <div className="relative">

          <Mail className="absolute left-4 top-4 text-gray-700" />

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-gray-700"
          />

        </div>

      </div>

      <button
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            Sending OTP...
          </>
        ) : (
          "Send OTP"
        )}
      </button>

    </form>
  );
}