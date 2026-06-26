"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { brandVoice } from "@/config/brand";
import { Button } from "@/components/ui/Button";

interface StrategyCallOptions {
  overline?: string;
  title?: string;
  submitLabel?: string;
  successMessage?: string;
  selectedProduct?: string;
  selectedProject?: string;
}

interface StrategyCallContextValue {
  openStrategyCall: (options?: StrategyCallOptions) => void;
  closeStrategyCall: () => void;
}

const StrategyCallContext = createContext<StrategyCallContextValue | null>(null);

export function useStrategyCall() {
  const ctx = useContext(StrategyCallContext);
  if (!ctx) {
    throw new Error("useStrategyCall must be used within StrategyCallProvider");
  }
  return ctx;
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-disabled outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all";

interface PopupContent {
  overline: string;
  title: string;
  submitLabel: string;
  successMessage: string;
  selectedProduct?: string;
  selectedProject?: string;
}

const defaultPopupContent: PopupContent = {
  overline: "Free Consultation",
  title: brandVoice.ctaPrimary,
  submitLabel: brandVoice.ctaPrimary,
  successMessage: "We'll reach out shortly to schedule your strategy call.",
  selectedProduct: undefined,
  selectedProject: undefined,
};

export function StrategyCallProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [popupContent, setPopupContent] = useState<PopupContent>(defaultPopupContent);

  const openStrategyCall = useCallback((options?: StrategyCallOptions) => {
    setPopupContent({ ...defaultPopupContent, ...options });
    setSubmitted(false);
    setIsOpen(true);
  }, []);

  const closeStrategyCall = useCallback(() => {
    setIsOpen(false);
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "" });
    setPopupContent(defaultPopupContent);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <StrategyCallContext.Provider
      value={{ openStrategyCall, closeStrategyCall }}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="strategy-call-popup"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto z-[60] w-auto sm:w-[min(100vw-2rem,380px)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="strategy-call-title"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-border-light">
                <div>
                  <p className="text-overline text-[0.65rem] mb-1">
                    {popupContent.overline}
                  </p>
                  <h2
                    id="strategy-call-title"
                    className="font-heading font-bold text-ink text-base sm:text-lg leading-tight"
                  >
                    {popupContent.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeStrategyCall}
                  className="shrink-0 p-1.5 rounded-lg text-slate hover:text-ink hover:bg-surface transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                {submitted ? (
                  <div className="text-center py-4">
                    <CheckCircle2 className="w-10 h-10 text-deep-mint mx-auto mb-3" />
                    <p className="font-heading font-semibold text-ink mb-1">
                      Request received!
                    </p>
                    <p className="text-sm text-slate mb-5">
                      {popupContent.successMessage}
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={closeStrategyCall}
                      className="w-full"
                    >
                      Done
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {popupContent.selectedProduct && (
                      <div>
                        <label
                          htmlFor="sc-product"
                          className="block text-xs font-semibold text-ink mb-1.5"
                        >
                          Selected Product
                        </label>
                        <input
                          id="sc-product"
                          name="product"
                          type="text"
                          readOnly
                          value={popupContent.selectedProduct}
                          className={`${inputClass} bg-surface/80 text-slate cursor-default`}
                        />
                      </div>
                    )}
                    {popupContent.selectedProject && (
                      <div>
                        <label
                          htmlFor="sc-project"
                          className="block text-xs font-semibold text-ink mb-1.5"
                        >
                          Selected Project
                        </label>
                        <input
                          id="sc-project"
                          name="project"
                          type="text"
                          readOnly
                          value={popupContent.selectedProject}
                          className={`${inputClass} bg-surface/80 text-slate cursor-default`}
                        />
                      </div>
                    )}
                    <div>
                      <label
                        htmlFor="sc-name"
                        className="block text-xs font-semibold text-ink mb-1.5"
                      >
                        Name <span className="text-deep-mint">*</span>
                      </label>
                      <input
                        id="sc-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sc-email"
                        className="block text-xs font-semibold text-ink mb-1.5"
                      >
                        Email <span className="text-deep-mint">*</span>
                      </label>
                      <input
                        id="sc-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sc-phone"
                        className="block text-xs font-semibold text-ink mb-1.5"
                      >
                        Contact Number <span className="text-deep-mint">*</span>
                      </label>
                      <input
                        id="sc-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        placeholder="+1 (234) 567-890"
                        className={inputClass}
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full mt-1"
                    >
                      {popupContent.submitLabel}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </StrategyCallContext.Provider>
  );
}
