"use client";
import { useEffect, useState } from "react";
import KYCCard from "@/components/profile/KYCCard";
import ProfileWidget from "@/components/profile/ProfileWidget";
import AccountInfo from "@/components/profile/AccountInfo";
import { getProfile } from "@/services/auth.service";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const data = await getProfile();

        setUser(data.data);

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

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">
          Failed to load profile. Please try again.
        </p>
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3 mt-5">
        
         
      <div className="absolute top-2 left-11 h-7 w-7">
          
        </div>
        <ProfileWidget user={user} />

        <AccountInfo user={user} />

        <KYCCard />

      </div>

     

    </main>

  );

}