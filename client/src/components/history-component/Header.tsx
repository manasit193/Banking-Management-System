"use client";
import {useRouter} from "next/navigation";
import { ArrowLeft } from "lucide-react";
export default function Header() {
  const router = useRouter();
  return (

<button
  onClick={() => router.push("/dashboard")}
  className="rounded-2xl bg-transparent backdrop-blur-md border border-gray-300 shadow-sm hover:bg-blue-100 hover:shadow-lg text-black" 
>
  <ArrowLeft size={28} />
</button>

  );
}