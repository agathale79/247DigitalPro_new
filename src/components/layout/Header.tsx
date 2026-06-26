"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand";
import { logoAnatomy } from "@/config/logo";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { BackToHome } from "@/components/layout/BackToHome";
import { brandVoice } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { useStrategyCall } from "@/components/layout/StrategyCallPopup";

export function Header() {
  const { openStrategyCall } = useStrategyCall();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "top-4 mx-4 sm:mx-6 lg:mx-10 rounded-2xl bg-white/85 backdrop-blur-xl shadow-lg border border-white/50"
            : "top-0 mx-0 rounded-none bg-white border-b border-transparent"
        )}
      >
        <Container>
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-[4.25rem] py-2" : "h-[4.75rem] py-3"
          )}>
            <BackToHome />
            <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Logo
                variant="light"
                layout="icon"
                size="lg"
                href={null}
                priority
                className="!p-0"
              />
              <span
                className="font-heading font-bold text-xl sm:text-[1.375rem] hidden sm:inline"
                style={{ color: logoAnatomy.wordmark }}
              >
                Digital{" "}
                <span style={{ color: logoAnatomy.badge }}>Pro</span>
              </span>
            </Link>

            <Navbar />

            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {/* <Button href="/tools/seo-audit/" variant="emphasis" size="sm">
                {brandVoice.ctaAudit}
              </Button> */}
              <Button variant="primary" size="sm" onClick={openStrategyCall}>
                {brandVoice.ctaPrimary}
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate hover:text-ink hover:bg-surface transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
