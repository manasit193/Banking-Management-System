"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FileSpreadsheet,
  FileText,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onPDF: () => void;
  onCSV: () => void;
};

export default function ExportModal({
  open,
  onClose,
  onPDF,
  onCSV,
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
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Export Statement
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose your preferred format
                </p>

              </div>

              <button
                onClick={onClose}
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X className="text-gray-600" />
              </button>

            </div>

            <div className="mt-8 space-y-4">

              <button
                onClick={onPDF}
                className="flex w-full items-center gap-4 rounded-2xl border border-red-200 p-5 transition hover:bg-red-50"
              >

                <div className="rounded-xl bg-red-100 p-3">

                  <FileText className="text-red-600" />

                </div>

                <div className="text-left">

                  <h3 className="font-bold text-gray-800">
                    Export as PDF
                  </h3>

                  <p className="text-sm text-gray-500">
                    Download printable statement
                  </p>

                </div>

              </button>

              <button
                onClick={onCSV}
                className="flex w-full items-center gap-4 rounded-2xl border border-green-200 p-5 transition hover:bg-green-50"
              >

                <div className="rounded-xl bg-green-100 p-3">

                  <FileSpreadsheet className="text-green-600" />

                </div>

                <div className="text-left">

                  <h3 className="font-bold text-gray-800">
                    Export as CSV
                  </h3>

                  <p className="text-sm text-gray-500">
                    Open in Excel or Google Sheets
                  </p>

                </div>

              </button>

            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full rounded-2xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}