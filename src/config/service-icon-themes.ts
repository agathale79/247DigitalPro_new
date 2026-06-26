import { brandColors } from "@/config/colors";

export type ServiceIconTheme = {
  bg: string;
  color: string;
};

/** Shared icon tile colors for homepage services carousel + services page */
export const serviceIconThemes: Record<string, ServiceIconTheme> = {
  palette: { bg: brandColors.primary, color: brandColors.onDark },
  globe: { bg: brandColors.background, color: brandColors.primary },
  search: { bg: brandColors.deepNavy, color: brandColors.onDark },
  megaphone: { bg: brandColors.skyBlue, color: brandColors.onDark },
  "bar-chart-3": { bg: brandColors.deepMint, color: brandColors.onDark },
  "file-text": { bg: brandColors.brandMint, color: brandColors.deepNavy },
  bot: { bg: brandColors.wordmark, color: brandColors.onDark },
  sparkles: { bg: brandColors.midMint, color: brandColors.deepNavy },
  "trending-up": { bg: brandColors.primary, color: brandColors.onDark },
};

const defaultTheme: ServiceIconTheme = {
  bg: brandColors.primary,
  color: brandColors.onDark,
};

export function getServiceIconTheme(iconKey: string): ServiceIconTheme {
  return serviceIconThemes[iconKey] ?? defaultTheme;
}

export function serviceIconNeedsBorder(bg: string): boolean {
  return bg === brandColors.background || bg === brandColors.brandMint;
}
