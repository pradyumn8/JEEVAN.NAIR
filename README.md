# Jeevan Nair — Personal Brand Website

Single-page marketing site for Jeevan Nair (Career Strategist & Leadership Coach), built with vanilla HTML/CSS/JS on a Neumorphism (Soft UI) design system.

**Live (staging):** https://jeevannair-sttaging.netlify.app/

---

## Stack

- HTML5, CSS3 (custom properties + grid/flex), vanilla JavaScript — no build step, no frameworks.
- Google Fonts: **Plus Jakarta Sans** (display) + **DM Sans** (body), loaded via `<link>`.

## File manifest

```
jeevannair/
├── index.html              Single-page site (all sections)
├── styles.css              Design tokens, components, responsive rules
├── script.js               Mobile nav, stat counters, scroll-in animations, form handlers
├── WebsiteInfo.txt         Source content spec
├── WebsiteComponents/
│   └── WebsiteDevelop.txt  Neumorphism design-system spec
└── README.md
```

## Section order

Nav → Hero → Stats → About → Timeline → Services → Pricing → Testimonials → Blog → Lead Magnet → Contact → Footer. All navigation links are smooth-scroll anchors.

## Design system (Neumorphism)

Tokens are defined as CSS variables in `:root` — edit them in one place to re-skin the site.

| Token | Value |
| --- | --- |
| `--bg` | `#E0E5EC` (cool clay surface) |
| `--fg` | `#3D4852` (primary text, 7.5:1) |
| `--muted` | `#6B7280` (secondary text, 4.6:1) |
| `--accent` | `#6C63FF` (violet) |
| `--accent-light` | `#8B84FF` |
| `--accent-secondary` | `#38B2AC` (teal) |

Shadows follow the design-system rule of **dual RGBA shadows** (light top-left, dark bottom-right) — never hex. Five presets: `--shadow-extruded`, `--shadow-extruded-hover`, `--shadow-extruded-sm`, `--shadow-inset`, `--shadow-inset-deep`, `--shadow-inset-sm`.

Radii: `32px` containers, `16px` buttons, `12px` / `9999px` inner elements.

## Key interactions

- **Sticky nav** with backdrop blur; becomes opaque when the mobile menu is open.
- **Mobile menu**: full-viewport overlay (`100dvh`) with body scroll-lock; hamburger toggles to X.
- **Stat counters**: count up from 0 on scroll-into-view with ease-out cubic (`script.js`).
- **Scroll-in reveal**: cards, timeline items, and stats fade/slide in via `IntersectionObserver`.
- **Timeline dots**: desktop dots ride the vertical track beside each card; mobile dots sit on the track beside each year label.

## Image placeholders

The hero and about visuals use a neumorphic scene with a central **image placeholder** (dashed inset well) plus two decorative elements (extruded circle + extruded icon badge). The blog grid uses the same placeholder treatment for article thumbnails.

To drop in a real image, replace the inner `<svg>` with an `<img src="…" alt="…">`. CSS already handles `object-fit: cover` and the rounded clipping.

## Running locally

It's a static site — open `index.html` directly in a browser, or serve it:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit http://localhost:8080.

## Deploying

This repo is deployed on **Netlify** (see staging URL above). Any static host works — Netlify, Vercel, GitHub Pages, Cloudflare Pages. No build command required; publish the repo root.

## Customization checklist

- Copy: all editable content lives in `index.html`.
- Contact details: search for `hello@jeevannair.com`, `linkedin.com/in/jeevannair`.
- Calendly: wire up the "Open Scheduler" button in the Contact section.
- Form backends: forms currently show a client-side "thanks" confirmation (`script.js`). Point them at Netlify Forms, Formspree, or a custom endpoint for real submissions.
- Images: swap the `.neu-image-placeholder` SVGs and `.blog-visual` SVGs for `<img>` tags.

## Browser support

Modern evergreen browsers. Uses CSS Grid, custom properties, `aspect-ratio`, `backdrop-filter`, and `100dvh`.

## Accessibility

- WCAG AA+ text contrast.
- Visible focus rings on all interactive elements (`ring-2` accent with offset).
- Touch targets ≥ 44×44px.
- `aria-label` on the hamburger and image placeholders; `aria-expanded` toggled on menu state.
