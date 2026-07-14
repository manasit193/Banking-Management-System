"use client";

import { BarChart3 } from "lucide-react";
import BackButton from "../transactions/BackButton";
export default function ReportsHeader() {

  return (

    <div className="rounded-3xl bg-white p-6 shadow-lg">
      
      <div className="flex items-center gap-4">
        <BackButton />
        <div className="rounded-2xl bg-blue-100 p-4">

          <BarChart3
            size={30}
            className="text-blue-700"
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            Reports

          </h1>

          <p className="mt-1 text-gray-500">

            Banking analytics and reports.

          </p>

        </div>

      </div>

    </div>

  );

}