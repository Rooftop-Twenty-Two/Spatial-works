# Spatial Works — Homepage

Marketing homepage for **Spatial Works**, a Dublin studio for signage, feature walls,
branded interiors and architectural finishes. Built with React 19 + Vite + Tailwind v4,
following the Spatial Works Complete Brand Guidelines.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
```

## Brand system

| Token | Value | Use |
|-------|-------|-----|
| `sw-orange` (Grenadier) | `#DD3E00` | Primary accent, CTAs |
| `sw-black` | `#020219` | Text, dark sections |
| `sw-white` | `#FFFFFF` | Base |
| `graphite / space / steel / smoke / cloud` | grey scale | Secondary / surfaces |

- **Type:** Geist only — the sole brand typeface (Regular/Medium/Demi-Bold/Bold), loaded from Google Fonts. Body copy 18px; type scale H1 64 / H2 48 / H3 36 / Subhead 24 / Paragraph 18.
- **Tokens** are defined in `src/index.css` via Tailwind v4 `@theme`.
- **Logos & emblem** live in `public/brand/` (cropped from the official SVG kit).

## Structure

- `src/App.tsx` — renders `Page`
- `src/components/Sections.tsx` — `Page` shell, `Header`, `OverlayMenu`, `Hero`, `Why`,
  `ShowcaseScroll`, `Solutions`, `Projects`, `Testimonials`, `CompanyNews`, `CtaBand`, `Footer`
- `src/components/ui/` — reusable primitives (shadcn-style): `button`, `origin-button`,
  `button-with-icon` (`ArrowButton`)
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `@/*` path alias → `src/*` (configured in `vite.config.ts` + `tsconfig.app.json`)

## Buttons (`components/ui`)

Two canonical button styles, both in brand colours and Geist **medium**:

- **`ArrowButton`** (`button-with-icon.tsx`) — use for any **directional / arrow** CTA. A
  pill with a Grenadier arrow badge that slides across and rotates on hover. Renders as an
  `<a>` when given `href`. Tones: `dark` (black pill, light surfaces), `light` (white pill,
  dark surfaces), `outline` (secondary).
- **`OriginButton`** (`origin-button.tsx`) — use for **general** (non-arrow) buttons. A pill
  that fills with ink from the pointer on hover (motion); keyboard + pointer accessible.

Both consume shadcn-compatible semantic tokens (`--color-primary`, `--color-card`,
`--color-ring`, …) defined in `index.css` and mapped to the brand. `ui/button.tsx` is the
base shadcn `Button` (used by `ArrowButton`).

## Header & navigation

`Header` is a fixed bar that **reveals on scroll-up and hides on scroll-down** (always shown
near the top). On desktop (`lg+`) it shows the **red** logo, an animated **mega menu** under
"Solutions" (Solutions / Biophilic / Branding columns), the other nav links, and a
"Get in touch" `ArrowButton`. The bar runs **full width** (no max-width cap). Below `lg` it
collapses to a hamburger that opens the full-screen `OverlayMenu`.

## Header & navigation

`Header` is a fixed bar that **reveals on scroll-up and hides on scroll-down** (always shown
near the top). On desktop (`lg+`) it shows the logo, an animated **mega menu** under
"Solutions" (Solutions / Biophilic / Branding columns), the other nav links, and a
"Get in touch" CTA. Below `lg` it collapses to a hamburger that opens the full-screen
`OverlayMenu`.

## Hero

Edge-to-edge rounded black panel (no frame border) with a real project photo
(`public/brand/hero-project.jpg`) filling it full-bleed behind a **soft, bottom-weighted
scrim**. The headline ("Exceptional spaces, expertly crafted") sits over it in white, with
supporting copy + an "Our services" `ArrowButton` along the bottom. No red text on dark.

## Sections

- **ShowcaseScroll** — sticky scroll-driven section between `Why` and `Solutions`: left text
  box, right image that **expands from the side to near-full-screen** as you scroll.
- **Projects** — slow, continuous horizontal **case-study rail** (CSS marquee, pauses on
  hover, respects `prefers-reduced-motion`) with edge fades.
- **Testimonials** — a single-card **carousel** (prev/next arrows) with a grey client logo,
  followed by a scrolling **"Trusted by"** logo rail.
- **Contact** (`#contact`) — **image-first**: copy + "Contact our team" `PillCta` on the
  left, two tall portrait photos on the right (black section).

## Images

Real architectural photography in `public/brand/` (`hero-project`, `project-retail`,
`project-hospitality`, `project-corporate`, `news-studio`, `news-project`, `news-materials`).

Client logos are **placeholder mono SVG marks** in `public/brand/clients/` (grey, emblem +
wordmark) — swap for real client logos when available. The `Why` pillars are a clean
monochrome index (no imagery); the "S" emblem (`emblem-white.svg`) appears on the contact
section. Section backgrounds use White and Black (Grenadier only as an accent, never as
red text on a dark surface).
