import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * §09 Buttons & CTAs — Brand Guidelines v2.0
 * - primary: #1E5A98 fill, white text (main conversion on light surfaces)
 * - outline: ghost + primary border (secondary alongside primary)
 * - mint: #D1F5EE fill, navy text (dark/navy backgrounds only)
 * - outlineDark: white border ghost (secondary on dark surfaces)
 * - emphasis: #1A9E80 deep mint (high-emphasis standalone on light surfaces)
 */
export const buttonVariants = {
  primary:
    "bg-primary text-on-dark hover:brightness-[0.9] focus-visible:shadow-[0_0_0_2px_var(--deep-navy)] min-h-11 min-w-11",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-pale-blue/50 focus-visible:shadow-[0_0_0_2px_var(--deep-navy)] min-h-11 min-w-11",
  mint: "bg-brand-mint text-deep-navy hover:brightness-[0.9] focus-visible:shadow-[0_0_0_2px_var(--brand-mint)] min-h-11 min-w-11",
  outlineDark:
    "border-2 border-white/35 text-white bg-transparent hover:bg-white/10 focus-visible:shadow-[0_0_0_2px_var(--brand-mint)] min-h-11 min-w-11",
  emphasis:
    "bg-deep-mint text-on-dark hover:brightness-[0.9] focus-visible:shadow-[0_0_0_2px_var(--deep-navy)] min-h-11 min-w-11",
  ghost:
    "text-slate hover:text-ink hover:bg-surface min-h-11 min-w-11",
  /** @deprecated Use `emphasis` */
  secondary:
    "bg-deep-mint text-on-dark hover:brightness-[0.9] focus-visible:shadow-[0_0_0_2px_var(--deep-navy)] min-h-11 min-w-11",
  /** @deprecated Use `emphasis` */
  audit:
    "bg-deep-mint text-on-dark hover:brightness-[0.9] focus-visible:shadow-[0_0_0_2px_var(--deep-navy)] min-h-11 min-w-11",
} as const;

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export type ButtonVariant = keyof typeof buttonVariants;

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: keyof typeof sizeStyles;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  icon,
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-heading font-semibold transition-all duration-200",
    "focus-visible:outline-none",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    buttonVariants[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
