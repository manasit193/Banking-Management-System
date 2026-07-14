"use client";

import { useState ,useEffect} from "react";
//import { useRouter } from "next/navigation";
import { getAdminProfile, updateAdminProfile } from "@/services/admin.service";
import SettingsHeader from "@/components/admin/settings/SettingsHeader";
import ProfileSettings from "@/components/admin/settings/ProfileSettings";
import SecuritySettings from "@/components/admin/settings/SecuritySettings";


import toast from "react-hot-toast";

export default function SettingsPage() {

  //const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  
  const fetchProfile = async () => {

    try {
  
      const response =
        await getAdminProfile();
  
      setForm({
  
        fullName:
          response.data.fullName,
  
        email:
          response.data.email,
  
        phoneNumber:
          response.data.phoneNumber,
  
      });
  
    } catch {
  
      toast.error(
        "Failed to load profile"
      );
  
    }
  
  }; 
   useEffect(() => { 
    const fetchData = async () => {
      await fetchProfile();
    };
    fetchData();
   }, []);


  const handleSave = async () => {

    try {

      setLoading(true);

      await updateAdminProfile(form);

      toast.success(
        "Profile updated successfully"
      );
      
      await fetchProfile();

    } catch {

      toast.error(
        "Update failed"
      );

    } finally {

      setLoading(false);

    }

  };

  

  return (

    <div className="space-y-6">

      <SettingsHeader />

      <ProfileSettings
        form={form}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSave}
      />

      <SecuritySettings />

      

    </div>

  );

}