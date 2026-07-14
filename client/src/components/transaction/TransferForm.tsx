"use client";
import { toast } from "react-hot-toast";
import ReceiverCard from "./ReceiverCard";
import AmountInput from "./AmountInput";
import TransferSummary from "./TransferSummary";
import TransferSuccessModal from "./TrasnferSuccessModel";
import { motion } from "framer-motion";
import { ArrowRightLeft ,ArrowRight, Loader2} from "lucide-react";
import { useEffect, useState } from "react";
import { getBalance } from "@/services/transaction.service";
import { transferMoney } from "@/services/transaction.service";
import PasswordVerificationModal from "@/components/common/PasswordVerification";
import { verifyPassword } from "@/services/auth.service";
import BackButton from "@/components/dashboard/BackButton";
export default function TransferForm() {
  const [open, setOpen] = useState(false);
  const [receiver, setReceiver] = useState<any>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [openVerifyModal, setOpenVerifyModal] =useState(false);
  const [loadingVerify, setLoadingVerify] =useState(false);
  const handleTransfer = async () => {

    if (!receiver) {
      toast.error("Please select a valid receiver.");
      return;
    }
  
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
  
      return;
    }
  
    try {
  
      setLoading(true);
  
      await transferMoney(
        accountNumber,
        Number(amount)
      );

      setReferenceId(
        "TXN" + Date.now().toString().slice(-10)
      );
      setOpen(true);
  
    } catch (error: any) {
  
      toast.error(
        error.response?.data?.message ||
        "Transfer Failed"
      );
  
    } finally {
  
      setLoading(false);
  
    }
  
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        setBalance(response.data?.balance ?? 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBalance();
  }, []);

  const handleVerify = async (
    password: string
  ) => {
  
    try {
  
      setLoadingVerify(true);
  
      await verifyPassword(password);
  
      setOpenVerifyModal(false);
  
      await handleTransfer();
  
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-white p-8 shadow-xl"
    >
      
      <div className="mb-8 flex items-center gap-4">
        <BackButton />
        <div className="rounded-2xl bg-blue-100 p-4 text-blue-700">

          <ArrowRightLeft size={32} />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Money Transfer
          </h1>

          <p className="mt-1 text-gray-500">
            Send money securely to another account.
          </p>

        </div>

      </div>

      <div className="space-y-8">

      <ReceiverCard
       accountNumber={accountNumber}
       setAccountNumber={setAccountNumber}
       receiver={receiver}
       setReceiver={setReceiver}/>

        <AmountInput
          amount={amount}
          setAmount={setAmount}
          note={note}
          setNote={setNote}
          balance={balance}
        />
    
        <TransferSummary
        receiver={receiver}
        amount={amount}
        currentBalance={balance}/>
        
        <motion.button
        onClick={() => setOpenVerifyModal(true)}
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-800">

        {loading ? (
         <>
         <Loader2
         size={22}
         className="animate-spin"/>
          Processing...</>
        ) : (
        <>
        Transfer Money
        <ArrowRight size={22} />
        </>)}
        </motion.button>

        <TransferSuccessModal
        open={open}
        onClose={() => setOpen(false)}
        receiverName={receiver?.fullName || ""}
        accountNumber={receiver?.accountNumber || ""}
        amount={Number(amount)}
        referenceId={referenceId}
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