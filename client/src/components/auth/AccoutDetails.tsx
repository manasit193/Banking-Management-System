"use client";

import { Upload } from "lucide-react";
import { validatePAN } from "@/utils/validation";

type Props = {
  formData: {
    accountType: string;
    kycDocumentNumber: string;
    kycDocument: File | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<any>
  >;
  errors: {
    kycDocumentNumber: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
  onBack: () => void;
};

export default function AccountDetails({
  formData,
  setFormData,
  errors,
  setErrors,
  onNext,
  onBack,
}: Props) {
  const handleNext = () => {
    const kycError = validatePAN(formData.kycDocumentNumber)
      ? ""
      : "Please enter a valid PAN (e.g. ABCDE1234F).";

    setErrors((prev: any) => ({
      ...prev,
      kycDocumentNumber: kycError,
    }));

    if (!kycError) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <label className="mb-2 block font-medium text-black">
          Account Type
        </label>

        <select 
        value={formData.accountType}
        onChange={(e) =>
          setFormData((prev: any) => ({
            ...prev,
            accountType: e.target.value,
          }))
        }
        className="w-full rounded-xl border p-3 outline-none focus:border-blue-600 text-gray-700">

          <option value="Savings">Savings</option>

          <option value="Current">Current</option>

        </select>

      </div>

      <div>

        <label className="mb-2 block font-medium text-black">
          KYC Document Number
        </label>

        <input
          value={formData.kycDocumentNumber}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();

            setFormData((prev: any) => ({
              ...prev,
              kycDocumentNumber: value,
            }));

            setErrors((prev: any) => ({
              ...prev,
              kycDocumentNumber: validatePAN(value)
                ? ""
                : "Please enter a valid PAN (e.g. ABCDE1234F).",
            }));
          }}
          placeholder="Enter document number"
          className="w-full rounded-xl border p-3 outline-none focus:border-blue-600 text-gray-700"
        />

        {errors.kycDocumentNumber && (
          <p className="mt-1 text-sm text-red-500">
            {errors.kycDocumentNumber}
          </p>
        )}

      </div>

      <div>

        <label className="mb-3 block font-medium text-black">
          Profile Image
        </label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 p-8 hover:bg-blue-50">

          <Upload
            size={40}
            className="text-blue-600"
          />

          <p className="mt-3 font-medium text-green-500">
            Click to upload
          </p>

          <p className="text-sm text-gray-500 text-black-300">
            JPG, PNG
          </p>

          <input
           type="file"
           accept="image/png,image/jpeg,image/jpg"
           className="hidden"
           onChange={(e) => {

           const file = e.target.files?.[0];

           if (!file) return;

           setFormData((prev: any) => ({
           ...prev,
           kycDocument: file,}));
        }}
      />
     {formData.kycDocument && (

     <p className="mt-3 text-sm font-medium text-green-600">

     ✓ {formData.kycDocument.name}

     </p>)}
        </label>

      </div>

      <div className="flex justify-between text-red-500">

        <button
          onClick={onBack}
          className="rounded-xl border px-8 py-3"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          className="rounded-xl bg-blue-700 px-8 py-3 text-white"
        >
          Next →
        </button>

      </div>

    </div>
  );
}