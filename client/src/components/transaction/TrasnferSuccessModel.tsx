"use client";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import {CheckCircle2,Download,Share2,Home,} from "lucide-react";
import toast from "react-hot-toast";
type TransferSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  receiverName: string;
  amount: number;
  accountNumber: string;
  referenceId: string;
};

export default function TransferSuccessModal({
  open,
  onClose,
  receiverName,
  amount,
  accountNumber,
  referenceId,
}: TransferSuccessModalProps) {

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(22);
    doc.text("Nexa Bank", 20, 20);
  
    doc.setFontSize(16);
    doc.text("Money Transfer Receipt", 20, 35);
  
    doc.setFontSize(12);
  
    doc.text(`Receiver : ${receiverName}`, 20, 55);
  
    doc.text(`Account  : ${accountNumber}`, 20, 65);
  
    doc.text(`Amount   : ${amount.toLocaleString()} INR`, 20,75);
  
    doc.text(`Reference: ${referenceId}`, 20, 85);
  
    doc.text(`Date : ${new Date().toLocaleString()}`,20, 95);
  
    doc.text("Status : Successful",20,105);
  
    doc.save(`Receipt-${referenceId}.pdf`);
  };
  
  const handleShareReceipt = async () => {
    const receipt = `
  🏦 Nexa Bank
  
  Money Transfer Receipt
  
  Receiver : ${receiverName}
  Account : ${accountNumber}
  Amount : ₹${amount.toLocaleString()}
  Reference ID : ${referenceId}
  Status : Successful
  Date : ${new Date().toLocaleString()}
  `;
  
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Nexa Bank Receipt",
          text: receipt,
        });
      } else {
        await navigator.clipboard.writeText(receipt);
        toast.success("Receipt copied to clipboard.");
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
        >

          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >

            <div className="flex justify-center">

              <CheckCircle2
                size={90}
                className="text-green-500"
              />

            </div>

            <h2 className="mt-6 text-center text-3xl font-bold text-green-500">
              Transfer Successful
            </h2>

            <p className="mt-3 text-center text-gray-500">
              Your money has been transferred successfully.
            </p>

            <div className="mt-8 rounded-2xl bg-gray-50 p-5">

            <div className="mt-3 flex justify-between text-black">
            <span>Receiver</span>

            <span className="font-semibold text-gray-500">
             {receiverName || "—"}
            </span>
             </div>

           <div className="mt-3 flex justify-between text-black">
           <span>Account</span>

           <span className="font-semibold text-gray-500">
            {accountNumber}
          </span>
           </div>

              <div className="mt-3 flex justify-between text-black">

                <span>Amount</span>

                <span className="font-semibold text-green-500">
                  ₹{amount.toLocaleString()}
                </span>

              </div>

              <div className="mt-3 flex justify-between text-black">

                <span>Reference ID</span>

                <span className="font-semibold text-gray-500">
                  {referenceId}
                </span>

              </div>

            </div>

            <div className="mt-8 space-y-3">

            <button
            onClick={handleDownloadReceipt}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 py-3 text-white transition hover:bg-blue-800">
            <Download size={20} />
            Download Receipt
            </button>

              <button 
              onClick={handleShareReceipt}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border py-3 transition hover:bg-gray-100 text-green-700">
              <Share2 size={20} />

                Share Receipt

              </button>

              <button
                onClick={onClose}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border py-3 transition hover:bg-gray-100 text-red-700" 
              >

                <Home size={20} />

                Back to Dashboard

              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}