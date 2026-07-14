import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 text-white">

        <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h1 className="text-6xl font-extrabold leading-tight">
              Smart Banking
              <br />
              Made Simple
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Secure Banking Platform with Deposit, Withdraw, Transfer,
              Transaction History and Admin Dashboard.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                href="/register"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                Open Account
              </Link>

              <Link
                href="/login"
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"
              >
                Login
              </Link>

              <Link
                href="/login?redirect=/admin"
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"
              >
                Admin Dashboard
              </Link>

            </div>
          </div>

          

        </section>

      </main>

      <Footer />
    </>
  );
}