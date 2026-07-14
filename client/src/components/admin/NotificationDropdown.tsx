"use client";

import { useEffect, useState } from "react";

import {
  Bell,
  CheckCheck,
  Trash2,
} from "lucide-react";

import {
  getAdminNotifications,
  markAdminNotificationRead,
  markAllAdminNotificationsRead,
  deleteAdminNotification,
} from "@/services/admin.service";

type Notification = {
  _id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  isRead: boolean;
  createdAt: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NotificationDropdown({
  open,
  onClose,
}: Props) {

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(false);

  const fetchNotifications =
    async () => {

      try {

        setLoading(true);

        const response =
          await getAdminNotifications();

        setNotifications(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    if (open) {

      fetchNotifications();

    }

  }, [open]);

  const handleMarkRead =
    async (id: string) => {

      await markAdminNotificationRead(id);

      fetchNotifications();

    };

  const handleMarkAll =
    async () => {

      await markAllAdminNotificationsRead();

      fetchNotifications();

    };

  const handleDelete =
    async (id: string) => {

      await deleteAdminNotification(id);

      fetchNotifications();

    };

  if (!open) return null;

  return (

    <div className="absolute right-0 top-16 z-50 w-96 overflow-hidden rounded-2xl border bg-white shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-4">

        <h2 className="text-lg font-bold text-gray-800">

          Notifications

        </h2>

        <div className="flex items-center gap-3">

          <button
            onClick={handleMarkAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Mark All
          </button>

          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 hover:bg-gray-100"
          >
            ✕

          </button>

        </div>

      </div>

      {/* Body */}

      <div className="max-h-[420px] overflow-y-auto">

        {loading && (

          <div className="p-8 text-center">

            Loading...

          </div>

        )}

        {!loading &&
          notifications.length === 0 && (

            <div className="flex flex-col items-center justify-center p-10">

              <Bell
                size={45}
                className="text-gray-300"
              />

              <p className="mt-4 text-gray-500">

                No Notifications

              </p>

            </div>

          )}

        {!loading &&
          notifications.map((item) => (

            <div
              key={item._id}
              className={`border-b p-4 transition hover:bg-gray-50 ${
                item.isRead
                  ? "bg-white"
                  : "bg-blue-50"
              }`}
            >

              <div className="flex justify-between gap-3">

                <div className="flex-1">

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold text-gray-800">

                      {item.title}

                    </h3>

                    {!item.isRead && (

                      <span className="h-2 w-2 rounded-full bg-red-500" />

                    )}

                  </div>

                  <p className="mt-1 text-sm text-gray-600">

                    {item.message}

                  </p>

                  <p className="mt-2 text-xs text-gray-400">

                    {new Date(
                      item.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="flex flex-col gap-3">

                  {!item.isRead && (

                    <button
                      onClick={() =>
                        handleMarkRead(
                          item._id
                        )
                      }
                    >

                      <CheckCheck
                        size={18}
                        className="text-green-600"
                      />

                    </button>

                  )}

                  <button
                    onClick={() =>
                      handleDelete(
                        item._id
                      )
                    }
                  >

                    <Trash2
                      size={18}
                      className="text-red-600"
                    />

                  </button>

                </div>

              </div>

            </div>

          ))}

      </div>

    </div>

  );

}