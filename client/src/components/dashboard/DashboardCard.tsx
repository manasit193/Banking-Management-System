"use client";

import { motion } from "framer-motion";
import { LucideIcon} from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        y: -6,
      }}
      transition={{
        duration: 0.4,
      }}
      className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-200"
    >
      {/* Top Gradient Line */}
      <div
        className={`absolute top-0 left-0 h-1 w-full ${color}`}
      />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-800">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color} text-white shadow-md`}
        >
          <Icon size={28} />
        </div>

      </div>

      
    </motion.div>
  );
}