"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { isNavItemActive } from "@/lib/nav";
import { brandVoice } from "@/config/brand";
import { mainNavItems } from "@/config/navigation";
import { Button } from "@/components/ui/Button";
import { useStrategyCall } from "@/components/layout/StrategyCallPopup";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileNavLinkClass = (active: boolean) =>
  cn(
    "block px-5 py-3 text-sm font-medium transition-colors",
    active
      ? "text-primary font-semibold bg-pale-blue/60"
      : "text-slate hover:text-ink hover:bg-surface/80"
  );

const mobileChildLinkClass = (active: boolean) =>
  cn(
    "block px-8 py-2.5 text-sm transition-colors",
    active
      ? "text-primary font-semibold bg-pale-blue/40"
      : "text-slate hover:text-ink"
  );

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { openStrategyCall } = useStrategyCall();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[calc(100vw-3rem)] bg-white z-50 lg:hidden shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border-light">
              <span className="text-lg font-heading font-bold text-ink">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate hover:text-ink hover:bg-surface transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-3">
              {mainNavItems.map((item) => {
                const parentActive = isNavItemActive(
                  pathname,
                  item.href,
                  item.children
                );

                return (
                  <div key={item.href}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={cn(
                            "flex items-center justify-between w-full",
                            mobileNavLinkClass(parentActive)
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              openDropdown === item.label && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-surface/50 py-1">
                                {item.children.map((child) => {
                                  const childActive = isNavItemActive(
                                    pathname,
                                    child.href
                                  );
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={onClose}
                                      className={mobileChildLinkClass(childActive)}
                                      aria-current={
                                        childActive ? "page" : undefined
                                      }
                                    >
                                      {child.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={mobileNavLinkClass(parentActive)}
                        aria-current={parentActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="p-5 border-t border-border-light space-y-3">
              {/* <Button
                href="/tools/seo-audit/"
                variant="emphasis"
                size="md"
                className="w-full"
                onClick={onClose}
              >
                {brandVoice.ctaAudit}
              </Button> */}
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  onClose();
                  openStrategyCall();
                }}
              >
                {brandVoice.ctaPrimary}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
