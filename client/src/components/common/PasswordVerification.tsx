"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

type Props = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onVerify: (password: string) => void;
};

export default function PasswordVerificationModal({
  open,
  loading,
  onClose,
  onVerify,
}: Props) {
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleVerify = () => {
    if (!password.trim()) return;

    onVerify(password);

    setPassword("");
  };

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
        >

          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >

            <div className="flex justify-center">

              <Lock
                size={65}
                className="text-blue-600"
              />

            </div>

            <h2 className="mt-5 text-center text-2xl font-bold text-gray-800">

              Verify Password

            </h2>

            <p className="mt-2 text-center text-gray-500">

              Enter your account password to continue.

            </p>

            <div className="relative mt-6">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 py-3 pl-4 pr-12 text-black outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-3.5"
              >

                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}

              </button>

            </div>

            <div className="mt-8 flex gap-4">

              <button
                onClick={onClose}
                className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-100 text-white bg-red-500"
              >

                Cancel

              </button>

              <button
                disabled={loading}
                onClick={handleVerify}
                className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >

                {loading
                  ? "Verifying..."
                  : "Verify"}

              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}