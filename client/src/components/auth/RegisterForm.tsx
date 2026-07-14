"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RegisterStepper from "./RegisterStepper";
import PersonalInfo from "./PersonalInfo";
import AccoutDetails from "./AccoutDetails";
import SecurityDetails from "./SecurityDetails";

export default function RegisterForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    fathersName: "",
    address: "",
    accountType: "Savings",
    kycDocumentNumber: "",
    kycDocument: null as File | null,
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    fathersName: "",
    address: "",
    kycDocumentNumber: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl rounded-3xl bg-white p-10 shadow-2xl"
    >
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Create Your Nexa Bank Account
      </h1>

      <p className="mt-2 text-center text-gray-500">
        Complete the steps below to open your account.
      </p>

      <div className="mt-10">
        <RegisterStepper currentStep={step} />
      </div>

      {step === 1 && (
        <PersonalInfo formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <AccoutDetails
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        onNext={() => setStep(3)}
        onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <SecurityDetails
        formData={formData}
        errors={errors}
        setErrors={setErrors}
        setFormData={setFormData}
        onBack={() => setStep(2)}
        />
      )}
    </motion.div>
  );
}