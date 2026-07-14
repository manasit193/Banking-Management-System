"use client";

import { Search, Users } from "lucide-react";
import BackButton from "../transactions/BackButton";
type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function UsersHeader({
  search,
  setSearch,
}: Props) {
  return (
    
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <BackButton />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-blue-100 p-3">

              <Users
                size={28}
                className="text-blue-700"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                Users Management
              </h1>

              <p className="mt-1 text-gray-500">
                Search, block or delete users.
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="relative w-full lg:w-96">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by name, email or account number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
          />

        </div>

      </div>

    </div>
    
  );
}