"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getReports } from "@/services/admin.service";

import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import ReportsCards from "@/components/admin/reports/ReportCards";
import MonthlyReportChart from "@/components/admin/reports/MonthlyReportChart";
import ExportButtons from "@/components/admin/reports/ExportButtons";

export type ReportType = {

  totalDeposits: number;

  totalWithdrawals: number;

  totalTransfers: number;

  totalTransactions: number;

  monthlyReport: any[];

};

export default function ReportsPage() {

  const [reports, setReports] =useState<ReportType | null>(null);
  const [loading, setLoading] =useState(true);
  useEffect(() => {
  const fetchReports = async () => {

    try {

      setLoading(true);

      const response = await getReports();
      console.log(response.data);
      setReports(response.data);

    } catch {

      toast.error(
        "Failed to load reports"
      );

    } finally {

      setLoading(false);

    }

  };

    fetchReports();

  }, []);

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        Loading...

      </div>

    );

  }

  if (!reports) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        No Report Found

      </div>

    );

  }

  return (

    <div className="space-y-2">

      <ReportsHeader />

      <ReportsCards reports={reports}/>

      <MonthlyReportChart data={reports.monthlyReport}/>

      <ExportButtons />

    </div>

  );

}