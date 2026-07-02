import { AdminShell } from "@/components/admin-shell";
import { AuthGate } from "@/components/auth-gate";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AuthGate>
      <AdminShell>{children}</AdminShell>
    </AuthGate>
  );
}
