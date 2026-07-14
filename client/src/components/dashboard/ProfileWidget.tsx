"use client";

import { Mail, Phone, BadgeCheck } from "lucide-react";

type Props = {
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
    accountType: string;
    profileImage: string;
    isVerified: boolean;
  };
};

export default function ProfileWidget({
  user,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="flex flex-col items-center">

        <img
          src={
            user.profileImage ||
            "https://i.pravatar.cc/150?img=12"
          }
          alt="Profile"
          className="h-24 w-24 rounded-full border-4 border-blue-600 object-cover"
        />

        <div className="mt-4 flex items-center gap-2">

          <h2 className="text-2xl font-bold text-black">
            {user.fullName}
          </h2>

          {user.isVerified && (
            <BadgeCheck
              size={22}
              className="text-blue-600"
            />
          )}

        </div>

        <p className="font-semibold text-gray-500">
          {user.accountType} Account
        </p>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <Mail
            className="text-blue-600"
            size={20}
          />

          <span className="text-black">
            {user.email}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Phone
            className="text-blue-600"
            size={20}
          />

          <span className="text-black">
            {user.phoneNumber}
          </span>

        </div>

      </div>

    </div>
  );
}