"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { brandColors } from "@/config/colors";
import { products, type ProductItem } from "@/data/products";

const numberColors = [
  brandColors.skyBlue,
  brandColors.midMint,
  brandColors.deepMint,
  brandColors.skyBlue,
  brandColors.midMint,
  brandColors.deepMint,
];

export function ProductEcosystem() {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-surface">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-overline mb-3">Products &amp; Platforms</p>
          <h2 className="font-heading font-bold text-wordmark text-[clamp(1.75rem,4vw,2.25rem)] leading-tight">
            Our Product Ecosystem
          </h2>
          <p className="mt-4 text-lead text-slate leading-relaxed">
            Tools and platforms that support your marketing systems — from lead
            capture to reporting and optimization.
          </p>
        </div>
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10">
          {products.map((product, i) => (
            <ProductItemBlock key={product.title} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductItemBlock({
  product,
  index,
}: {
  product: ProductItem;
  index: number;
}) {
  const numberText = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="text-center"
    >
      <div className="relative h-24 sm:h-28 lg:h-32 overflow-hidden">
        <p
          className="absolute left-1/2 -translate-x-1/2 top-0 lg:top-[-0.4rem] font-heading font-extrabold leading-none tracking-[-0.03em] text-[clamp(4.9rem,12.8vw,7rem)]"
          style={{ color: numberColors[index % numberColors.length] }}
        >
          {numberText}
        </p>
        <div className="absolute inset-x-0 bottom-0 h-2 sm:h-3 lg:h-2 bg-surface" />
        <div className="absolute inset-x-6 sm:inset-x-8 bottom-1 h-px bg-border" />
      </div>

      <h3 className="mt-4 font-heading text-2xl sm:text-[1.75rem] font-semibold leading-tight text-ink">
        {product.title}
      </h3>

      <p className="mt-3 mx-auto max-w-[28ch] text-sm sm:text-[0.95rem] leading-relaxed text-slate">
        {product.description}
      </p>
    </motion.article>
  );
}
