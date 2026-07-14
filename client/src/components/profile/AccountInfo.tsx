"use client";

import { motion } from "framer-motion";
import {User,Mail,Phone,CreditCard,Landmark,Wallet,ShieldCheck,CalendarDays,} from "lucide-react";

type Props = {
  user: any;
};
export default function AccountInfo({ user }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-xl"
    >
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Account Information
        </h2>

        <p className="mt-2 text-gray-500">
          View your banking details and account information.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <InfoCard
          icon={<User size={22} />}
          title="Full Name"
          value={user?.fullName ||"-"}
        />

        <InfoCard
          icon={<Mail size={22} />}
          title="Email"
          value={user?.email ||"-"}
        />

        <InfoCard
          icon={<Phone size={22} />}
          title="Phone Number"
          value={user?.phoneNumber? `+91 ${user?.phoneNumber}` : "-"}
        />

        <InfoCard
          icon={<CreditCard size={22} />}
          title="Account Number"
          value={user?.accountNumber || "-"}
        />

        <InfoCard
          icon={<Landmark size={22} />}
          title="Account Type"
          value={user?.accountType || "-"}
        />

        <InfoCard
          icon={<Wallet size={22} />}
          title="Current Balance"
          value={`₹${user?.balance || "-"}`}
        />

        <InfoCard
          icon={<ShieldCheck size={22} />}
          title="KYC Status"
          value={user?.isVerified ? "Verified" : "Not Verified"}
          badge
        />

        <InfoCard
          icon={<CalendarDays size={22} />}
          title="Member Since"
          value={
            user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )
              : "-"
          }
        />

      </div>
    </motion.div>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  badge?: boolean;
};

function InfoCard({
  icon,
  title,
  value,
  badge = false,
}: InfoCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5"
    >
      <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
        {icon}
      </div>

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        {badge ? (
          <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {value}
          </span>
        ) : (
          <h3 className="mt-1 text-lg font-semibold text-gray-800">
            {value}
          </h3>
        )}

      </div>

    </motion.div>
  );
}