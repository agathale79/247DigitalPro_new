"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import {
  BLOG_CARD_GRADIENT,
  type BlogPostPreview,
} from "@/data/blog-posts";
import { cn } from "@/lib/cn";

interface BlogCardProps {
  post: BlogPostPreview;
  className?: string;
  titleClassName?: string;
  excerptClassName?: string;
}

export function BlogCard({
  post,
  className,
  titleClassName,
  excerptClassName,
}: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(post.image) && !imageError;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/resources/blog/${post.slug}`}
      className={cn(
        "group flex flex-col h-full bg-white rounded-2xl border border-border overflow-hidden hover:shadow-[0_8px_40px_rgba(30,90,152,0.12)] hover:border-primary/30 transition-all duration-300 cursor-pointer",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full h-44 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden",
          `bg-linear-to-br ${BLOG_CARD_GRADIENT}`
        )}
      >
        {showImage && (
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        )}

        <span className="absolute bottom-4 left-4 z-10 inline-block px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium text-white backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className={cn(
            "text-base sm:text-lg font-heading font-semibold text-ink leading-snug mb-2 group-hover:text-primary transition-colors",
            titleClassName
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "text-sm text-slate leading-relaxed flex-1 line-clamp-3",
            excerptClassName
          )}
        >
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-xs text-slate">
          <span>{formattedDate}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
