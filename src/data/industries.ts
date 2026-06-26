export interface IndustryItem {
  title: string;
  description: string;
  icon: string;
  image: string;
  href: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const industries: IndustryItem[] = [
  {
    title: "Construction",
    description:
      "CRM, estimation, scheduling, and proposal automation tailored for contractors and builders.",
    icon: "hammer",
    image: unsplash("photo-1504307651254-35680f356dfd"),
    href: "/industries/contractors",
  },
  {
    title: "Healthcare",
    description:
      "Patient management, appointment scheduling, and compliant digital solutions for care providers.",
    icon: "heart",
    image: unsplash("photo-1576091160399-112ba8d25d1d"),
    href: "/industries",
  },
  {
    title: "Ecommerce",
    description:
      "Scalable online stores, inventory management, and conversion-optimized shopping experiences.",
    icon: "store",
    image: unsplash("photo-1556742049-0cfed4f6a45d"),
    href: "/industries/ecommerce",
  },
  {
    title: "Education",
    description:
      "Learning platforms, virtual classrooms, and student engagement tools for modern institutions.",
    icon: "book-open",
    image: unsplash("photo-1503676260728-1c00da094a0b"),
    href: "/industries",
  },
  {
    title: "Manufacturing",
    description:
      "ERP systems, supply chain automation, and production workflow optimization at scale.",
    icon: "building-2",
    image: unsplash("photo-1581092160562-40aa08e78837"),
    href: "/industries",
  },
  {
    title: "Startups",
    description:
      "MVP development, growth marketing, and scalable technology foundations for new ventures.",
    icon: "rocket",
    image: unsplash("photo-1522071820081-009f0129c71c"),
    href: "/industries/startups",
  },
];
