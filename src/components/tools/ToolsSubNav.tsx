"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { BarChart3, FileText, Globe, LogOut, Share2, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseAuth } from "@/lib/firebase";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const links = [
  { href: "/tools/", label: "Tools", icon: BarChart3, exact: true },
  { href: "/tools/seo-audit/", label: "Website Audit", icon: Globe },
  { href: "/tools/social-audit/", label: "Social Audit", icon: Share2 },
  { href: "/tools/reports/", label: "My Reports", icon: FileText },
  { href: "/tools/profile/", label: "Profile", icon: User },
];

export function ToolsSubNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isLogin = pathname?.startsWith("/tools/login");

  if (isLogin) return null;

  async function handleSignOut() {
    const auth = getFirebaseAuth();
    if (auth) await signOut(auth);
  }

  return (
    <div className="border-b border-border bg-white/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <Link
              href="/"
              className="font-heading font-bold text-sm text-primary shrink-0 hover:opacity-80"
            >
              {siteConfig.shortName}
            </Link>
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
              {links.map((item) => {
                const active = item.exact
                  ? pathname === item.href || pathname === "/tools"
                  : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors",
                      active
                        ? "bg-pale-blue text-primary"
                        : "text-slate hover:text-ink hover:bg-surface"
                    )}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate hover:text-ink hover:bg-surface transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            ) : (
              <Link
                href="/tools/login/"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-on-dark hover:brightness-90"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
        <nav className="flex md:hidden gap-1 pb-2 overflow-x-auto">
          {links.map((item) => {
            const active = item.exact
              ? pathname === item.href || pathname === "/tools"
              : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap",
                  active ? "bg-pale-blue text-primary" : "text-slate"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
