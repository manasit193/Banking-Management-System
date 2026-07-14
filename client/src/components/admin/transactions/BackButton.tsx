"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/admin")}
      className="flex h-10 w-10 items-center justify-center bg-cream-700 rounded-xl border border-gray-300 bg-white shadow-sm transition-all duration-200 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
    >
      <ArrowLeft className="h-5 w-5 text-blue-700" />
    </button>
  );
}