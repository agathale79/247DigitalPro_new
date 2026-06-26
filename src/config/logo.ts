/**
 * 02 — Logo System (Brand Guidelines v2.0)
 * @see docs/brand/247DigitalPro___Brand_Guidelines.pdf
 */

export const logoAnatomy = {
  iconBackground: "#0d1f3c",
  badge: "#1e5a98",
  wordmark: "#1a3a5f",
} as const;

/** Approved assets — add lockup PNG/SVG to public/brand/ when available */
export const logoAssets = {
  /** Icon mark — favicons, compact placements, small UI */
  icon: "/icon-247.png",
  /** Full horizontal lockup on mint or white backgrounds */
  lockupLight: "/brand/logo-lockup-light.png",
  /** Full horizontal lockup on navy or dark backgrounds */
  lockupDark: "/brand/logo-lockup-dark.png",
} as const;

export type LogoVariant = "light" | "dark" | "icon";
export type LogoSize = "sm" | "md" | "lg";

export const logoSizes: Record<
  LogoSize,
  { icon: number; lockupWidth: number; lockupHeight: number }
> = {
  sm: { icon: 32, lockupWidth: 140, lockupHeight: 36 },
  md: { icon: 48, lockupWidth: 180, lockupHeight: 44 },
  lg: { icon: 56, lockupWidth: 220, lockupHeight: 52 },
};

export const logoConfig = {
  alt: "247 Digital Pro",
  anatomy: logoAnatomy,
  assets: logoAssets,
  sizes: logoSizes,
} as const;

export function getLogoAsset(
  variant: LogoVariant,
  layout: "icon" | "lockup"
): string {
  if (layout === "icon" || variant === "icon") {
    return logoAssets.icon;
  }
  return variant === "dark" ? logoAssets.lockupDark : logoAssets.lockupLight;
}
