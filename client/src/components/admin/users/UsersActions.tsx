"use client";
import { useRouter } from "next/navigation";
import {
  Ban,
  CheckCircle2,
  Trash2,
  FileText,
} from "lucide-react";

type UserType = {
  _id: string;
  isBlocked: boolean;
};

type Props = {
  user: UserType;
  onBlock: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function UserActions({
  user,
  onBlock,
  onDelete,
}: Props) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-2">

      {/* View (Future) */}

      <button
        type="button"
        title="View User"
        onClick={() => router.push(`/admin/users/${user._id}`)}
        className="rounded-xl bg-blue-100 p-2 transition hover:bg-blue-200"
      >
        <FileText
          size={18}
          className="text-blue-700"
        />
      </button>

      {/* Block / Unblock */}

      <button
        type="button"
        title={
          user.isBlocked
            ? "Unblock User"
            : "Block User"
        }
        onClick={() => onBlock(user._id)}
        className={`rounded-xl p-2 transition ${
          user.isBlocked
            ? "bg-green-100 hover:bg-green-200"
            : "bg-yellow-100 hover:bg-yellow-200"
        }`}
      >
        {user.isBlocked ? (
          <CheckCircle2
            size={18}
            className="text-green-700"
          />
        ) : (
          <Ban
            size={18}
            className="text-yellow-700"
          />
        )}
      </button>

      {/* Delete */}

      <button
        type="button"
        title="Delete User"
        onClick={() => onDelete(user._id)}
        className="rounded-xl bg-red-100 p-2 transition hover:bg-red-200"
      >
        <Trash2
          size={18}
          className="text-red-700"
        />
      </button>

    </div>
  );
}