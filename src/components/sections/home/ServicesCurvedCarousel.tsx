"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";
import { serviceIconMap } from "@/config/service-icons";
import {
  getServiceIconTheme,
  serviceIconNeedsBorder,
} from "@/config/service-icon-themes";
import type { ServiceOverviewItem } from "@/types/service";

const iconMap: Record<string, LucideIcon> = serviceIconMap;

const CONTENT_FADE_MS = 400;
const DROP_MS = 500;
const EXIT_MS = 340;
const RAIL_OPACITY_LERP = 0.14;
const RAIL_RETURN_ZOOM_MS = 280;

interface CarouselLayout {
  iconSize: number;
  railY: number;
  railToCardGap: number;
  cardHeight: number;
  centerThreshold: number;
  railEdgeFade: number;
  activeScale: number;
  scrollSpeed: number;
  dockOffset: number;
  cardPaddingX: string;
  cardPaddingY: string;
  /** How many icon slots fit across the rail; wider spacing on mobile */
  visibleIconCount: number;
  mobileRail: boolean;
}

function getLayout(width: number): CarouselLayout {
  if (width < 640) {
    return {
      iconSize: 48,
      railY: 36,
      railToCardGap: 36,
      cardHeight: 340,
      centerThreshold: 36,
      railEdgeFade: 40,
      activeScale: 1.12,
      scrollSpeed: 1.1,
      dockOffset: 6,
      cardPaddingX: "px-4",
      cardPaddingY: "py-5",
      visibleIconCount: 4,
      mobileRail: true,
    };
  }
  if (width < 1024) {
    return {
      iconSize: 54,
      railY: 44,
      railToCardGap: 44,
      cardHeight: 332,
      centerThreshold: 32,
      railEdgeFade: 56,
      activeScale: 1.15,
      scrollSpeed: 0.72,
      dockOffset: 7,
      cardPaddingX: "px-5",
      cardPaddingY: "py-6",
      visibleIconCount: 6,
      mobileRail: false,
    };
  }
  return {
    iconSize: 60,
    railY: 52,
    railToCardGap: 56,
    cardHeight: 352,
    centerThreshold: 36,
    railEdgeFade: 80,
    activeScale: 1.18,
    scrollSpeed: 1.0,
    dockOffset: 8,
    cardPaddingX: "px-6",
    cardPaddingY: "py-7",
    visibleIconCount: 7,
    mobileRail: false,
  };
}

const SSR_LAYOUT = getLayout(390);

type Phase = "idle" | "dropping" | "exiting";

interface IconSlot {
  key: string;
  service: ServiceOverviewItem;
  serviceIndex: number;
  copy: number;
}

interface RailIcon extends IconSlot {
  x: number;
}

interface DockItem {
  key: string;
  service: ServiceOverviewItem;
  serviceIndex: number;
}

