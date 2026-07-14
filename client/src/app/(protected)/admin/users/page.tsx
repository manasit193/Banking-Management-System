"use client";

import { useEffect, useState } from "react";
import {
  getAllUsers,
  blockUser,
  deleteUser,
} from "@/services/admin.service";

import UsersHeader from "@/components/admin/users/UsersHeader";
import UsersTable from "@/components/admin/users/UsersTable";
import Pagination from "@/components/admin/users/Pagination";
import ConfirmationModal from "@/components/admin/users/ConfiramationModel";

import toast from "react-hot-toast";

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  accountNumber: string;
  accountType: string;
  isBlocked: boolean;
};

export default function UsersPage() {

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Delete Modal
  const [selectedUserId, setSelectedUserId] =
    useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const response = await getAllUsers(
        page,
        10,
        search
      );

      setUsers(response.data);

      setTotalPages(response.totalPages);

    } catch {

      toast.error("Failed to load users");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, [page, search]);

  const handleBlock = async (
    id: string
  ) => {

    try {

      await blockUser(id);

      toast.success("User status updated");

      fetchUsers();

    } catch {

      toast.error("Unable to update user");

    }

  };

  // Open Delete Modal
  const handleDeleteClick = (
    id: string
  ) => {

    setSelectedUserId(id);

    setDeleteModalOpen(true);

  };

  // Confirm Delete
  const confirmDelete = async () => {

    if (!selectedUserId) return;

    try {

      setDeleteLoading(true);

      await deleteUser(selectedUserId);

      toast.success(
        "User deleted successfully"
      );

      setDeleteModalOpen(false);

      setSelectedUserId(null);

      fetchUsers();

    } catch {

      toast.error("Delete failed");

    } finally {

      setDeleteLoading(false);

    }

  };

  return (
  <div className="bg-green-100">
    <div className="space-y-4 max-w-7xl mx-auto mt-4 ">

      <UsersHeader
        search={search}
        setSearch={setSearch}
      />

      <UsersTable
        users={users}
        loading={loading}
        onBlock={handleBlock}
        onDelete={handleDeleteClick}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ConfirmationModal
        open={deleteModalOpen}
        loading={deleteLoading}
        title="Delete User"
        message="Are you sure you want to permanently delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedUserId(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>

  </div>
  );

}