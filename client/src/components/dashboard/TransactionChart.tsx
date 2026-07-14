"use client";

import {AreaChart,Area,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,} from "recharts";

type Transaction = {
  amount: number;
  createdAt: string;
};

type Props = {
  transactions: Transaction[];
};

export default function TransactionChart({
  transactions,
}: Props) {

  const months = [
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

  const monthlyData = months.map((month) => ({
    month,
    amount: 0,
  }));

  transactions.forEach((item) => {

    const date = new Date(item.createdAt);

    const index = date.getMonth();

    monthlyData[index].amount += item.amount;

  });

  return (

    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Transaction Overview
        </h2>

        <p className="text-gray-500">
          Monthly Transaction Summary
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={monthlyData}>

            <defs>

              <linearGradient
                id="balance"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#2563eb"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.15)",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={4}
              fill="url(#balance)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}