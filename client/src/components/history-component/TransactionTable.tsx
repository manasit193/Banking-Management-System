"use client";
import { useState } from "react";
import {ArrowDownCircle,ArrowUpCircle,Repeat,FileText,} from "lucide-react";
import TransactionModal from "./TransactionModel";

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
  transactions: Transaction[];
  loading: boolean;
  search: string;
  filter: string;
};

export default function TransactionTable({
  transactions,
  loading,
  search,
  filter,
}: Props) {
  const [open, setOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((item) => {
    const matchesFilter =
      filter === "All" || item.type === filter;

    const matchesSearch =
      search.trim() === "" ||
      item.type
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
        <p className="text-lg font-semibold text-gray-500">
          Loading Transactions...
        </p>
      </div>
    );
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
        <p className="text-lg font-semibold text-gray-500">
          No Transactions Found
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="p-5 text-left text-gray-700">
              Type
            </th>

            <th className="p-5 text-left text-gray-700">
              Amount
            </th>

            <th className="p-5 text-left text-gray-700">
              Date
            </th>

            <th className="p-5 text-left text-gray-700">
              Status
            </th>

            <th className="p-5 text-center text-gray-700">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredTransactions.map((item) => (

            <tr
              key={item._id}
              className="border-t transition hover:bg-gray-50"
            >

              <td className="p-5">

                <div className="flex items-center gap-3">

                  {item.type === "Deposit" && (
                    <ArrowDownCircle className="text-green-600" />
                  )}

                  {item.type === "Withdraw" && (
                    <ArrowUpCircle className="text-red-600" />
                  )}

                  {item.type === "Transfer" && (
                    <Repeat className="text-blue-600" />
                  )}

                  <span className="font-medium text-gray-800">
                    {item.type}
                  </span>

                </div>

              </td>

              <td
                className={`p-5 font-semibold ${
                  item.type === "Deposit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.type === "Deposit" ? "+" : "-"} ₹
                {item.amount.toLocaleString()}
              </td>

              <td className="p-5 text-gray-600">
                {new Date(item.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </td>

              <td className="p-5">

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Success
                </span>

              </td>

              <td className="p-5 text-center">

                <button
                  onClick={() => {
                    setSelectedTransaction(item);
                    setOpen(true);
                  }}
                  className="rounded-lg bg-blue-100 p-2 text-blue-700 transition hover:bg-blue-200"
                >
                  <FileText size={18} />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <TransactionModal
        open={open}
        onClose={() => setOpen(false)}
        transaction={selectedTransaction}
      />

    </div>
  );
}