"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/sections/resources/BlogCard";
import { latestPosts } from "@/data/blog-posts";

export function BlogPreview() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          overline="Blog & Insights"
          title="Latest Articles"
          subtitle="Industry insights, AI trends, SEO strategies, and actionable growth guides from our team."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 40px rgba(30,90,152,0.18)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="h-full"
            >
              <BlogCard
                post={post}
                className="hover:shadow-none hover:border-border"
                titleClassName="text-base"
                excerptClassName="line-clamp-none"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            href="/resources/blog"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View All Articles
          </Button>
        </div>
      </Container>
    </section>
  );
}
