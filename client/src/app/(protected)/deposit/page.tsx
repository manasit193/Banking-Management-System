"use client";

import { useEffect, useState } from "react";
import DepositeForm from "@/components/depositecomponent/DepositeForm";
import { getProfile } from "@/services/auth.service";

export default function DepositPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
    
      <div className="mx-auto max-w-5xl">
        
        
        <DepositeForm user={user} />
      </div>
    </main>
  );
}