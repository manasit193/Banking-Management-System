"use client";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { BadgeCheck, Camera, Mail , Loader2} from "lucide-react";
import { uploadProfileImage } from "@/services/profile.service";
import { useState, useRef } from "react";
import BackButton from "@/components/dashboard/BackButton";

type Props = {
  user: any;
};
export default function ProfileWidget({user }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
  
    if (!file) return;
  
    try {
      setUploading(true);
  
      await uploadProfileImage(file);
  
      toast.success("Profile Image Updated");
  
      window.location.reload();
  
    } catch (error: any) {
  
      toast.error(
        error.response?.data?.message ||
        "Upload Failed"
      );
  
    } finally {
  
      setUploading(false);
  
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl bg-white shadow-xl"
    >
      <BackButton />
      <div className="relative h-40 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">
        
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">

          <div className="relative">

            <img
              src={
                user?.profileImage
                  ? user.profileImage
                  : "https://i.pravatar.cc/200?img=12"
              }
              alt="Profile"
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
            />
            
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}/>
            
           <button
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-1 right-1 rounded-full bg-blue-600 p-2 text-white shadow-lg hover:bg-blue-700">

              {uploading ? (
              <Loader2
              size={16}
              className="animate-spin"/>) : (
              <Camera size={16} />)}

           </button>

          </div>

        </div>

      </div>

      {/* Profile Details */}
      <div className="pt-20 pb-8 px-6 text-center">

        <div className="flex items-center justify-center gap-2">

          <h2 className="text-2xl font-bold text-gray-800">
            {user?.fullName}
          </h2>
          {user?.isAdmin && (
            <BadgeCheck
              size={22}
              className="text-blue-600"
            />
          )}

        </div>

        <p className="mt-2 text-gray-500">
          {user?.accountType} Account
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-gray-600">

          <Mail size={18} />

          <span>{user.email}</span>

        </div>


      </div>
    </motion.div>
  );
}