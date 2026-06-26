import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Nunito_Sans } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { AppProviders } from "@/components/layout/AppProviders";
import { INTRO_PREFLIGHT_ID, introBlockScript } from "@/config/intro";
import { logoAssets } from "@/config/logo";
import { siteConfig } from "@/config/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Marketing Systems That Drive Measurable Growth`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: logoAssets.icon, sizes: "32x32", type: "image/png" },
      { url: logoAssets.icon, sizes: "192x192", type: "image/png" },
    ],
    apple: { url: logoAssets.icon, sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <div id={INTRO_PREFLIGHT_ID} suppressHydrationWarning aria-hidden />
        <Script
          id="intro-block"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: introBlockScript }}
        />
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
