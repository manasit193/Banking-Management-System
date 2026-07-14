"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  TriangleAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutCard() {

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    sessionStorage.clear();

    router.replace("/login");

  };

  return (
    <>
      

    

        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-4 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-4 transition">

              <LogOut size={24}className="text-white" />
                Logout
        </button>


      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
          >

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            >

              <div className="flex justify-center">

                <TriangleAlert
                  size={70}
                  className="text-red-500"
                />

              </div>

              <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">

                Logout

              </h2>

              <p className="mt-3 text-center text-gray-500">

                Are you sure you want to logout from your account?

              </p>

              <div className="mt-8 flex gap-4">

                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border py-3 font-semibold text-white transition hover:bg-gray-100 bg-green-500"
                >

                  Cancel

                </button>

                <button
                  onClick={handleLogout}
                  className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                >

                  Logout

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}