"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Wallet } from "lucide-react";
import WithdrawSummary from "@/components/withdrawcomponent/WithdrawSummary";
import { withdrawMoney } from "@/services/transaction.service";
import BackButton from "@/components/dashboard/BackButton";
import PasswordVerificationModal from "@/components/common/PasswordVerification";
import { verifyPassword } from "@/services/auth.service";
type Props = {
  user:any
  };

export default function WithdrawForm({
  user,
}: Props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] =useState(false);
  const [loadingVerify, setLoadingVerify] =useState(false);
  const currentBalance = user?.balance ?? 0;

  const handleWithdraw = async () => {
    if (!amount) {
      toast.error("Please enter withdrawal amount");
      return;
    }

    if (Number(amount) < 100) {
      toast.error("Minimum withdrawal amount is ₹100");
      return;
    }

    if (Number(amount) > currentBalance) {
      toast.error("Insufficient Balance");
      return;
    }

    try {
      setLoading(true);

      const response = await withdrawMoney(
        Number(amount)
      );

      toast.success(response.message);

      setAmount("");
      setDescription("");

      window.location.reload();

    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Withdrawal Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (
    password: string
  ) => {
  
    try {
  
      setLoadingVerify(true);
  
      await verifyPassword(password);
  
      setOpenVerifyModal(false);
  
      await handleWithdraw();
  
    } catch (error: any) {
  
      toast.error(
        error.response?.data?.message ||
        "Invalid Password"
      );
  
    } finally {
  
      setLoadingVerify(false);
  
    }
  
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-white p-8 shadow-xl"
    >
      <div className="flex items-center gap-4">
        <BackButton />
      <div className="absolute top-3 left-1 h-7 w-7 ">
          
        </div>
        <div className="rounded-2xl bg-red-100 p-4 text-red-700">
          <Wallet size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Withdraw Money
          </h1>

          <p className="mt-1 text-gray-500">
            Withdraw money securely from your
            account.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        {/* Left */}

        <div>
          <label className="mb-2 block font-semibold text-black">
            Withdraw Amount
          </label>

          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-500">
              ₹
            </span>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              placeholder="Enter amount"
              className="w-full rounded-2xl border border-gray-300 py-4 pl-12 text-2xl font-semibold outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 text-gray-700"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {[500, 1000, 5000, 10000].map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setAmount(value.toString())
                  }
                  className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 font-semibold text-red-700 transition hover:bg-red-600 hover:text-white"
                >
                  ₹{value.toLocaleString()}
                </button>
              )
            )}
          </div>

          <label className="mt-8 mb-2 block font-semibold text-black">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Withdraw note..."
            className="w-full resize-none rounded-2xl border border-gray-300 p-4 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 text-gray-700"
          />

          <div className="mt-6">
            <button
              onClick={() => setOpenVerifyModal(true)}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 text-lg font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Processing...
                </>
              ) : (
                "Withdraw Money"
              )}
            </button>
          </div>
        </div>

        {/* Right */}

        <WithdrawSummary
          amount={Number(amount) || 0}
          currentBalance={currentBalance}
        />
      </div>
      <PasswordVerificationModal
      open={openVerifyModal}
      loading={loadingVerify}
       onClose={() => setOpenVerifyModal(false)}
       onVerify={handleVerify}
       />
    </motion.div>
  );
}