/**
 * §03 Color System — canonical hex values (also in globals.css :root)
 */
export const brandColors = {
  deepNavy: "#0d1f3c",
  primary: "#1e5a98",
  wordmark: "#1a3a5f",
  brandMint: "#d1f5ee",
  skyBlue: "#2d6ab5",
  paleBlue: "#d6e8f8",
  midMint: "#7dd4c0",
  deepMint: "#1a9e80",
  ink: "#0f1e30",
  slate: "#4e6580",
  cloud: "#dce6f0",
  surface: "#f3f7fc",
  background: "#ffffff",
  onDark: "#ffffff",
} as const;

export const brandGradients = {
  hero: "var(--gradient-hero)",
  story: "var(--gradient-story)",
  servicesPage: "var(--gradient-services-page)",
  serviceHero: "var(--gradient-service-hero)",
  serviceHeroMint: "var(--gradient-service-hero-mint)",
} as const;
