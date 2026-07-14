"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getUserById } from "@/services/admin.service";

import UserProfileCard from "@/components/admin/user-details/UserProfileCard";
import PersonalInfo from "@/components/admin/user-details/PersonalInfo";
import AccountInfo from "@/components/admin/user-details/AccountInfo";
import KycCard from "@/components/admin/user-details/KycCard";
import ActionButtons from "@/components/admin/user-details/ActionButtons";

import toast from "react-hot-toast";

export type UserDetails = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  fathersName: string;
  address: string;
  dateOfBirth: string;

  accountNumber: string;
  accountType: string;
  balance: number;

  kycDocumentNumber: string;
  kycStatus: string;
  profileImage?: string;
  kycDocument?: string;

  createdAt: string;
};

export default function UserDetailsPage() {

  const { id } = useParams();

  const [user, setUser] =
    useState<UserDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const fetchUser = async () => {

    try {

      setLoading(true);

      const response = await getUserById(
        id as string
      );

      setUser(response.data);

    } catch {

      toast.error(
        "Failed to load user details"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (id) {

      fetchUser();

    }

  }, [id]);

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        Loading...

      </div>

    );

  }

  if (!user) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        User not found

      </div>

    );

  }

  return (

    <div className="space-y-6 p-8 bg-gray-100 min-h-screen">

      <UserProfileCard
        user={user}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <PersonalInfo
          user={user}
        />

        <AccountInfo
          user={user}
        />

      </div>

      <KycCard
        user={user}
      />

      <ActionButtons
        user={user}
        refresh={fetchUser}
      />

    </div>

  );

}