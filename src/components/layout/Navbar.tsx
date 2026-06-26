"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { isNavItemActive } from "@/lib/nav";
import { mainNavItems } from "@/config/navigation";
import type { NavItem } from "@/types/navigation";

const navLinkBase =
  "px-3 py-2 text-sm font-medium rounded-lg transition-colors";

function navLinkClass(active: boolean) {
  return cn(
    navLinkBase,
    active
      ? "text-primary font-semibold bg-pale-blue/70"
      : "text-slate hover:text-ink hover:bg-surface/80"
  );
}

function dropdownChildClass(active: boolean) {
  return cn(
    "block px-4 py-2.5 text-sm transition-colors",
    active
      ? "text-primary font-semibold bg-pale-blue/50"
      : "text-slate hover:text-ink hover:bg-surface"
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {mainNavItems.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} />
      ))}
    </nav>
  );
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isNavItemActive(pathname, item.href, item.children);

  if (!item.children) {
    return (
      <Link href={item.href} className={navLinkClass(active)} aria-current={active ? "page" : undefined}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button
        type="button"
        className={cn("flex items-center gap-1", navLinkClass(active))}
        aria-current={active ? "page" : undefined}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
        <div className="bg-white rounded-xl shadow-lg border border-border-light py-2 min-w-[220px]">
          {item.children.map((child) => {
            const childActive = isNavItemActive(pathname, child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                className={dropdownChildClass(childActive)}
                aria-current={childActive ? "page" : undefined}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
