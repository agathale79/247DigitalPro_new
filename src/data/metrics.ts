export interface TrustMetric {
  value: number;
  suffix: string;
  label: string;
}

export const trustMetrics: TrustMetric[] = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 10, suffix: "M+", label: "Leads Generated" },
];
