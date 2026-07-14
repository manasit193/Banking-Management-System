"use client";

import { useEffect, useState } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardCards from "@/components/admin/DashboardCards";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentUsers from "@/components/admin/RecentUsers";

import { getDashboard } from "@/services/admin.service";

type DashboardData = {
  totalUsers: number;
  totalTransactions: number;
  totalBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalTransfers: number;

  recentUsers: {
    _id: string;
    fullName: string;
    email: string;
    accountNumber: string;
    accountType: string;
    createdAt: string;
  }[];
};

export default function AdminDashboardPage() {

  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

  const fetchDashboard = async () => {

    try {

      const response =
        await getDashboard();

      setDashboardData(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  fetchDashboard();
  }, []);

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );

  }

  if (!dashboardData) {

    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        Failed to load dashboard.
      </div>
    );

  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6">

        <AdminHeader />

        <DashboardCards
          dashboardData={dashboardData}
        />

        <DashboardStats
          dashboardData={dashboardData}
        />

        <RecentUsers
          users={dashboardData.recentUsers}
        />

      </main>

    </div>

  );

}
