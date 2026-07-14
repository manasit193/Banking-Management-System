"use client";

import {
  Mail,
  CreditCard,
  Landmark,
} from "lucide-react";

import UsersActions from "./UsersActions";

type UserType = {
  _id: string;
  fullName: string;
  email: string;
  accountNumber: string;
  accountType: string;
  isBlocked: boolean;
};

type Props = {
  users: UserType[];
  loading: boolean;
  onBlock: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function UsersTable({
  users,
  loading,
  onBlock,
  onDelete,
}: Props) {

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
        Loading users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left text-gray-700">
              User
            </th>

            <th className="px-6 py-4 text-left text-gray-700">
              Account
            </th>

            <th className="px-6 py-4 text-left text-gray-700">
              Type
            </th>

            <th className="px-6 py-4 text-center text-gray-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-gray-700">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user._id}
              className="border-t transition hover:bg-gray-50"
            >

              {/* User */}

              <td className="px-6 py-5">

                <h3 className="font-semibold text-gray-800">
                  {user.fullName}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                  <Mail size={16} />

                  {user.email}

                </div>

              </td>

              {/* Account */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-2 text-gray-700">

                  <CreditCard size={16} />

                  {user.accountNumber}

                </div>

              </td>

              {/* Account Type */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-2">

                  <Landmark
                    size={16}
                    className="text-blue-600"
                  />

                  <span className="font-medium text-gray-700">
                    {user.accountType}
                  </span>

                </div>

              </td>

              {/* Status */}

              <td className="px-6 py-5 text-center">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    user.isBlocked
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >

                  {user.isBlocked
                    ? "Blocked"
                    : "Active"}

                </span>

              </td>

              {/* Actions */}

              <td className="px-6 py-5 text-center">

                <UsersActions
                  user={user}
                  onBlock={onBlock}
                  onDelete={onDelete}
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}