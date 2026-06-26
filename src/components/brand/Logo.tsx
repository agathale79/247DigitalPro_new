"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  getLogoAsset,
  logoAssets,
  logoConfig,
  type LogoSize,
  type LogoVariant,
} from "@/config/logo";

export interface LogoProps {
  /** light = mint/white bg · dark = navy/dark bg · icon = mark only */
  variant?: LogoVariant;
  /** lockup = horizontal lockup when asset exists; icon = mark only */
  layout?: "icon" | "lockup";
  size?: LogoSize;
  href?: string | null;
  priority?: boolean;
  className?: string;
}

/**
 * Brand logo per guidelines §02 — unmodified assets, clear space, no effects.
 */
export function Logo({
  variant = "light",
  layout = "lockup",
  size = "md",
  href = "/",
  priority = false,
  className,
}: LogoProps) {
  const dimensions = logoConfig.sizes[size];
  const resolvedVariant = layout === "icon" ? "icon" : variant;
  const initialSrc = getLogoAsset(resolvedVariant, layout);
  const [src, setSrc] = useState(initialSrc);

  useEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  const isLockup = layout === "lockup" && resolvedVariant !== "icon";
  const width = isLockup ? dimensions.lockupWidth : dimensions.icon;
  const height = isLockup ? dimensions.lockupHeight : dimensions.icon;

  /** Clear space ≥ 1× icon height (scaled down in dense nav to 25% min 8px) */
  const clearSpace = Math.max(8, Math.round(dimensions.icon * 0.25));

  const image = (
    <span
      className={cn("inline-flex items-center shrink-0", className)}
      style={{ padding: clearSpace }}
    >
      <Image
        src={src}
        alt={logoConfig.alt}
        width={width}
        height={height}
        priority={priority}
        className="object-contain object-left"
        style={{
          width: isLockup ? "auto" : dimensions.icon,
          height: isLockup ? dimensions.lockupHeight : dimensions.icon,
          maxWidth: isLockup ? dimensions.lockupWidth : dimensions.icon,
        }}
        onError={() => {
          if (src !== logoAssets.icon) {
            setSrc(logoAssets.icon);
          }
        }}
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 rounded-lg">
        {image}
      </Link>
    );
  }

  return image;
}
