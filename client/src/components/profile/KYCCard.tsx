"use client";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { uploadKYC } from "@/services/kyc.service";

export default function KYCCard() {

  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    try {

      setLoading(true);

      await uploadKYC(file);

      toast.success("KYC Uploaded Successfully ✅");

      window.location.reload();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Upload Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="rounded-3xl bg-white p-8 shadow-xl">

      <h2 className="text-2xl font-bold text-gray-800">

        KYC Verification

      </h2>

      <p className="mt-2 text-gray-500">

        Upload your PAN / Aadhaar for verification.

      </p>

      <button
        onClick={() => inputRef.current?.click()}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700"
      >

        {loading ? (

          <Loader2
            size={20}
            className="animate-spin"
          />

        ) : (

          <Upload size={20} />

        )}

        Upload KYC

      </button>

      <input
        hidden
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleUpload}
      />

    </div>

  );

}