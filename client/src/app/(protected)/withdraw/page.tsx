"use client";

import { useEffect, useState } from "react";

import WithdrawForm from "@/components/withdrawcomponent/WithdrawForm";

import { getProfile } from "@/services/auth.service";

export default function WithdrawPage() {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <WithdrawForm user={user} />
      </div>
    </main>
  );
}