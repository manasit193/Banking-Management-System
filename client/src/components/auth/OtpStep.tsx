"use client";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { verifyOTP, forgotPassword } from "@/services/auth.service";

type Props = {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  next: () => void;
  back: () => void;
};

export default function OtpStep({
  email,
  otp,
  setOtp,
  next,
  back,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleChange = (
    value: string,
    index: number
  ) => {
    if (!/^\d?$/.test(value)) return;

    const otpArray = otp.padEnd(6).split("");

    otpArray[index] = value;

    const newOtp = otpArray.join("").trim();

    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);

      await verifyOTP(email, otp);

      next();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      await forgotPassword(email);

      setSeconds(120);

      toast.success("OTP Sent Again");
    } catch {
      toast.error("Unable to resend OTP");
    }
  };

  return (
    <div className="space-y-8">

      <div>

        <p className="text-gray-500">
          Enter the 6-digit OTP sent to
        </p>

        <p className="font-semibold text-blue-700">
          {email}
        </p>

      </div>

      <div className="flex justify-between gap-2 text-gray-700 border-red-500">

        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputs.current[index] = el;
            }}
            value={otp[index] || ""}
            maxLength={1}
            onChange={(e) =>
              handleChange(
                e.target.value,
                index
              )
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            className="h-14 w-14 rounded-xl border text-center text-2xl font-bold outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
          />
        ))}

      </div>

      <button
        onClick={handleVerify}
        disabled={loading || otp.length !== 6}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 font-semibold text-white disabled:opacity-60"
      >

        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin text-gray-700"
            />

            Verifying...

          </>
        ) : (
          "Verify OTP"
        )}

      </button>

      <div className="text-center">

        {seconds > 0 ? (
          <p className="text-gray-500">

            Resend OTP in

            <span className="font-semibold text-blue-700">

              {" "}
              {seconds}s

            </span>

          </p>
        ) : (
          <button
            onClick={resendOTP}
            className="font-semibold text-blue-700"
          >
            Resend OTP
          </button>
        )}

      </div>

      <button
        onClick={back}
        className="w-full rounded-xl border py-3 text-black bg-red-500"
      >
        Back
      </button>

    </div>
  );
}