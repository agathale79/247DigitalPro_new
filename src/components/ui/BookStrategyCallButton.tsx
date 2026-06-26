"use client";

import { brandVoice } from "@/config/brand";
import { useStrategyCall } from "@/components/layout/StrategyCallPopup";
import { Button, type ButtonVariant } from "@/components/ui/Button";

interface BookStrategyCallButtonProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function BookStrategyCallButton({
  variant = "primary",
  size = "md",
  className,
  icon,
  children,
}: BookStrategyCallButtonProps) {
  const { openStrategyCall } = useStrategyCall();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      icon={icon}
      onClick={openStrategyCall}
    >
      {children ?? brandVoice.ctaPrimary}
    </Button>
  );
}
