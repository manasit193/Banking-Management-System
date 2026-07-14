"use client";

import { useState } from "react";
import { Download, Search } from "lucide-react";
import ExportModal from "./ExportModel";
import { exportCSV } from "@/utils/exportCSV";
import { exportPDF } from "@/utils/exportPDF";

type Transaction = {
  _id: string;
  type: "Deposit" | "Withdraw" | "Transfer";
  amount: number;
  createdAt: string;
  sender?: {
    fullName: string;
    accountNumber: string;
  };
  receiver?: {
    fullName: string;
    accountNumber: string;
  };
};

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  transactions: Transaction[];
};

export default function HistoryHeader({
  search,
  setSearch,
  filter,
  setFilter,
  transactions,
}: Props) {
  const [openExport, setOpenExport] = useState(false);

  return (
    <>
      <header className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-lg lg:flex-row lg:items-center lg:justify-between">
        
        <div>
        
          <h1 className="text-3xl font-bold text-gray-800">
            Transaction History
          </h1>

          <p className="mt-1 text-gray-500">
            Review all your deposits, withdrawals and transfers.
          </p>

        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by type..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:w-64"
            />

          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="All">
              All Transactions
            </option>

            <option value="Deposit">
              Deposit
            </option>

            <option value="Withdraw">
              Withdraw
            </option>

            <option value="Transfer">
              Transfer
            </option>

          </select>

          <button
            type="button"
            onClick={() => setOpenExport(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >

            <Download size={18} />

            Export

          </button>

        </div>

      </header>

      <ExportModal
        open={openExport}
        onClose={() => setOpenExport(false)}
        onCSV={() => {
          exportCSV(transactions);
          setOpenExport(false);
        }}
        onPDF={() => {
          exportPDF(transactions);
          setOpenExport(false);
        }}
      />
    </>
  );
}