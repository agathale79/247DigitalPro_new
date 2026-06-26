"use client";

import { Suspense, type ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToolsSubNav } from "@/components/tools/ToolsSubNav";
import "@/styles/tools-audit.css";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-surface">
        <Suspense fallback={null}>
          <ToolsSubNav />
        </Suspense>
        <main>{children}</main>
      </div>
    </AuthProvider>
  );
}
