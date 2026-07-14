"use client";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.service";
import toast from "react-hot-toast";
type Props = {
  formData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    fathersName: string;
    address: string;
    accountType: string;
    kycDocumentNumber: string;
    password: string;
    kycDocument: File | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      phoneNumber: string;
      dateOfBirth: string;
      fathersName: string;
      address: string;
      accountType: string;
      kycDocumentNumber: string;
      password: string;
      kycDocument: File | null;
    }>
  >;
  errors: {
    password: string;
    confirmPassword: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  onBack: () => void;
};

export default function SecurityDetails({
  formData,
  setFormData,
  errors,
  setErrors,
  onBack,
}: Props)
{
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
  useState(false);
  

  const handleRegister = async () => {
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.kycDocument) {

      toast.error(
        "Please upload your KYC document."
      );
    
      return;
    
    }
  
    try {
      setLoading(true);
  
      await register(formData);
  
      toast.success("Account Created Successfully ✅");
  
      router.push("/login");
  
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-gray-700">

      <Input
        label="Password"
        placeholder="Enter password"
        value={formData.password}
        onChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            password: value,
          }))
        }
      />

      <Input
        label="Confirm Password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      
      />

      <label className="flex items-center gap-3">

        <input type="checkbox" />

        I agree to the Terms & Conditions

      </label>

      <div className="flex justify-between">

        <button
          onClick={onBack}
          className="rounded-xl border px-8 py-3 text-red-500"
        >
          ← Back
        </button>

        <button
         onClick={handleRegister}
          disabled={loading}
          className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60">
          {loading ? (
          <>
          <Loader2
          size={18}
          className="inline mr-2 animate-spin"/>
          Creating...
          </>
         ) : ( 
        "Create Account")}
      </button>

      </div>

    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block font-medium">
        {label}
      </label>

      <div className="relative">

        <Lock className="absolute left-4 top-3.5 text-gray-400" />

        <input
          type="password"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-blue-600"
        />

      </div>

    </div>
  );
}