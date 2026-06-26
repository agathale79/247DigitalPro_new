import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {overline && <p className="text-overline mb-3">{overline}</p>}
      <h2 className="font-heading font-bold text-wordmark text-[clamp(1.75rem,4vw,2.25rem)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lead text-slate leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
