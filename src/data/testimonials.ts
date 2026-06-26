export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "247 Digital transformed our online presence completely. Our leads increased by 340% within the first six months, and their CRM solution streamlined our entire sales pipeline.",
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "BuildRight Construction",
    rating: 5,
    initials: "SM",
  },
  {
    quote:
      "The SaaS platform they built for us handles thousands of daily transactions flawlessly. Their team understood our vision and delivered beyond expectations — on time and on budget.",
    name: "James Chen",
    role: "CEO",
    company: "TechVenture Inc.",
    rating: 5,
    initials: "JC",
  },
  {
    quote:
      "From branding to ecommerce development to SEO — they handled everything. Our online revenue tripled in under a year. Truly an end-to-end digital partner.",
    name: "Priya Sharma",
    role: "Founder",
    company: "EcoStyle Boutique",
    rating: 5,
    initials: "PS",
  },
  {
    quote:
      "Their AI automation tools cut our customer response time by 80%. The chatbot integration alone saved us two full-time hires. Incredible ROI from day one.",
    name: "David Okonkwo",
    role: "Operations Manager",
    company: "SwiftLogistics",
    rating: 5,
    initials: "DO",
  },
  {
    quote:
      "We needed a complete digital rebrand and they nailed it. The new identity, website, and social strategy positioned us as market leaders in our space within months.",
    name: "Emma Langford",
    role: "Co-Founder",
    company: "GreenPulse Energy",
    rating: 5,
    initials: "EL",
  },
  {
    quote:
      "Working with 247 Digital felt like having an in-house tech team. Their project management was flawless, and every deliverable exceeded our quality benchmarks.",
    name: "Arjun Kapoor",
    role: "CTO",
    company: "FinEdge Solutions",
    rating: 5,
    initials: "AK",
  },
];
