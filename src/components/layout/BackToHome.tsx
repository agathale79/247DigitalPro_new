"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export function BackToHome({ className }: { className?: string }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-1.5 shrink-0 rounded-lg px-2.5 py-2 -ml-1",
        "text-sm font-medium text-slate hover:text-ink hover:bg-surface transition-colors",
        className
      )}
      aria-label="Back to home"
    >
      <ArrowLeft className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline">Home</span>
    </Link>
  );
}
