"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type Props = {
  dashboardData: {
    totalDeposits: number;
    totalWithdrawals: number;
    totalTransfers: number;
  };
};

export default function DashboardStats({
  dashboardData,
}: Props) {

  const pieData = [
    {
      name: "Deposits",
      value: dashboardData.totalDeposits,
    },
    {
      name: "Withdrawals",
      value: dashboardData.totalWithdrawals,
    },
    {
      name: "Transfers",
      value: dashboardData.totalTransfers,
    },
  ];

  const barData = [
    {
      name: "Transactions",
      Deposits: dashboardData.totalDeposits,
      Withdrawals: dashboardData.totalWithdrawals,
      Transfers: dashboardData.totalTransfers,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

      {/* Pie Chart */}

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Transaction Distribution
        </h2>

        <div className="h-80">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                label
              >

                {pieData.map((_, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Bar Chart */}

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Transaction Analytics
        </h2>

        <div className="h-80">

          <ResponsiveContainer>

            <BarChart data={barData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Deposits"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="Withdrawals"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="Transfers"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}