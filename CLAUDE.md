# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Marketing website for 247DigitalPro (https://247digitalpro.com). Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript, deployed as a **static export on Netlify**.

## Commands

```bash
npm ci              # install (package-lock.json is committed)
npm run dev         # dev server at http://localhost:3000
npm run build       # static export -> out/
npm run lint        # ESLint (flat config, next core-web-vitals + typescript)
npx tsc --noEmit    # type-check only
```

There is no test suite. Verify changes with `npm run build`, since a static export fails on anything that needs a server at runtime. `next build` does not run ESLint, so run `npm run lint` separately. Lint already had pre-existing errors (mostly `react-hooks/set-state-in-effect`) when this file was written, so judge only the files you touched.

## Deployment / CI

- No GitHub Actions. Netlify builds from `main` on push; its build command and publish dir live in the **Netlify dashboard**. `netlify.toml` declares only `[functions]` and deliberately leaves out `[build]` and `[[redirects]]`, because adding those would override the dashboard settings.
- Commit history so far is mostly GitHub web uploads ("Add files via upload"). Prefer branches and PRs.
- `public/.htaccess` is Apache config left over from a cPanel-style host. Netlify ignores it.
- `public/sitemap.xml` and `public/robots.txt` are currently **empty files**.

## Architecture

**Static export constraints** (`next.config.ts`: `output: "export"`, `trailingSlash: true`, `images.unoptimized`):
- No API routes, server actions, middleware, ISR, or runtime `next/image` optimization.
- Dynamic routes (`portfolio/[slug]`, `resources/blog/[slug]`) must export `generateStaticParams()` from the matching `src/data/*` helpers.
- Internal links resolve with trailing slashes (`/tools/login/`).

**Content is data-driven.** Most page copy lives in typed TS modules, not in the page files:
- `src/data/*`: services, service-details, portfolio(-details), case-studies, blog-posts, guides, testimonials, faq, team, metrics, tools, etc. Types are in `src/types/*`.
- `src/config/*`: site metadata (`site.ts`), main nav (`navigation.ts`), brand voice (`brand.ts`), colors, logo assets, service icons and themes, socials.
- Route files in `src/app/**/page.tsx` are thin. Each exports `metadata` and renders a layout or section component. For example, `services/seo/page.tsx` renders `<ServicePageLayout slug="seo" />`, which pulls its content from `src/data/service-details.ts`.
- **To add a service page:** add an entry to `service-details.ts` (and `services.ts` for the listing), then create `src/app/services/<slug>/page.tsx` the same way the existing ones do.

**Components** (`@/*` → `src/*`): `components/layout` (Header, Footer, Navbar, MobileMenu, StrategyCallPopup, AppProviders), `components/sections/<page>/` (per-page sections), `components/ui` (primitives such as `Button`), `components/forms`. Use `cn()` from `src/lib/cn.ts` (clsx + tailwind-merge) for class names.

**Root layout** (`src/app/layout.tsx`) loads the Outfit and Nunito Sans fonts, an intro preflight script (`src/config/intro.ts`), Google Analytics (`G-Q7YT6PCNCN`), and wraps every page in Header, `<main>` and Footer.

**Lead forms → email.** The contact page and `StrategyCallPopup` POST `{ subject, fields }` to `/.netlify/functions/send-lead`. That function (`netlify/functions/send-lead.ts`) sends the lead through SMTP with nodemailer. It needs the env vars `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and optionally `SMTP_TO`, which are set in the Netlify dashboard. `npm run dev` doesn't serve this function; use `netlify dev` to test forms locally.

**`/tools/*` portal** (see `docs/tools-audit.md`): a client-only section with its own `tools/layout.tsx` (`AuthProvider` + `ToolsSubNav` + `styles/tools-audit.css`). It uses Firebase phone-OTP auth (`src/lib/firebase.ts`, `src/contexts/AuthContext.tsx`) and calls an external "Web Scrapping" Express API (`src/lib/api/*`, base URL from `NEXT_PUBLIC_API_BASE`). That API's backend isn't in this repo. Env vars go in `.env.local` (`NEXT_PUBLIC_API_BASE`, `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_SOCIAL_AUDIT_PATH`). `.env.example` is referenced in the code but isn't committed.

Note the two context folders: `src/context/` (Navigation, Theme) and `src/contexts/` (Auth).

## Brand rules

`docs/brand/README.md` maps the brand guidelines PDF to the code. **When the PDF and the code disagree, the PDF wins:** update tokens first, then components.
- Color tokens are defined in `src/app/globals.css` and `src/config/colors.ts` (`deep-navy`, `primary` #1E5A98, `brand-mint`, `deep-mint`, `surface`, etc.). Use the tokens, not raw hex values.
- Button variants (`src/components/ui/Button.tsx`): `primary`/`outline` on light surfaces, `mint`/`outlineDark` on navy. Use one primary per section, at most two CTAs per row, `rounded-lg`, and `min-h-11`.
- Logo: use `Logo variant="light"` in the header and `variant="dark"` in the footer. Never recolor the logo or add shadows or effects to it.

Product scope and the target site map are in `PRD_TRD_247_Website.txt` and `247 New Website Site Map.txt`. Many site-map pages don't exist yet.
