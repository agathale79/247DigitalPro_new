import type { LucideIcon } from "lucide-react";

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceBullet {
  title: string;
  description: string;
}

export interface ServicePanel {
  id: string;
  navLabel: string;
  title: string;
  subtitle?: string;
  body?: string;
  bullets?: ServiceBullet[];
  list?: string[];
}

export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  href: string;
  icon: LucideIcon;
  heroImage: string;
  accent: string;
  accentMuted: string;
  heroGradient: string;
  stats: ServiceStat[];
  panels: ServicePanel[];
}
