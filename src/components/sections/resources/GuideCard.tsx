"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import {
  GUIDE_CARD_GRADIENT,
  type GuidePreview,
} from "@/data/guides";
import { cn } from "@/lib/cn";

interface GuideCardProps {
  guide: GuidePreview;
  className?: string;
  onOpen: () => void;
}

export function GuideCard({ guide, className, onOpen }: GuideCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(guide.image) && !imageError;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex flex-col h-full w-full text-left bg-white rounded-2xl border border-border overflow-hidden hover:shadow-[0_8px_40px_rgba(30,90,152,0.12)] hover:border-primary/30 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full h-44 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden",
          `bg-linear-to-br ${GUIDE_CARD_GRADIENT}`
        )}
      >
        {showImage && (
          <Image
            src={guide.image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        )}

        <span className="absolute bottom-4 left-4 z-10 inline-block px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium text-white backdrop-blur-sm">
          {guide.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-heading font-semibold text-ink leading-snug mb-2 group-hover:text-primary transition-colors">
          {guide.title}
        </h3>
        <p className="text-sm text-slate leading-relaxed flex-1 line-clamp-3">
          {guide.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-xs text-slate">
          <span>{guide.difficulty}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {guide.readTime}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{guide.stepItems.length} steps</span>
        </div>
      </div>
    </button>
  );
}
