"use client";

import { User, Mail, Phone } from "lucide-react";

type Props = {
  form: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export default function ProfileSettings({
  form,
  loading,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Profile Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Full Name */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Full Name
          </label>

          <div className="flex items-center rounded-xl border border-gray-500 px-4">

            <User
              size={20}
              className="text-gray-500"
            />

            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              className="w-full rounded-xl px-3 py-3 outline-none text-gray-700"
              placeholder="Enter full name"
            />

          </div>
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Email
          </label>

          <div className="flex items-center rounded-xl border border-gray-500 px-4">

            <Mail
              size={20}
              className="text-gray-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-xl px-3 py-3 outline-none text-gray-700"
              placeholder="Enter email"
            />

          </div>
        </div>

        {/* Phone */}

        <div className="md:col-span-2">

          <label className="mb-2 block font-medium text-gray-700">
            Phone Number
          </label>

          <div className="flex items-center rounded-xl border border-gray-500 px-4">

            <Phone
              size={20}
              className="text-gray-500"
            />

            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={onChange}
              className="w-full rounded-xl px-3 py-3 outline-none text-gray-700"
              placeholder="Enter phone number"
            />

          </div>

        </div>

      </div>

      <div className="mt-8">

        <button
          onClick={onSubmit}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>
  );
}