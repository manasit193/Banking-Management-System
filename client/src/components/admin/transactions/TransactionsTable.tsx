"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
} from "lucide-react";

type Transaction = {
  _id: string;
  amount: number;
  type: "Deposit" | "Withdraw" | "Transfer";
  description: string;
  createdAt: string;

  sender?: {
    fullName: string;
    email: string;
    accountNumber: string;
  };

  receiver?: {
    fullName: string;
    email: string;
    accountNumber: string;
  };
};

type Props = {
  transactions: Transaction[];
  loading: boolean;
};

export default function TransactionsTable({
  transactions,
  loading,
}: Props) {

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
        Loading...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg text-red-500">
        No Transactions Found
      </div>
    );
  }

  return (

    <div className="overflow-hidden rounded-2xl bg-green-100 shadow-lg  border border-red-400">

      <table className="min-w-full">

        <thead className=" text-blue-700 font-bold">

          <tr>

            <th className="px-6 py-4 text-left">
              Sender
            </th>

            <th className="px-6 py-4 text-left">
              Receiver
            </th>

            <th className="px-6 py-4 text-center">
              Type
            </th>

            <th className="px-6 py-4 text-center">
              Amount
            </th>

            <th className="px-6 py-4 text-center">
              Description
            </th>

            <th className="px-6 py-4 text-center">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {transactions.map((transaction) => (

            <tr
              key={transaction._id}
              className="border-t hover:bg-gray-50"
            >

              {/* Sender */}

              <td className="px-6 py-4">

                <h3 className="font-small text-gray-700">

                  {transaction.sender?.fullName || "-"}

                </h3>

                <p className="text-sm text-gray-700">

                  {transaction.sender?.accountNumber || "-"}

                </p>

              </td>

              {/* Receiver */}

              <td className="px-6 py-4">

                <h3 className="font-small text-gray-700">

                  {transaction.receiver?.fullName || "-"}

                </h3>

                <p className="text-sm text-gray-700">

                  {transaction.receiver?.accountNumber || "-"}

                </p>

              </td>

              {/* Type */}

              <td className="px-6 py-4">

                <div className="flex justify-center">

                  {transaction.type === "Deposit" ? (

                    <ArrowDownCircle
                      className="text-green-600"
                    />

                  ) : transaction.type === "Withdraw" ? (

                    <ArrowUpCircle
                      className="text-red-600"
                    />

                  ) : (

                    <Repeat
                      className="text-blue-600"
                    />

                  )}

                </div>

                <p className="mt-1 text-center text-sm text-gray-700">

                  {transaction.type}

                </p>

              </td>

              {/* Amount */}

              <td className="px-6 py-4 text-center font-bold text-gray-700">

                ₹{transaction.amount.toLocaleString("en-IN")}

              </td>

              {/* Description */}

              <td className="px-6 py-4 text-center text-gray-700">

                {transaction.description || "-"}

              </td>

              {/* Date */}

              <td className="px-6 py-4 text-center text-gray-700">

                {new Date(
                  transaction.createdAt
                ).toLocaleDateString("en-IN")}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}