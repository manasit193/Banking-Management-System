"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  CalendarDays,
  User,
  MapPin,
} from "lucide-react";

type Props = {
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
    fathersName: string;
    address: string;
    dateOfBirth: string;
  };
};

export default function PersonalInfo({
  user,
}: Props) {
  const items = [
    {
      icon: Mail,
      label: "Email",
      value: user.email,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: user.phoneNumber,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: CalendarDays,
      label: "Date of Birth",
      value: new Date(
        user.dateOfBirth
      ).toLocaleDateString("en-IN"),
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      icon: User,
      label: "Father's Name",
      value: user.fathersName,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: MapPin,
      label: "Address",
      value: user.address,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="rounded-3xl bg-white shadow-lg"
    >
      <div className="border-b px-6 py-5">

        <h2 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h2>

      </div>

      <div>

        {items.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="flex items-center justify-between border-b px-6 py-4 last:border-none"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`rounded-xl p-2 ${item.bg}`}
                >

                  <Icon
                    size={18}
                    className={item.color}
                  />

                </div>

                <span className="font-medium text-gray-600">
                  {item.label}
                </span>

              </div>

              <span className="max-w-sm text-right font-semibold text-gray-800">
                {item.value}
              </span>

            </div>

          );

        })}

      </div>

    </motion.div>
  );
}