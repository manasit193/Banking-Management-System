"use client";

import { motion } from "framer-motion";
import {
  Moon,
  Languages,
  Palette,
} from "lucide-react";
import { useState } from "react";

export default function AppearanceSettings() {

  const [darkMode, setDarkMode] =
    useState(false);

  const [accentColor, setAccentColor] =
    useState("Blue");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Appearance
      </h2>

      {/* Dark Mode */}

      <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-5">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-gray-100 p-3">

            <Moon
              size={24}
              className="text-indigo-600"
            />

          </div>

          <div>

            <h3 className="font-semibold text-gray-800">
              Dark Mode
            </h3>

            <p className="text-sm text-gray-500">
              Coming Soon
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={`relative h-7 w-14 rounded-full transition ${
            darkMode
              ? "bg-indigo-600"
              : "bg-gray-300"
          }`}
        >

          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
              darkMode
                ? "left-8"
                : "left-1"
            }`}
          />

        </button>

      </div>

      {/* Language */}

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-gray-200 p-5">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-100 p-3">

            <Languages
              size={24}
              className="text-blue-700"
            />

          </div>

          <div>

            <h3 className="font-semibold text-gray-800">
              Language
            </h3>

            <p className="text-sm text-gray-500">
              Select your preferred language
            </p>

          </div>

        </div>

        <select
          className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-blue-500"
        >

          <option>English</option>

          <option>Hindi</option>

        </select>

      </div>

      {/* Accent Color */}

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-gray-200 p-5">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-purple-100 p-3">

            <Palette
              size={24}
              className="text-purple-700"
            />

          </div>

          <div>

            <h3 className="font-semibold text-gray-800">
              Accent Color
            </h3>

            <p className="text-sm text-gray-500">
              Customize your theme color
            </p>

          </div>

        </div>

        <select
          value={accentColor}
          onChange={(e) =>
            setAccentColor(e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-blue-500"
        >

          <option>Blue</option>

          <option>Green</option>

          <option>Purple</option>

        </select>

      </div>

    </motion.div>
  );
}