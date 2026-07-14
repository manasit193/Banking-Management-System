"use client";

import { useEffect, useState } from "react";
import {Bell,CheckCheck,Trash2} from "lucide-react";
import { getNotifications, markAsRead, markAllAsRead, deleteNotification} from "@/services/notification.service";

type Notification = {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NotificationDropdown({
  open,onClose
}: Props) {

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadNotifications =
    async () => {

      const response =
        await getNotifications();

      return response.data as Notification[];

    };

  const fetchNotifications =
    async () => {

      try {

        setLoading(true);

        const data =
          await loadNotifications();

        setNotifications(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    if (!open) return;

    let cancelled = false;

    void (async () => {

      try {

        const data =
          await loadNotifications();

        if (!cancelled) {

          setNotifications(data);

        }

      } catch (error) {

        if (!cancelled) {

          console.error(error);

        }

      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    })();

    return () => {

      cancelled = true;

    };

  }, [open]);

  const handleMarkAsRead =
    async (id: string) => {

      await markAsRead(id);

      fetchNotifications();

    };

  const handleDelete =
    async (id: string) => {

      await deleteNotification(id);

      fetchNotifications();

    };

  const handleMarkAll =
    async () => {

      await markAllAsRead();

      fetchNotifications();

    };

  if (!open) return null;

  return (

    <div className="absolute right-0 top-16 z-50 w-96 rounded-2xl border bg-white shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-4">

      <h2 className="text-lg font-semibold text-green-600">
      Notifications
     </h2>

     <div className="flex items-center gap-3">

    <button
      onClick={handleMarkAll}
      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
      <CheckCheck size={16} />
      Mark All
    </button>

    <button
      onClick={onClose}
      className="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-black"
    >
      ✕
    </button>

  </div>

</div>

      {/* Body */}

      <div className="max-h-96 overflow-y-auto">

        {loading && (

          <p className="p-6 text-center text-gray-500">
            Loading...
          </p>

        )}

        {!loading &&
          notifications.length === 0 && (

            <div className="flex flex-col items-center p-8">

              <Bell
                size={45}
                className="text-gray-500"
              />

              <p className="mt-4 text-gray-700">
                No Notifications
              </p>

            </div>

          )}

        {!loading &&
          notifications.map((item) => (

            <div
              key={item._id}
              className={`border-b p-4 ${
                item.isRead
                  ? "bg-white"
                  : "bg-blue-50"
              }`}
            >

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="font-semibold text-black">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {item.message}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">

                    {new Date(
                      item.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="flex gap-2">

                  {!item.isRead && (

                    <button
                      onClick={() =>
                        handleMarkAsRead(
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