# 247 Digital Pro — Brand Guidelines

**Source file:** [`247DigitalPro___Brand_Guidelines.pdf`](./247DigitalPro___Brand_Guidelines.pdf)  
**Version:** 2.0 (2026) · Internal and approved partner use

## Implementation in this repo

| Guidelines § | Code / location |
|--------------|-----------------|
| 01 Brand Foundation | `src/config/site.ts`, `src/app/about/page.tsx` |
| 02 Logo System | `src/config/logo.ts`, `src/components/brand/Logo.tsx`, `public/brand/` |
| 03 Color System | `src/app/globals.css`, `src/config/colors.ts` |
| 04 Typography | `src/app/layout.tsx`, `src/styles/typography.css`, `.text-overline`, `.text-lead`, `.text-display` |
| 05 Services | `src/data/services.ts`, `/services`, home `ServicesOverview` |
| 06 Spacing & Shape | `globals.css` spacing scale, `rounded-lg` buttons (8px), `rounded-xl` cards (12px) |
| 07 Brand Voice | `src/config/brand.ts` (`brandVoice`, `brandTonePillars`, `brandWriteLikeThis`), `BrandVoiceSection` on About |
| 08 Brand in Action | `BrandCTA`, `BrandedPageHero`, dark `bg-deep-navy` CTAs |
| 09 Buttons & CTAs | `src/components/ui/Button.tsx` (`primary`, `outline`, `mint`, `outlineDark`, `emphasis`), `BrandCTA`, all page CTAs |
| Site metadata | `src/app/layout.tsx`, `src/config/site.ts` |

When the PDF and code disagree, treat the PDF as the source of truth and update tokens first, then components.

### Color system (§03)

| Token | Hex | Tailwind / CSS |
|-------|-----|----------------|
| Deep Navy | `#0D1F3C` | `deep-navy`, `--deep-navy` |
| Brand Navy | `#1E5A98` | `primary`, `--primary` |
| Wordmark Navy | `#1A3A5F` | `wordmark`, `--wordmark` |
| Brand Mint | `#D1F5EE` | `brand-mint` |
| Sky Blue | `#2D6AB5` | `primary-light` |
| Pale Blue | `#D6E8F8` | `pale-blue` |
| Mid Mint | `#7DD4C0` | `mid-mint`, overlines |
| Deep Mint | `#1A9E80` | `deep-mint` |
| Ink | `#0F1E30` | `ink` |
| Slate | `#4E6580` | `slate` |
| Cloud | `#DCE6F0` | `cloud`, `border` |
| Surface | `#F3F7FC` | `surface` |

Shared gradients: `--gradient-hero`, `--gradient-story`, `--gradient-services-page`.

### Buttons & CTAs (§09)

| Variant | Use |
|---------|-----|
| `primary` | Main conversion on light/white surfaces (`#1E5A98`) |
| `outline` | Secondary action beside primary on light surfaces |
| `mint` | Primary on dark/navy blocks only (`#D1F5EE` / navy text) |
| `outlineDark` | Secondary on dark/navy blocks |
| `emphasis` | High-emphasis standalone on light surfaces (`#1A9E80`) |

Rules: one primary per section, max two CTAs per row, `min-h-11` touch target, `rounded-lg` only, hover darken 10% or navy focus ring.

### Logo system (§02)

| Rule | Implementation |
|------|----------------|
| Light lockup on mint/white | `Logo variant="light"` in header |
| Dark lockup on navy | `Logo variant="dark"` in footer |
| Icon mark only | Favicon, compact `layout="icon"` |
| Clear space ≥ 1× icon height | `Logo` padding |
| No shadows / effects on logo | Unmodified `Image` only |

Add official lockups to `public/brand/` — see [`public/brand/README.md`](../../public/brand/README.md).

### Pages aligned (audit checklist)

- [x] Home — all sections
- [x] About — brand foundation content
- [x] Services listing + detail layouts
- [x] Contact, Portfolio, Products, Industries
- [x] Resources, Blog, Case Studies, Testimonials, Support
- [x] Legal (privacy, terms, cookies)
- [x] Header / Footer / 404
