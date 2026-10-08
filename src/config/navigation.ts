import type { NavItem } from "@/types/navigation";

export const mainNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products", exact: true },
      { label: "JobFlow", href: "/products/jobflow" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Guides", href: "/resources/guides" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];
