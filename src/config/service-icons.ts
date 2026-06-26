import {
  BarChart3,
  Bot,
  FileText,
  Globe,
  Megaphone,
  Palette,
  Search,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/** Shared Lucide icons for services (homepage carousel + services page) */
export const serviceIconMap: Record<string, LucideIcon> = {
  palette: Palette,
  globe: Globe,
  search: Search,
  megaphone: Megaphone,
  "bar-chart-3": BarChart3,
  "file-text": FileText,
  bot: Bot,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
};
