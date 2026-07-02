"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function AuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (!token) {
      router.replace("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}
