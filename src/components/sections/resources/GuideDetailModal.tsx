"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, ListChecks } from "lucide-react";
import { cn } from "@/lib/cn";
import { GUIDE_CARD_GRADIENT, type GuidePreview } from "@/data/guides";

const difficultyStyles: Record<GuidePreview["difficulty"], string> = {
  Beginner: "bg-white/25 text-white",
  Intermediate: "bg-white/20 text-white",
  Advanced: "bg-white/30 text-white",
};

interface GuideDetailModalProps {
  guide: GuidePreview | null;
  onClose: () => void;
}

export function GuideDetailModal({ guide, onClose }: GuideDetailModalProps) {
  useEffect(() => {
    if (!guide) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [guide, onClose]);

  return (
    <AnimatePresence>
      {guide && (
        <>
          <motion.button
            type="button"
            aria-label="Close guide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto z-50 w-auto sm:w-[min(100vw-2rem,42rem)] sm:max-h-[min(90vh,52rem)] flex flex-col"
          >
            <div className="flex flex-col max-h-full bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div
                className={cn(
                  "shrink-0 px-5 sm:px-6 pt-5 sm:pt-6 pb-4 bg-linear-to-br text-white",
                  GUIDE_CARD_GRADIENT
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm">
                        {guide.category}
                      </span>
                      <span
                        className={cn(
                          "inline-block px-2 py-0.5 rounded-full text-xs font-semibold",
                          difficultyStyles[guide.difficulty]
                        )}
                      >
                        {guide.difficulty}
                      </span>
                    </div>
                    <h2
                      id="guide-modal-title"
                      className="font-heading font-bold text-lg sm:text-xl leading-snug pr-2"
                    >
                      {guide.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-white/85">
                      <span className="flex items-center gap-1">
                        <ListChecks className="w-3.5 h-3.5" />
                        {guide.stepItems.length} steps
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {guide.readTime}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 sm:py-6">
                <p className="text-sm sm:text-base text-slate leading-relaxed mb-6">
                  {guide.excerpt}
                </p>

                <ol className="space-y-4">
                  {guide.stepItems.map((step, i) => (
                    <li
                      key={step.title}
                      className="flex gap-3 sm:gap-4 p-4 rounded-xl border border-border bg-surface/50"
                    >
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-primary text-white text-sm font-heading font-bold flex items-center justify-center">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading font-semibold text-ink text-sm sm:text-base mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
