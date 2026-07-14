"use client";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

type MonthlyReport = {
  _id: {
    month: number;
  };
  deposit: number;
  withdrawal: number;
  transfer: number;
};

type Props = {
  data: MonthlyReport[];
};

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyReportChart({
  data,
}: Props) {

  const chartData = data.map((item) => ({
    month: months[item._id.month],
    Deposit: item.deposit,
    Withdraw: item.withdrawal,
    Transfer: item.transfer,
  }));

  return (

    <div className="rounded-3xl bg-white p-4 shadow-lg">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Monthly Report
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Deposit, Withdraw and Transfer Summary
        </p>

      </div>

      {chartData.length === 0 ? (

        <div className=" h-[250px] items-center justify-center rounded-2xl border border-dashed border-gray-300">

          <p className="text-gray-500">
            No Monthly Report Available
          </p>

        </div>

      ) : (

        <ResponsiveContainer
          width="50%"
          height={250}
        >

          <BarChart
            data={chartData}
            barGap={2}
            barCategoryGap="25%"
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}
          >

            <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />

            <XAxis dataKey="month" tick={{ fontSize: 22, fontWeight: 700, fill: "#111827" }}/>

            <YAxis width={45} tick={{ fontSize: 22, fontWeight: 700, fill: "#374151" }}/>

            <Tooltip cursor={{ fill: "#f8fafc" }} />

            <Legend verticalAlign="top" height={40}/>

            <Bar
              barSize={25}
              dataKey="Deposit"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              barSize={25}
              dataKey="Withdraw"
              fill="#dc2626"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              barSize={25}
              dataKey="Transfer"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      )}

    </div>

  );

}