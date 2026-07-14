"use client";

import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateAge,
  validateAddress,
} from "@/utils/validation";

type Props = {
  formData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    fathersName: string;
    address: string;
  };

  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
};

export default function PersonalInfo({
  formData,
  setFormData,
  errors,
  setErrors,
  onNext,
}: Props) {
  const handleNext = () => {
    const newErrors = {
      fullName: validateName(formData.fullName)
        ? ""
        : "Full name must be at least 3 characters.",

      email: validateEmail(formData.email)
        ? ""
        : "Please enter a valid email.",

      phoneNumber: validatePhone(formData.phoneNumber)
        ? ""
        : "Phone number must be exactly 10 digits.",

      dateOfBirth: validateAge(formData.dateOfBirth)
        ? ""
        : "Age must be at least 18 years.",

      fathersName: validateName(formData.fathersName)
        ? ""
        : "Father's name is required.",

      address: validateAddress(formData.address)
        ? ""
        : "Address must be at least 10 characters.",
    };

    setErrors((prev: any) => ({
      ...prev,
      ...newErrors,
    }));

    const hasError = Object.values(newErrors).some((error) => error !== "");

    if (!hasError) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 text-black">
        <Input
          label="Full Name"
          placeholder="Enter full name"
          icon={<User size={20} />}
          value={formData.fullName}
          error={errors.fullName}
          success={!errors.fullName && formData.fullName.length > 0}
          onChange={(value) => {
            setFormData((prev: any) => ({
              ...prev,
              fullName: value,
            }));

            setErrors((prev: any) => ({
              ...prev,
              fullName: validateName(value)
                ? ""
                : "Full name must be at least 3 characters.",
            }));
          }}
        />

        <Input
          label="Email"
          placeholder="Enter email"
          icon={<Mail size={20} />}
          value={formData.email}
          error={errors.email}
          success={!errors.email && formData.email.length > 0}
          onChange={(value) => {
            setFormData((prev: any) => ({
              ...prev,
              email: value,
            }));

            setErrors((prev: any) => ({
              ...prev,
              email: validateEmail(value)
                ? ""
                : "Please enter a valid email.",
            }));
          }}
        />

        <Input
          label="Phone Number"
          placeholder="9876543210"
          icon={<Phone size={20} />}
          value={formData.phoneNumber}
          error={errors.phoneNumber}
          success={!errors.phoneNumber && formData.phoneNumber.length === 10}
          onChange={(value) => {
            const phone = value.replace(/\D/g, "").slice(0, 10);

            setFormData((prev: any) => ({
              ...prev,
              phoneNumber: phone,
            }));

            setErrors((prev: any) => ({
              ...prev,
              phoneNumber: validatePhone(phone)
                ? ""
                : "Phone number must be exactly 10 digits.",
            }));
          }}
        />

        <Input
          label="Date of Birth"
          type="date"
          icon={<Calendar size={20} />}
          value={formData.dateOfBirth}
          error={errors.dateOfBirth}
          success={!errors.dateOfBirth && formData.dateOfBirth.length > 0}
          onChange={(value) => {
            setFormData((prev: any) => ({
              ...prev,
              dateOfBirth: value,
            }));

            setErrors((prev: any) => ({
              ...prev,
              dateOfBirth: validateAge(value)
                ? ""
                : "Age must be at least 18 years.",
            }));
          }}
        />
      </div>
      <div className="text-black">
        <Input
          label="Father's Name"
          placeholder="Enter father's name"
          icon={<User size={20} />}
          value={formData.fathersName}
          error={errors.fathersName}
          success={!errors.fathersName && formData.fathersName.length > 0}
          onChange={(value) => {
            setFormData((prev: any) => ({
              ...prev,
              fathersName: value,
            }));

            setErrors((prev: any) => ({
              ...prev,
              fathersName: validateName(value)
                ? ""
                : "Father's name is required.",
            }));
          }}
        />
      </div>
      <div>
        <label className="mb-2 flex items-center gap-2 font-medium text-black">
          <MapPin size={18} />
          Address
        </label>

        <textarea
          rows={4}
          value={formData.address}
          onChange={(e) => {
            const value = e.target.value;

            setFormData((prev: any) => ({
              ...prev,
              address: value,
            }));

            setErrors((prev: any) => ({
              ...prev,
              address: validateAddress(value)
                ? ""
                : "Address must be at least 10 characters.",
            }));
          }}
          className={`w-full rounded-xl text-black border p-4 outline-none resize-none ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter address"
        />

        {errors.address ? (
          <p className="mt-1 text-sm text-red-500">{errors.address}</p>
        ) : (
          formData.address && (
            <p className="mt-1 text-sm text-green-600">✓ Looks Good</p>
          )
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

type InputProps = {
  label: string;
  placeholder?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  error: string;
  success: boolean;
  type?: string;
};

function Input({
  label,
  placeholder,
  icon,
  value,
  onChange,
  error,
  success,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-gray-700">{label}</label>

      <div className="relative">
        <div className="absolute left-4 top-3.5 text-gray-400">{icon}</div>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl  border py-3 pl-12 pr-4 outline-none ${
            error
              ? "border-red-500"
              : success
                ? "border-green-500"
                : "border-gray-300"
          }`}
        />
      </div>

      {error ? (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      ) : (
        success && (
          <p className="mt-1 text-sm text-green-600">✓ Looks Good</p>
        )
      )}
    </div>
  );
}
