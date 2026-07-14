"use client";

import { motion } from "framer-motion";
import {
  FileBadge,
  BadgeCheck,
  ImageIcon,
} from "lucide-react";

type Props = {
  user: {
    kycDocumentNumber: string;
    kycStatus: string;
    kycDocument?: string;
  };
};

export default function KycCard({
  user,
}: Props) {

  const statusColor =
    user.kycStatus === "Verified"
      ? "bg-green-100 text-green-700"
      : user.kycStatus === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="rounded-3xl bg-white shadow-lg"
    >

      {/* Header */}

      <div className="border-b px-6 py-5">

        <h2 className="text-2xl font-bold text-gray-800">
          KYC Information
        </h2>

      </div>

      {/* Content */}

      <div className="space-y-6 p-6">

        {/* Document Number */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-2">

              <FileBadge
                size={18}
                className="text-blue-700"
              />

            </div>

            <span className="font-medium text-gray-600">
              Document Number
            </span>

          </div>

          <span className="font-semibold text-gray-800">
            {user.kycDocumentNumber}
          </span>

        </div>

        {/* Status */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-100 p-2">

              <BadgeCheck
                size={18}
                className="text-green-700"
              />

            </div>

            <span className="font-medium text-gray-600">
              KYC Status
            </span>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColor}`}
          >
            {user.kycStatus}
          </span>

        </div>

        {/* Document */}

        <div>

          <div className="mb-3 flex items-center gap-2">

            <ImageIcon
              size={18}
              className="text-blue-700"
            />

            <span className="font-medium text-gray-700">
              Uploaded Document
            </span>

          </div>

          {user.kycDocument ? (

            <img
              src={user.kycDocument}
              alt="KYC Document"
              className="h-72 w-full rounded-2xl border object-cover"
            />

          ) : (

            <div className="flex h-72 items-center justify-center rounded-2xl border-2 border-dashed text-gray-400">

              No document uploaded

            </div>

          )}

        </div>

      </div>

    </motion.div>
  );
}