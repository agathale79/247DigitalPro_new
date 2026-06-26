"use client";

import { StrategyCallProvider } from "./StrategyCallPopup";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <StrategyCallProvider>{children}</StrategyCallProvider>;
}
