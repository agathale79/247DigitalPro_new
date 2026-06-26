"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { siteConfig } from "@/config/site";
import { trustMetrics } from "@/data/metrics";

const techLogos = [
  // Left column — Digital Marketing
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg", alt: "Meta", top: "8%", left: "4%", size: 80, delay: 0 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg", alt: "LinkedIn", top: "28%", left: "9%", size: 76, delay: 0.6 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg", alt: "Google Ads", top: "50%", left: "3%", size: 72, delay: 1.4 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg", alt: "X / Twitter", top: "70%", left: "8%", size: 74, delay: 0.3 },

  // Right column — Web Development
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React", top: "6%", right: "5%", size: 78, delay: 0.5 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", alt: "Next.js", top: "25%", right: "3%", size: 76, delay: 1.0 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg", alt: "Angular", top: "45%", right: "7%", size: 80, delay: 0.2 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", alt: "Firebase", top: "64%", right: "4%", size: 74, delay: 1.6 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", alt: "MongoDB", top: "83%", right: "6%", size: 76, delay: 0.9 },

  // Inner-left
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS", top: "17%", left: "17%", size: 70, delay: 1.2 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", alt: "MySQL", top: "58%", left: "15%", size: 74, delay: 0.7 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", alt: "Node.js", top: "82%", left: "18%", size: 70, delay: 1.5 },

  // Inner-right
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript", top: "15%", right: "16%", size: 68, delay: 1.1 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS", top: "52%", right: "17%", size: 76, delay: 0.4 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", alt: "Figma", top: "78%", right: "15%", size: 68, delay: 1.7 },

  // Center edges
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python", top: "2%", left: "40%", size: 68, delay: 0.8 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", alt: "Docker", top: "92%", right: "38%", size: 72, delay: 1.3 },
];

export function TrustMetricsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {techLogos.map((logo, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4 + (i % 5) * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: logo.delay,
          }}
          className="absolute hidden md:flex items-center justify-center rounded-full shadow-md"
          style={{
            top: logo.top,
            left: logo.left,
            right: logo.right,
            width: logo.size,
            height: logo.size,
            backgroundColor: "#ffffff",
            border: "1px solid var(--border)",
          }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.size * 0.6}
            height={logo.size * 0.6}
            className="object-contain"
            unoptimized
          />
        </motion.div>
      ))}

      <Container className="relative z-10">
        <div className="text-center">
          <p className="text-overline mb-3">Trusted Worldwide</p>
          <h2 className="font-heading font-bold text-wordmark text-[clamp(1.75rem,4vw,2.5rem)] mb-10 md:mb-14">
            {siteConfig.experienceYears} years driving measurable growth
          </h2>

          <div className="grid grid-cols-2 gap-8 md:gap-10 max-w-2xl mx-auto">
            {trustMetrics.map((metric) => (
              <div key={metric.label} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink leading-none tracking-tight font-mono font-medium">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                  />
                </span>
                <span className="mt-2 text-sm md:text-base text-slate font-heading font-semibold">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
