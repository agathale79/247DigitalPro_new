export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  /** Highlight only on this exact path, not on paths nested under it. */
  exact?: boolean;
}
