"use client";
import BackButton from "@/components/dashboard/BackButton";
import { useEffect, useState } from "react";
import HistoryHeader from "@/components/history-component/HistoryHeader";
import HistoryStats from "@/components/history-component/HistoryStats";
import TransactionTable from "@/components/history-component/TransactionTable";
import Pagination from "@/components/history-component/Pagination";
import { getTransactionHistory } from "@/services/transaction.service";

export type Transaction = {
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

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await getTransactionHistory();

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }; fetchTransactions();
}, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 mt-1">
      
      <div className="mx-auto max-w-7xl space-y-2">
      
          <BackButton />
        
        <div className="absolute top-3 left-1 h-7 w-7 ">
          
        </div>
        <HistoryHeader
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          transactions={transactions}
        />

        <HistoryStats
          transactions={transactions}
        />

        <TransactionTable
          transactions={transactions}
          loading={loading}
          search={search}
          filter={filter}
        />

        <Pagination />

      </div>

    </main>
  );
}