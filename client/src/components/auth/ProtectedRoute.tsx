"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getStoredToken } from "@/lib/auth";

function subscribe() {
  return () => {};
}

function getToken() {
  return getStoredToken();
}

function getServerToken() {
  return undefined;
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useSyncExternalStore(subscribe, getToken, getServerToken);

  useEffect(() => {
    if (token === null) {
      const redirect =
        pathname && pathname !== "/login"
          ? `?redirect=${encodeURIComponent(pathname)}`
          : "";

      router.replace(`/login${redirect}`);
    }
  }, [token, router, pathname]);

  if (token === undefined || token === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
