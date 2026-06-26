"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/data/industries";

const CARD_GRADIENT = "from-primary/20 via-pale-blue to-deep-mint/20";

export function IndustrySolutions() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          overline="Industries"
          title="Solutions Built for Your Sector"
          subtitle="Marketing systems tailored to how your industry finds, converts, and retains customers."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((item, index) => (
            <IndustryCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function IndustryCard({
  item,
  index,
}: {
  item: (typeof industries)[number];
  index: number;
}) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(item.image) && !imageError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        href={item.href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(30,90,152,0.12)]"
      >
        <div
          className={`relative h-44 w-full overflow-hidden bg-linear-to-br sm:h-48 ${CARD_GRADIENT}`}
        >
          {showImage && (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-deep-navy/50 via-transparent to-transparent" />
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="font-heading text-lg font-semibold text-wordmark transition-colors group-hover:text-primary">
            {item.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
