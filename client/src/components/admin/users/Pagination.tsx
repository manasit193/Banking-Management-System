"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {

  if (totalPages <= 1) return null;

  return (

    <div className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-lg">

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >

        <ChevronLeft size={18} />

        Previous

      </button>

      <div className="flex items-center gap-2">

        {Array.from(
          { length: totalPages },
          (_, index) => {

            const page = index + 1;

            return (

              <button
                key={page}
                type="button"
                onClick={() =>
                  onPageChange(page)
                }
                className={`h-10 w-10 rounded-xl font-semibold transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
              >

                {page}

              </button>

            );

          }
        )}

      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >

        Next

        <ChevronRight size={18} />

      </button>

    </div>

  );

}