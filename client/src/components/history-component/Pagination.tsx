"use client";

export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-3">

      <button className="rounded-xl border px-5 py-2 hover:bg-gray-100">
        Previous
      </button>

      <button className="rounded-xl bg-blue-700 px-4 py-2 text-white">
        1
      </button>

      <button className="rounded-xl border px-4 py-2 hover:bg-gray-100">
        2
      </button>

      <button className="rounded-xl border px-4 py-2 hover:bg-gray-100">
        3
      </button>

      <button className="rounded-xl border px-5 py-2 hover:bg-gray-100">
        Next
      </button>

    </div>
  );
}