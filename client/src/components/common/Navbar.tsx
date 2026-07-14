import Link from "next/link";
import {  LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-700"
        >
          
          <Image src="/logo.png" alt="Nexa Bank" width={30} height={30} />
          Nexa Bank
        </Link>

        <div className="flex items-center gap-4">

          <Link
            href="/login"
            className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-gray-100 transition font-bold text-black"
          >
            <LogIn size={18} />
            Login
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <UserPlus size={18} />
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}