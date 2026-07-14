"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import BankCard from "@/components/dashboard/BankCard";
import AccountSummary from "@/components/dashboard/AccountSummary";
import ProfileWidget from "@/components/dashboard/ProfileWidget";
import Statistics from "@/components/dashboard/Statistics";
import TransactionChart from "@/components/dashboard/TransactionChart";

import { Wallet,CreditCard,Landmark,} from "lucide-react";

import { getDashboard } from "@/services/dashboard.service";

type DashboardData = {
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
    accountNumber: string;
    accountType: string;
    balance: number;
    profileImage: string;
    isVerified: boolean;
    kycStatus: string;
    createdAt: string;
  };

  stats: {
    totalTransactions: number;
    totalDeposit: number;
    totalWithdraw: number;
    totalTransfer: number;
  };

  recentTransactions: any[];
};

export default function DashboardPage() {

  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response =
          await getDashboard();

        setDashboardData(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchDashboard();

  }, []);

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <h1 className="text-2xl font-bold">
          Loading Dashboard...
        </h1>

      </div>

    );

  }

  if (!dashboardData) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <h1 className="text-2xl font-bold text-red-600">
          Failed to load dashboard.
        </h1>

      </div>

    );

  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <DashboardHeader user={dashboardData.user} />

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">

          <DashboardCard
            title="Current Balance"
            value={`₹${dashboardData.user.balance.toLocaleString()}`}
            icon={Wallet}
            color="bg-green-600"
          />

          <DashboardCard
            title="Account Number"
            value={dashboardData.user.accountNumber}
            icon={CreditCard}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Account Type"
            value={dashboardData.user.accountType}
            icon={Landmark}
            color="bg-purple-600"
          />

        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">

          <BankCard
            user={dashboardData.user}
          />

          <AccountSummary
            user={dashboardData.user}
          />

        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">

          <ProfileWidget
            user={dashboardData.user}
          />

          <Statistics
            stats={dashboardData.stats}
          />

        </div>

        <div className="mt-4">

          <TransactionChart
            transactions={
              dashboardData.recentTransactions
            }
          />

        </div>

        <div className="mt-4">

        

        </div>

      </main>

    </div>

  );

}