"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ArrowRightLeft,
  FileBarChart2,
  Settings,
  Shield,
} from "lucide-react";

import LogoutCard from "./LogoutCard";

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Transactions",
    href: "/admin/transactions",
    icon: ArrowRightLeft,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileBarChart2,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {

  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col bg-slate-900 text-white shadow-xl">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-3">

            <Shield size={26} />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              Nexa Bank
            </h1>

            <p className="text-sm text-slate-400">
              Admin Panel
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">

        {menus.map((menu) => {

          const Icon = menu.icon;

          const active =
            menu.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(menu.href);

          return (

            <Link
              key={menu.title}
              href={menu.href}
              className={`group relative flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >

              {active && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
              )}

              <Icon
                size={22}
                className="transition-transform group-hover:scale-110"
              />

              <span className="font-medium">
                {menu.title}
              </span>

            </Link>

          );

        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-5">

        <LogoutCard />

      </div>

    </aside>
  );
}