function buildSlots(services: ServiceOverviewItem[]): IconSlot[] {
  return services.flatMap((service, serviceIndex) =>
    [-1, 0, 1].map((copy) => ({
      key: `${serviceIndex}-${copy}`,
      service,
      serviceIndex,
      copy,
    }))
  );
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function getRailSpacing(width: number, visibleIconCount: number): number {
  return width / Math.max(visibleIconCount - 0.5, 1);
}

function placeRailSlot(
  slot: IconSlot,
  pixelOffset: number,
  width: number,
  count: number,
  iconSize: number,
  visibleIconCount: number
): RailIcon | null {
  const spacing = getRailSpacing(width, visibleIconCount);
  const trackLen = spacing * count;
  const x = mod(
    slot.serviceIndex * spacing + pixelOffset + slot.copy * trackLen,
    trackLen
  );

  if (x < -iconSize || x > width + iconSize) return null;

  return { ...slot, x };
}

function railOpacity(
  x: number,
  width: number,
  edgeFade: number,
  iconSize: number,
  mobileRail: boolean
): number {
  if (x <= 0 || x >= width) return 0;

  if (mobileRail) {
    const half = iconSize / 2;
    if (x < half || x > width - half) return 0;
    const fromLeft = Math.min(1, (x - half) / edgeFade);
    const fromRight = Math.min(1, (width - half - x) / edgeFade);
    return Math.min(fromLeft, fromRight);
  }

  const fromLeft = Math.min(1, x / edgeFade);
  const fromRight = Math.min(1, (width - x) / edgeFade);
  return Math.min(fromLeft, fromRight);
}

function IconTile({
  icon,
  size,
}: {
  icon: string;
  size: number;
}) {
  const theme = getServiceIconTheme(icon);
  const Icon = iconMap[icon];
  const iconInner = Math.max(18, Math.round(size * 0.42));
  const needsBorder = serviceIconNeedsBorder(theme.bg);

  return (
    <div
      className="flex items-center justify-center rounded-xl shadow-[0_6px_20px_rgba(13,31,60,0.12)] sm:rounded-2xl"
      style={{
        width: size,
        height: size,
        backgroundColor: theme.bg,
        color: theme.color,
        border: needsBorder ? "1px solid var(--border)" : undefined,
      }}
    >
      {Icon && (
        <Icon
          style={{ width: iconInner, height: iconInner }}
          strokeWidth={1.6}
        />
      )}
    </div>
  );
}

interface ServicesCurvedCarouselProps {
  services: ServiceOverviewItem[];
}

export function ServicesCurvedCarousel({ services }: ServicesCurvedCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const railIconRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const pixelOffsetRef = useRef(0);
  const widthRef = useRef(0);
  const layoutRef = useRef<CarouselLayout>(SSR_LAYOUT);
  const layoutBucketRef = useRef("");
  const railOpacityRef = useRef<Map<string, number>>(new Map());
  const prevPositionsRef = useRef<Map<string, number>>(new Map());
  const phaseRef = useRef<Phase>("idle");
  const dockedRef = useRef<DockItem | null>(null);
  const hiddenRailIndexRef = useRef<number | null>(null);
  const returnFadeStartRef = useRef<Map<number, number>>(new Map());
  const animTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const [layout, setLayout] = useState<CarouselLayout>(SSR_LAYOUT);
  const [isPaused, setIsPaused] = useState(false);
  const [docked, setDocked] = useState<DockItem | null>(null);
  const [dropAnim, setDropAnim] = useState<(DockItem & { landed: boolean }) | null>(
    null
  );
  const [exitAnim, setExitAnim] = useState<{
    serviceIndex: number;
    fading: boolean;
  } | null>(null);
  const [displayService, setDisplayService] = useState<ServiceOverviewItem>(
    services[0]
  );
  const [contentVisible, setContentVisible] = useState(true);

  const slots = useMemo(() => buildSlots(services), [services]);

  const cardTop = layout.railY + layout.railToCardGap + layout.iconSize / 2;
  const dockY = cardTop - layout.dockOffset;
  const containerHeight = cardTop + layout.cardHeight + 24;

  const clearAnimTimer = useCallback(() => {
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    animTimerRef.current = null;
  }, []);

  const updateDisplayService = useCallback((service: ServiceOverviewItem) => {
    setContentVisible(false);
    window.setTimeout(() => {
      setDisplayService(service);
      setContentVisible(true);
    }, CONTENT_FADE_MS / 2);
  }, []);

  const completeDock = useCallback((item: DockItem) => {
    setDropAnim(null);
    dockedRef.current = item;
    hiddenRailIndexRef.current = item.serviceIndex;
    setDocked(item);
    phaseRef.current = "idle";
  }, []);

  const beginDrop = useCallback(
    (item: DockItem) => {
      clearAnimTimer();
      phaseRef.current = "dropping";
      hiddenRailIndexRef.current = item.serviceIndex;
      dockedRef.current = null;
      setDocked(null);
      updateDisplayService(item.service);
      setDropAnim({ ...item, landed: false });

      animTimerRef.current = window.setTimeout(() => {
        completeDock(item);
      }, DROP_MS);
    },
    [clearAnimTimer, completeDock, updateDisplayService]
  );

  const beginExitAndDrop = useCallback(
    (next: DockItem) => {
      clearAnimTimer();
      const current = dockedRef.current;
      if (!current) {
        beginDrop(next);
        return;
      }

      phaseRef.current = "exiting";
      dockedRef.current = null;
      setDocked(null);
      setExitAnim({ serviceIndex: current.serviceIndex, fading: false });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setExitAnim({ serviceIndex: current.serviceIndex, fading: true });
        });
      });

      animTimerRef.current = window.setTimeout(() => {
        setExitAnim(null);
        const returningIndex = hiddenRailIndexRef.current;
        if (returningIndex !== null) {
          returnFadeStartRef.current.set(returningIndex, performance.now());
        }
        hiddenRailIndexRef.current = null;
        beginDrop(next);
      }, EXIT_MS);
    },
    [beginDrop, clearAnimTimer]
  );

  const onIconReachCenter = useCallback(
    (item: DockItem) => {
      if (phaseRef.current !== "idle") return;

      const current = dockedRef.current;
      if (current?.serviceIndex === item.serviceIndex) return;

      if (current) {
        beginExitAndDrop(item);
      } else {
        beginDrop(item);
      }
    },
    [beginDrop, beginExitAndDrop]
  );

  const findCenterCandidate = useCallback(
    (placed: RailIcon[], cx: number, threshold: number): RailIcon | null => {
      const prev = prevPositionsRef.current;
      let best: RailIcon | null = null;
      let bestDist = Infinity;

      for (const icon of placed) {
        if (hiddenRailIndexRef.current === icon.serviceIndex) continue;

        const dist = Math.abs(icon.x - cx);
        const prevX = prev.get(icon.key);

        let enteredCenter = dist <= threshold;
        if (prevX !== undefined) {
          const crossed =
            (prevX < cx && icon.x >= cx - threshold / 2) ||
            (prevX > cx && icon.x <= cx + threshold / 2);
          enteredCenter =
            enteredCenter || (crossed && dist <= threshold * 1.6);
        }

        if (enteredCenter && dist < bestDist) {
          bestDist = dist;
          best = icon;
        }
      }

      return best;
    },
    []
  );

  const tick = useCallback(() => {
    const width = widthRef.current;
    const currentLayout = layoutRef.current;
    if (width <= 0) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    if (!pausedRef.current && phaseRef.current === "idle") {
      pixelOffsetRef.current += currentLayout.scrollSpeed;
    }

    const now = performance.now();
    const cx = width / 2;
    const allPlaced = slots
      .map((slot) =>
        placeRailSlot(
          slot,
          pixelOffsetRef.current,
          width,
          services.length,
          currentLayout.iconSize,
          currentLayout.visibleIconCount
        )
      )
      .filter((p): p is RailIcon => p !== null);

    for (const slot of slots) {
      const el = railIconRefs.current.get(slot.key);
      if (!el) continue;

      const placed = allPlaced.find((p) => p.key === slot.key);
      const hideOnRail =
        hiddenRailIndexRef.current !== null &&
        slot.serviceIndex === hiddenRailIndexRef.current;

      let targetOpacity =
        !placed || hideOnRail
          ? 0
          : railOpacity(
              placed.x,
              width,
              currentLayout.railEdgeFade,
              currentLayout.iconSize,
              currentLayout.mobileRail
            );

      const zoomStart = returnFadeStartRef.current.get(slot.serviceIndex);
      let returnScale = 1;
      if (zoomStart !== undefined && targetOpacity > 0) {
        const progress = Math.min(1, (now - zoomStart) / RAIL_RETURN_ZOOM_MS);
        returnScale = 0.9 + 0.1 * progress;
        if (progress >= 1) {
          returnFadeStartRef.current.delete(slot.serviceIndex);
        }
      }

      if (currentLayout.mobileRail) {
        el.style.opacity = String(targetOpacity);
        railOpacityRef.current.set(slot.key, targetOpacity);
      } else {
        const prevOpacity = railOpacityRef.current.get(slot.key) ?? 0;
        const nextOpacity =
          prevOpacity + (targetOpacity - prevOpacity) * RAIL_OPACITY_LERP;
        railOpacityRef.current.set(slot.key, nextOpacity);
        el.style.opacity = String(nextOpacity);
      }

      if (placed) {
        el.style.transform = `translate3d(${placed.x}px, ${currentLayout.railY}px, 0) translate(-50%, -50%) scale(${returnScale})`;
      } else {
        el.style.opacity = "0";
      }
    }

    if (!pausedRef.current && phaseRef.current === "idle") {
      const candidate = findCenterCandidate(
        allPlaced,
        cx,
        currentLayout.centerThreshold
      );
      if (candidate) {
        onIconReachCenter({
          key: candidate.key,
          service: candidate.service,
          serviceIndex: candidate.serviceIndex,
        });
      }
    }

    const nextPrev = new Map<string, number>();
    for (const icon of allPlaced) {
      nextPrev.set(icon.key, icon.x);
    }
    prevPositionsRef.current = nextPrev;

    rafRef.current = requestAnimationFrame(tick);
  }, [findCenterCandidate, onIconReachCenter, services.length, slots]);

  useEffect(() => {
    if (!dropAnim || dropAnim.landed) return;
    const id = requestAnimationFrame(() => {
      setDropAnim((prev) => (prev ? { ...prev, landed: true } : null));
    });
    return () => cancelAnimationFrame(id);
  }, [dropAnim]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    widthRef.current = w;
    const nextLayout = getLayout(w);
    const bucket =
      w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";

    if (bucket !== layoutBucketRef.current) {
      layoutBucketRef.current = bucket;
      prevPositionsRef.current = new Map();
      railOpacityRef.current = new Map();
      returnFadeStartRef.current = new Map();
    }

    layoutRef.current = nextLayout;
    setLayout(nextLayout);
  }, []);

  useLayoutEffect(() => {
    measure();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [measure, tick]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(measure);
    ro.observe(container);

    return () => {
      ro.disconnect();
      clearAnimTimer();
    };
  }, [clearAnimTimer, measure]);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setIsPaused(pausedRef.current);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full touch-manipulation select-none"
      style={{ height: containerHeight }}
      aria-label="Services carousel"
    >
      {/* Horizontal rail */}
      <div
        className="absolute inset-x-0 top-0 overflow-hidden"
        style={{ height: layout.railY + layout.iconSize }}
      >
        {slots.map((slot) => (
          <div
            key={slot.key}
            ref={(node) => {
              if (node) railIconRefs.current.set(slot.key, node);
              else railIconRefs.current.delete(slot.key);
            }}
            className="absolute left-0 top-0 will-change-[transform,opacity]"
          >
            <IconTile
              icon={slot.service.icon}
              size={layout.iconSize}
            />
          </div>
        ))}
      </div>

      {/* Dropping icon */}
      {dropAnim && (
        <div
          className="absolute left-1/2 z-20"
          style={{
            top: dropAnim.landed ? dockY : layout.railY,
            transform: `translate(-50%, -50%) scale(${layout.activeScale})`,
            transition: `top ${DROP_MS}ms ease-in-out`,
          }}
        >
          <IconTile
            icon={dropAnim.service.icon}
            size={layout.iconSize}
          />
        </div>
      )}

      {/* Docked icon */}
      {docked && !dropAnim && !exitAnim && (
        <div
          className="absolute left-1/2 z-20"
          style={{
            top: dockY,
            transform: `translate(-50%, -50%) scale(${layout.activeScale})`,
          }}
        >
          <IconTile
            icon={docked.service.icon}
            size={layout.iconSize}
          />
        </div>
      )}

      {/* Exiting icon */}
      {exitAnim && (
        <div
          className="absolute left-1/2 z-20"
          style={{
            top: dockY,
            transform: `translate(-50%, -50%) scale(${exitAnim.fading ? 0.85 : layout.activeScale})`,
            opacity: exitAnim.fading ? 0 : 1,
            transition: `opacity ${EXIT_MS}ms ease-in-out, transform ${EXIT_MS}ms ease-in-out`,
          }}
        >
          <IconTile
            icon={services[exitAnim.serviceIndex].icon}
            size={layout.iconSize}
          />
        </div>
      )}

      {/* Center card */}
      <div
        className="pointer-events-none absolute left-1/2 z-10 w-full -translate-x-1/2"
        style={{ top: cardTop, maxWidth: "min(100%, 28rem)" }}
        aria-live="polite"
      >
        <div
          className={`pointer-events-auto mx-auto flex w-full flex-col rounded-2xl border border-border bg-white text-center shadow-[0_12px_48px_rgba(30,90,152,0.14)] ${layout.cardPaddingX} ${layout.cardPaddingY}`}
          style={{ minHeight: layout.cardHeight }}
        >
          {/* Space for docked icon */}
          <div className="h-5 shrink-0 sm:h-7" aria-hidden />

          <div
            className="flex flex-1 flex-col"
            style={{
              opacity: contentVisible ? 1 : 0,
              transition: `opacity ${CONTENT_FADE_MS}ms ease-in-out`,
            }}
          >
            <h3 className="font-heading text-sm font-bold leading-snug text-wordmark sm:text-base lg:text-lg">
              {displayService.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate line-clamp-3 sm:mt-3 sm:text-lg">
              {displayService.description}
            </p>
            <Link
              href={displayService.href}
              className="mt-3 inline-flex min-h-10 items-center justify-center gap-1.5 text-xs font-semibold text-primary transition-all duration-300 ease-in-out hover:gap-2.5 sm:text-sm"
            >
              Learn more
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>

            <button
              type="button"
              onClick={togglePause}
              className="mt-1 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-center rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-slate transition-colors hover:border-primary/30 hover:text-primary active:scale-[0.98] sm:mt-1.5"
              aria-pressed={isPaused}
              aria-label={isPaused ? "Resume carousel" : "Pause carousel"}
            >
              {isPaused ? (
                <>
                  <Play className="h-4 w-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
