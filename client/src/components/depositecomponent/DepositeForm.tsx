"use client";
import toast from "react-hot-toast";
import { motion} from "framer-motion";
import { Landmark , Loader2, BadgeCheck,ArrowRight} from "lucide-react";
import DepositSummary from "@/components/depositecomponent/DepositSummry";
import {useState} from "react";
import { depositMoney } from "@/services/transaction.service";
import PasswordVerificationModal from "@/components/common/PasswordVerification";
import { verifyPassword } from "@/services/auth.service";
import BackButton from "@/components/dashboard/BackButton";
type Props = {
  user: any;
}
export default function DepositForm({ user}: Props) {
  const[amount,setAmount] = useState("")
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] =useState(false);
  const [loadingVerify, setLoadingVerify] =useState(false);
  const handleDeposit = async () => {

    if (!amount) {
      toast.error("Please enter deposit amount");
      return;
    }
  
    if (Number(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
   
    try {
  
      setLoading(true);
  
      const response = await depositMoney(Number(amount));
  
      toast.success(response.message);
  
      setAmount("");
      setDescription("");
  
    } catch (error: any) {
  
      toast.error(
        error.response?.data?.message ||
        "Deposit Failed"
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
  
      await handleDeposit();
  
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

        <div className="rounded-2xl bg-green-100 p-4 text-green-700">

          <Landmark size={30} />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-blue-700">
            Deposit Money
          </h1>

          <p className="text-gray-500 mt-1">
            Add money securely to your account.
          </p>

        </div>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        {/* Left */}

        <div>

          <label className="block font-semibold mb-2 text-black">
            Deposit Amount
          </label>

          <div className="relative">

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-700">
              ₹
            </span>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full rounded-2xl border border-gray-300 py-4 pl-12 text-2xl font-semibold outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 text-gray-700"
            />

          </div>

          <div className="mt-4 flex flex-wrap gap-3 mt-2">

            {[500, 1000, 5000, 10000].map((value) => (
             <button
             key={value}
             type="button"
             onClick={() => setAmount(value.toString())}
            className="rounded-xl border border-green-300 bg-green-50 px-5 py-2 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white">
               + ₹{value.toLocaleString()}
              </button>
              ))}

            </div>

          <label className="block font-semibold mt-8 mb-2 text-black">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Deposit note..."
            className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 resize-none text-gray-700"
          />

<button
    onClick={() => setOpenVerifyModal(true)}
    disabled={loading}
    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:opacity-60 mt-6 "
  >
    <BadgeCheck/>
    {loading ? (
      <>
        <Loader2
          size={22}
          className="animate-spin"
        />
        Processing...
      </>
      
    ) :
     (
    
      "Deposit Money"
      
    )}
  <ArrowRight size={20} />
  </button>

        </div>

    

        {/* Right */}

        <DepositSummary amount={Number(amount) || 0}
        currentBalance={user.balance} />

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