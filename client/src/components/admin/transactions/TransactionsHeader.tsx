"use client";
import BackButton from "./BackButton";
import { ArrowRightLeft } from "lucide-react";

export default function TransactionsHeader() {

  return (

    <div className="rounded-2xl bg-green-400 p-6 shadow-lg flex items-center justify-between ">
      
      <BackButton />

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-4">

          <ArrowRightLeft
            className="text-blue-700 bg-cream-700"
            size={30}
          />

        </div>

        <div>

          <h1 className="text-2xl font-bold text-black">

            Transactions

          </h1>

          <p className="mt-1 text-gray-700">

            View and manage all banking transactions.

          </p>

        </div>

      </div>

    </div>

  );

}