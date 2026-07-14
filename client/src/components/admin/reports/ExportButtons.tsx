"use client";

import {FileSpreadsheet,FileText,} from "lucide-react";
import{saveAs} from "file-saver";
import toast from "react-hot-toast";
import { exportPdfReport, exportExcelReport } from "@/services/admin.service";
export default function ExportButtons() {

const handlePdf = async () => {

  try {

    const blob =
      await exportPdfReport();

    saveAs(
      blob,
      "Nexa-Bank-Report.pdf"
    );

    toast.success(
      "PDF Downloaded"
    );

  } catch {

    toast.error(
      "Failed to export PDF"
    );

  }

};

const handleExcel = async () => {

    try {
  
      const blob =
        await exportExcelReport();
  
      saveAs(
        blob,
        "Nexa-Bank-Report.xlsx"
      );
  
      toast.success(
        "Excel Downloaded"
      );
  
    } catch {
  
      toast.error(
        "Failed to export Excel"
      );
  
    }
  
  };

  return (

    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-gray-800">

        Export Reports

      </h2>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={handlePdf}
          className="flex items-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >

          <FileText size={20} />

          Export PDF

        </button>

        <button
          onClick={handleExcel}
          
          className="flex items-center gap-3 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >

          <FileSpreadsheet size={20} />

          Export Excel

        </button>

      </div>

    </div>

  );

}