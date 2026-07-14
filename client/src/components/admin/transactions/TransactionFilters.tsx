"use client";

import { Search } from "lucide-react";

type Props = {

  search: string;

  setSearch: (
    value: string
  ) => void;

  type: string;

  setType: (
    value: string
  ) => void;

};

export default function TransactionFilters({

  search,

  setSearch,

  type,

  setType,

}: Props) {

  return (

    <div className="rounded-2xl bg-green-100 p-6 shadow-lg border border-red-400">

      <div className="grid gap-5 md:grid-cols-2">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-700"
          />

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-blue-600 text-gray-700"
          />

        </div>

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3 outline-none focus:border-blue-600 text-gray-700"
        >

          <option value="">

            All Transactions

          </option>

          <option value="Deposit">

            Deposit

          </option>

          <option value="Withdraw">

            Withdrawal

          </option>

          <option value="Transfer">

            Transfer

          </option>

        </select>

      </div>

    </div>

  );

}