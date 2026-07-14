"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

type Props = {
  open: boolean;
  loading?: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmationModal({
  open,
  loading = false,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-700",
  onConfirm,
  onClose,
}: Props) {

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

              <TriangleAlert
                size={70}
                className="text-red-500"
              />

            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">

              {title}

            </h2>

            <p className="mt-3 text-center text-gray-500">

              {message}

            </p>

            <div className="mt-8 flex gap-4">

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-xl border py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
              >

                {cancelText}

              </button>

              <button
                type="button"
                disabled={loading}
                onClick={onConfirm}
                className={`flex-1 rounded-xl py-3 font-semibold text-white transition disabled:opacity-50 ${confirmColor}`}
              >

                {loading
                  ? "Please wait..."
                  : confirmText}

              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );

}