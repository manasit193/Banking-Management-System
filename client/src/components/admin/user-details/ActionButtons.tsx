"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

import { verifyKyc, rejectKyc } from "@/services/admin.service";

type Props = {
  user: {
    _id: string;
    kycStatus: string;
  };
  refresh: () => Promise<void>;
};

export default function ActionButtons({
  user,
  refresh,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const handleVerify = async () => {

    try {

      setLoading(true);

      await verifyKyc(user._id);

      toast.success(
        "KYC Verified Successfully"
      );

      await refresh();

    } catch {

      toast.error(
        "Failed to verify KYC"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleReject = async () => {

    try {
  
      setLoading(true);
  
      await rejectKyc(user._id);
  
      toast.success(
        "KYC Rejected Successfully"
      );
  
      await refresh();
  
    } catch {
  
      toast.error(
        "Failed to reject KYC"
      );
  
    } finally {
  
      setLoading(false);
  
    }
  
  };

  return (

    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Actions
      </h2>

      <div className="flex flex-wrap gap-4">

        {/* Verify */}

        <button
          onClick={handleVerify}
          disabled={
            loading ||
            user.kycStatus === "Verified"
          }
          className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >

          <CheckCircle2 size={20} />

          {loading
            ? "Verifying..."
            : "Verify KYC"}

        </button>

        {/* Reject */}

        <button
          onClick={handleReject}
          disabled={
            loading ||
            user.kycStatus === "Rejected"
          }
          className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >

          <XCircle size={20} />

          {loading
            ? "Rejecting..."
            : "Reject KYC"}

        </button>

        {/* Back */}

        <button
          onClick={() =>
            router.push("/admin/users")
          }
          className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >

          <ArrowLeft size={20} />

          Back to Users

        </button>

      </div>

    </div>

  );

}