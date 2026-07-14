"use client";

import { User, BadgeCheck } from "lucide-react";
import{useEffect} from "react";
import { verifyReceiver } from "@/services/transaction.service";

type Props = {
  accountNumber: string;
  setAccountNumber: React.Dispatch<React.SetStateAction<string>>;
  receiver: any;
  setReceiver: React.Dispatch<React.SetStateAction<any>>;
};
export default function ReceiverCard({
  accountNumber = "",
  setAccountNumber,
  receiver,
  setReceiver,
}: Props) {
  useEffect(() => {
    if (!accountNumber || accountNumber.length !== 12) {
      setReceiver(null);
      return;
    }

    const fetchReceiver = async () => {
      try {
        const response = await verifyReceiver(accountNumber);

        setReceiver(response.data);
      } catch {
        setReceiver(null);
      }
    };

    fetchReceiver();
  }, [accountNumber, setReceiver]);
  return (
    <div>

      <label className="mb-2 block font-semibold text-black">
        Receiver Account Number
      </label>

      <input
        type="text"
        value={accountNumber}
        maxLength={12}
        onChange={(e) =>
        setAccountNumber(e.target.value.replace(/\D/g, ""))}
        placeholder="Enter account number"
        className="w-full rounded-xl border border-gray-700 text-black p-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />

      
      {receiver && (
      <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">

        <div className="flex items-center gap-4">

          <div className="rounded-full bg-green-400 text-white p-4">

            <User className="text-green-700" />

          </div>

          <div>

            <h2 className="flex items-center gap-2 text-lg font-bold text-black">

              {receiver?.fullName}

              <BadgeCheck
                size={18}
                className="text-blue-600"
              />

            </h2>

            <p className="text-gray-600">
              {receiver?.accountType} Account
            </p>

          </div>

        </div>

      </div>
      )}

    </div>
  );
}