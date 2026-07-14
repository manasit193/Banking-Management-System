"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllTransactions } from "@/services/admin.service";

import TransactionsHeader from "@/components/admin/transactions/TransactionsHeader";
import TransactionFilters from "@/components/admin/transactions/TransactionFilters";
import TransactionsTable from "@/components/admin/transactions/TransactionsTable";
import Pagination from "@/components/admin/users/Pagination";

export type TransactionType = {
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

export default function TransactionsPage() {

  const [transactions, setTransactions] =
    useState<TransactionType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {

    const fetchTransactions = async () => {

      try {

        setLoading(true);

        const response =
          await getAllTransactions(
            page,
            10,
            search,
            type
          );

        setTransactions(response.data);

        setTotalPages(
          response.totalPages
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to load transactions"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchTransactions();

  }, [page, search, type]);

  return (
  <div className="max-w-7xl mx-auto bg-green-100">
    <div className="space-y-1">

      <TransactionsHeader />

      <TransactionFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />

      <TransactionsTable
        transactions={transactions}
        loading={loading}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

    </div>
    </div>
  );

}