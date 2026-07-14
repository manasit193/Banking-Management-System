"use client";

type Transaction = {
  _id: string;
  type: string;
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
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
};

export default function TransactionModal({
  open,
  onClose,
  transaction,
}: Props) {
  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8">

        <h2 className="text-2xl font-bold text-green-700">
          Transaction Details
        </h2>

        <div className="mt-6 space-y-4">

          <Info
            title="Transaction ID"
            value={transaction._id}
          />

          <Info
            title="Type"
            value={transaction.type}
          />

          <Info
            title="Amount"
            value={`₹${transaction.amount.toLocaleString()}`}
          />

          <Info
            title="Sender"
            value={
              transaction.sender?.fullName || "-"
            }
          />

          <Info
            title="Receiver"
            value={
              transaction.receiver?.fullName || "-"
            }
          />

          <Info
            title="Status"
            value="Success"
          />

          <Info
            title="Date"
            value={new Date(
              transaction.createdAt
            ).toLocaleString("en-IN")}
          />

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Close
        </button>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b pb-2">

      <span className="font-semibold text-black">
        {title}
      </span>

      <span className=" text-gray-700">
        {value}
      </span>

    </div>
  );
}