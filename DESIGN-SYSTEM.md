# SuretyResearch design system

Source of truth: the homepage redesign on branch `fable/homepage-redesign` (commit `dcaf3e0`, draft PR #30).
Scope of this guide: restyle every non-homepage page to match it. Layout and style only.

Files this guide was built from:

- `src/pages/index.astro` (homepage markup)
- `src/styles/home.css` (homepage CSS, imported only from `index.astro`, every rule scoped to `.sr-home` or `body:has(.sr-home)`)
- `src/styles/global.css` (shared tokens and components, loaded by `src/layouts/Layout.astro` on every page)
- `src/layouts/Layout.astro` (header, trust bar, closing band, footer, mobile bar, head tags)

Direction: a printed public register. Three columns with one fixed axis at the start of column two. Headings start on the axis. Small sentence-case margin notes sit in column one. Colour is a two-colour print job: navy and crimson on pale paper. Sections are separated by flat tone steps, not by hairlines, outlined boxes, rounded corners, or drop shadows.

Every value below is copied from the CSS. If you need a value that is not listed here, look for it in `home.css` or `global.css`. If it is not there, do not add it.

---

## 1. Design tokens

There are two token sets. The shared set lives on `:root` in `global.css`. The homepage set lives on `.sr-home` in `home.css` and mostly re-declares the shared values under `--h-*` names, with one new colour and a new type and spacing scale.

**Which to promote:** promote the `--h-*` set from `home.css` into the shared stylesheet described in section 2. Keep the `:root` set in `global.css` untouched until every template is migrated, because unmigrated pages depend on it.

### 1.1 Colour

Homepage tokens. Source: `src/styles/home.css`, selector `.sr-home`.

| Token | Value | Same as shared token | Use on the homepage |
|---|---|---|---|
| `--h-paper` | `#f5f9fe` | `--tint-50`, `--paper` | Page ground, calculator card, select background |
| `--h-tone-1` | `#e9eff7` | none. New on the homepage | `.h-tone` sections, odd ledger rows, FAQ items, state chips, result cells |
| `--h-tone-2` | `#d6dee8` | `--tint-100`, `--rule` | Ghost button, pills, hover and open states of tone-1 surfaces |
| `--h-tone-3` | `#b9c3d1` | `--tint-200`, `--rule-strong` | Ghost button on a tone section, pill hover |
| `--h-ink` | `#161e2a` | `--tint-900`, `--ink` | Body text, headings |
| `--h-ink-2` | `#3c4859` | `--tint-700`, `--ink-2` | Secondary text |
| `--h-ink-3` | `#525f71` | `--tint-600`, `--ink-3` | Tertiary text (hero link separators) |
| `--h-navy` | `#161e2a` | `--tint-900`, `--navy` | `.h-dark` sections, masthead head, dark tiles |
| `--h-navy-2` | `#283341` | `--tint-800` | Second dark tone for tiles, ghost button on the closing band |
| `--h-on-dark` | `#f5f9fe` | `--tint-50`, `--cream` | Text on navy and crimson |
| `--h-on-dark-2` | `#d6dee8` | `--tint-100` | Secondary text on navy |
| `--h-on-dark-3` | `#b9c3d1` | `--tint-200` | Tertiary text on navy (`.h-file-label`) |
| `--h-signal` | `#9f1239` | `--signal`, `--focus` | Crimson. Primary button, stats band, rank 01, step numerals, partner pill |
| `--h-signal-2` | `#881337` | `--signal-2` | Crimson hover |

Literal values used in `home.css` without a token:

- `#6a7789` on `.sr-home .form-group select` border. Equals `--tint-500` in `global.css`.
- `#9da9b9` on `body:has(.sr-home) .site-footer .footer-bottom`. Equals `--tint-300`.
- The `body:has(.sr-home)` shell rules use literal `#f5f9fe`, `#161e2a`, `#283341`, `#d6dee8`, `#b9c3d1` because the `--h-*` tokens are declared on `.sr-home` and do not reach the header and footer. When promoted, replace these literals with the tokens.

Shared tokens. Source: `src/styles/global.css`, selector `:root`.

- Tint ramp: `--tint-50: #f5f9fe`, `--tint-100: #d6dee8`, `--tint-200: #b9c3d1`, `--tint-300: #9da9b9`, `--tint-400: #8390a2`, `--tint-500: #6a7789`, `--tint-600: #525f71`, `--tint-700: #3c4859`, `--tint-800: #283341`, `--tint-900: #161e2a`, `--tint-950: #060b13`.
- Aliases: `--ink` (900), `--ink-2` (700), `--ink-3` (600), `--paper`, `--sheet`, `--sheet-2`, `--cream` (all 50), `--rule` (100), `--rule-strong` (200), `--navy` and `--navy-2` (both 900).
- Accent: `--signal: #9f1239`, `--signal-2: #881337`, `--focus: #9f1239`.
- Link: `--link: #1e3a5f`. Link hover is `--signal`.
- Footer ground: `--tint-950` (`.site-footer`). Meta `theme-color` in `Layout.astro` is `#161e2a`.

Contrast note carried in `global.css`: tint-500 is 4.31:1 on tint-50, tint-600 passes 4.5:1. Do not use anything lighter than `--h-ink-3` for text on paper.

### 1.2 Fonts

- Serif, headings and numerals: `--h-serif: "Newsreader", "Iowan Old Style", Georgia, serif` (`home.css`, `.sr-home`). Same stack as `h1, h2, h3, .serif` in `global.css`, which also sets `font-optical-sizing: auto`.
- Sans, body and UI: `"IBM Plex Sans", "Helvetica Neue", Helvetica, Arial, sans-serif` (`global.css`, `body`). The homepage does not redeclare it.
- Fonts load from `/fonts/fonts.css`, linked in `Layout.astro`, with a preload for `/fonts/ibm-plex-sans-normal-400-latin.woff2`. Do not add font files, weights, or a third family.
- Weights used on the homepage: Newsreader 500 for `h1`, `h2`, and large numerals. Newsreader 600 for `h3` and names. Sans 600 for notes, labels, and buttons.
- Large numerals use `font-variant-numeric: lining-nums`.

### 1.3 Type scale

Source: `src/styles/home.css`, selector `.sr-home`, plus the `@media (min-width: 700px)` override.

| Token | Value | At 700px and wider | Use |
|---|---|---|---|
| `--h-fs-xl` | `clamp(4.5rem, 10.4vw, 9.5rem)` | same | Rank 01 numeral, stat numerals at 900px and wider |
| `--h-fs-h2` | `clamp(1.8rem, 7.4vw, 2.5rem)` | `clamp(2.5rem, 4.2vw, 3.75rem)` | Every `h2` |
| `--h-fs-lead` | `clamp(1.375rem, 1.9vw, 1.75rem)` | same | `h3`, standfirst, card names |
| `--h-fs-sub` | `1.25rem` | same | FAQ question, masthead names, state code |
| `--h-fs-body` | `1.0625rem` | `1.125rem` | Body |
| `--h-fs-small` | `0.9375rem` | same | Notes, labels, pills, signals, bylines |
| `--h-num-pad` | `0.16em` | same | Top padding on Newsreader numerals set at `line-height: 0.8` |

Heading rules (`home.css`):

- `.sr-home h1, .sr-home h2`: serif, weight 500, `letter-spacing: -0.035em`, `text-wrap: balance`, `color: inherit`.
- `.sr-home h1`: `line-height: 0.98`. Size comes from `.h-t1` and `.h-t2`:
  - `.h-t1`: `clamp(2.5rem, 11.6vw, 4.5rem)`, then `clamp(2.8rem, 6.5vw, 6rem)` at 700px and wider.
  - `.h-t2`: `clamp(1.35rem, 5.9vw, 2.25rem)` with `line-height: 1.08`, `letter-spacing: -0.03em`, then `clamp(1.7rem, 3.95vw, 3.65rem)` with `line-height: 1.04` at 700px and wider.
- `.sr-home h2`: `var(--h-fs-h2)`, `line-height: 1.02`.
- `.sr-home h3`: serif, weight 600, `var(--h-fs-lead)`, `letter-spacing: -0.025em`, `line-height: 1.12`, `text-wrap: balance`.
- `.h-note` (margin note, replaces the uppercase `.kicker`): `var(--h-fs-small)`, weight 600, `line-height: 1.4`, no uppercase, no letter spacing, `margin-bottom: 8px`.
- `.h-standfirst`: serif, weight 500, `var(--h-fs-lead)`, `line-height: 1.26`, `letter-spacing: -0.015em`, `max-width: 62ch`.
- Body copy blocks: `line-height: 1.55`, colour `--h-ink-2`, `max-width: 34rem` (side text) or `30rem` (column text).
- Large numerals (`.h-stat strong`, `.h-steps li::before`, `.h-series-mark b`, `.h-mast-count strong`): serif 500, `clamp(4.5rem, 7.4vw, 6.75rem)` or `--h-fs-xl`, `line-height: 0.8`, `padding-top: var(--h-num-pad)`, `letter-spacing` from `-0.04em` to `-0.055em`.

Shared scale still in force on unmigrated pages (`global.css`): `body` `1.0625rem` at `line-height: 1.6`. `.page-hero h1` `clamp(2.3rem, 4.6vw, 3.8rem)`. `.section-head h2` `clamp(2rem, 3.4vw, 2.85rem)`. `.prose h2` `1.85rem`, `.prose h3` `1.3rem`, `.prose p, .prose li` `1.05rem`. `.kicker` `0.72rem`, uppercase, `letter-spacing: 0.16em`.

### 1.4 Spacing and layout

Source: `src/styles/home.css`.

- Page margin: `--h-m: clamp(20px, 4vw, 56px)`.
- Column gutter: `--h-gut: clamp(20px, 2.4vw, 36px)`.
- Max content width: `--h-max: 1328px`.
- Wrapper `.h-wrap`: `width: min(var(--h-max), calc(100% - 2 * var(--h-m)))`, centred.
- Grid `.h-grid`: one column below 900px. `repeat(3, minmax(0, 1fr))` at 900px and wider. `column-gap: var(--h-gut)`.
- Section rhythm `.h-section`: `padding-block: clamp(72px, 10vw, 152px)`.
- Stats band: `padding-block: clamp(44px, 6vw, 84px)`.
- Head to content gap: `clamp(40px, 6vw, 88px)` (points, file rows), `clamp(36px, 5vw, 72px)` (steps, series), `clamp(32px, 5vw, 72px)` (ledger), `clamp(20px, 3vw, 44px)` (states, calculator, FAQ list).
- Tight gaps between filled tiles: `4px` (`.state-grid`, `.h-faq-list`, `.result-details`).
- Ledger bleed: `--h-bleed: min(24px, var(--h-m))`, declared on `.h-ledger`.
- Breakpoints in use: 560px, 600px, 640px, 700px, 900px, 1100px. The three-column axis starts at 900px.
- Minimum touch heights: buttons `52px`, select `56px`, FAQ question `64px`, state chip `64px`, masthead line `76px`, text link `44px`.

Shared values (`global.css`): `--header-h: 68px`, `--space: 8px`, `.wrap` `min(1120px, calc(100% - 48px))` and `calc(100% - 32px)` at 768px and below, `.section` `padding: 88px 0`. On the homepage the shell widens to `--h-shell-wrap: min(1328px, calc(100% - 2 * clamp(20px, 4vw, 56px)))` (`body:has(.sr-home)`).

### 1.5 Radii

There are no radius tokens. No rule in `home.css` sets a radius. `global.css` sets `border-radius: 0` on form fields. Everything is square. Do not add rounded corners.

### 1.6 Shadows

There are no shadow tokens and no drop shadows. The only shadow in the system is the preferred-partner edge:

- `global.css`: `.agency-card.preferred { box-shadow: inset 3px 0 0 var(--signal); }`
- `home.css`: `.sr-home .agency-card.preferred { box-shadow: inset 6px 0 0 var(--h-signal); }`

Use the homepage value (6px) on migrated pages. Do not add any other shadow.

### 1.7 Borders

The homepage removes hairlines (`border: 0` on cards, pills, chips, FAQ items, result cells, calculator card, header, trust bar, footer bottom). Separation comes from tone steps. The one border kept is the select outline: `1px solid #6a7789`, which becomes `var(--h-ink)` on hover.

### 1.8 Motion

Source: `src/styles/home.css`.

- Easing: `--h-ease: cubic-bezier(0.16, 1, 0.3, 1)`.
- Keyframes: `h-rise` (translateY 105% to none), `h-fade-up` (opacity 0 and translateY 18px to none), `h-fade` (opacity 0 to 1).
- Control feedback:
  - `.btn`: `transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s var(--h-ease)`. `:active` moves `translateY(1px)`.
  - Surfaces (`.agency-card`, `.faq-item`, `.pill`, masthead lines): `background-color 0.2s ease`.
  - State chips and selects: `0.18s ease` on background, colour, border.
  - Numerals and arrows on hover: `transform 0.35s var(--h-ease)` to `translateX(6px)` (ranks), `translateX(8px)` (series letter). Arrow spans in `.text-link` and `.h-mast-more`: `transform 0.3s var(--h-ease)` to `translateX(6px)`.
  - FAQ plus sign: `transform 0.25s var(--h-ease)`. Rotation of 45deg when open comes from `global.css`.
- Entrances, all inside `@media (prefers-reduced-motion: no-preference)`:
  - Headline lines: `h-rise 0.9s var(--h-ease) both`, second line delayed `0.11s`.
  - Masthead tiles: `h-fade 0.7s ease both`, delays `0.08s` to `0.4s` in `0.08s` steps.
  - Hero body: `h-fade-up 0.8s var(--h-ease) both`, delay `0.35s` or `0.45s`.
  - Scroll reveal `.h-reveal`: starts at `opacity: 0; transform: translateY(24px)`, transitions `0.7s var(--h-ease)` on both, with stagger `--h-d` of `80ms`, `160ms`, `240ms`. Becomes visible with `.is-in`.
- Calculator result: `animation: h-fade-up 0.6s var(--h-ease) both`.

Reveal gating. Content is held back only when the root has class `h-motion`. An inline head script in `index.astro` adds that class only when `IntersectionObserver` exists and `prefers-reduced-motion: reduce` does not match. A second inline script at the end of the page observes `.sr-home .h-reveal` with `rootMargin: '0px 0px -8% 0px'` and `threshold: 0.08`, adds `is-in`, then unobserves. Without JavaScript everything is visible.

### 1.9 Reduced motion

Both stylesheets handle it. Keep both.

`home.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .sr-home *,
  .sr-home *::before,
  .sr-home *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

`global.css`:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .agency-card, .btn, .faq-q span, .mobile-cta { transition: none; }
}
```

Gap to close when promoting: the `home.css` rule only covers descendants of `.sr-home`. The promoted stylesheet must carry the same rule under its own scope. Add exactly this, using the scope class from section 2:

```css
@media (prefers-reduced-motion: reduce) {
  body.sr-register *,
  body.sr-register *::before,
  body.sr-register *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

Also keep every entrance animation inside `@media (prefers-reduced-motion: no-preference)`, and keep the `.h-motion` gate on any `.h-reveal` rule. Never hide content by default.

---

## 2. Component catalog

### 2.0 How to promote homepage CSS without touching unmigrated pages

The homepage CSS is safe today because of two scopes: `.sr-home` (a wrapper `div` inside `main`) and `body:has(.sr-home)` (the shell). Other pages need the same isolation while the rollout is in progress.

Use this mechanism. The names in this subsection are new. They do not exist in the repo yet. The first builder (page type 1) creates them. Everything else in this guide is an existing class.

1. **Opt-in prop on the layout.** Add an optional boolean prop to `Layout.astro`, named `register`, default `false`. When true, the `body` gets class `sr-register`. Keep the existing `has-feeder-cta` class logic. When the prop is false the rendered `body` tag must be identical to today.
2. **A second stylesheet.** Create `src/styles/register.css`. Every rule in it starts with `body.sr-register`. Import it in the frontmatter of each migrated template, the same way `index.astro` imports `home.css`. Do not import it from `Layout.astro`. Astro then links it only on migrated pages, and unmigrated pages keep the same CSS bundle hash.
3. **Copy, then re-scope.** Move rules from `home.css` into `register.css` component by component:
   - `.sr-home .x` becomes `body.sr-register .x`.
   - `body:has(.sr-home) .x` becomes `body.sr-register .x`.
   - The token block on `.sr-home` is copied to `body.sr-register`, so header and footer rules can use `var(--h-*)` in place of the literal hex values.
   - Keep the `@media` and `@supports` wrappers exactly as they are.
4. **Leave the homepage alone during rollout.** `home.css` and `index.astro` stay as they are until all templates are migrated. Duplicated rules are acceptable for that period.
5. **Last step, after every template is migrated.** Fold `register.css` into `global.css`, drop the `body.sr-register` prefix, remove the prop, and reduce `home.css` to the homepage-only parts (masthead, stats band, file rows, steps, series tiles). This is a separate PR. It is optional and needs owner sign-off.

A body class is preferred over `body:has(...)` for inner pages. The homepage report notes that browsers without `:has()` get the old shell. A class on `body` has no such gap.

Check after every change: run `npm run build` and compare the output of unmigrated pages with a build of the base branch. They must be byte-identical.

### 2.1 Grid, wrapper, and section head

Classes: `.h-wrap`, `.h-grid`, `.h-head`, `.h-side`, `.h-note`, `.h-section`, `.h-tone`, `.h-dark`.

Markup to reuse (from `index.astro`):

```html
<section class="h-section">
  <div class="h-wrap h-grid h-head">
    <h2>Heading on the axis</h2>
    <div class="h-side">
      <p class="h-note">Margin note</p>
      <p>Supporting sentence.</p>
    </div>
  </div>
  <div class="h-wrap">...</div>
</section>
```

Behaviour at 900px and wider: the `h2` sits in columns 2 to 3 (`grid-column: 2 / -1`). `.h-side` sits in column 1, spans two rows, with `padding-top: 0.55rem`. Below 900px the heading comes first and the note follows, with `row-gap: 20px`.

When migrating a page, the existing `.kicker` text becomes the `.h-note` text. Use the same words. Only the styling changes (sentence case is a CSS change here because the source text is already sentence case. Do not retype it).

### 2.2 Section bands

| Class | Ground | Text | Notes |
|---|---|---|---|
| `.h-section` | paper | `--h-ink` | Default |
| `.h-section.h-tone` | `--h-tone-1` | `--h-ink` | Ghost buttons step to `--h-tone-3` |
| `.h-section.h-dark` | `--h-navy` | `--h-on-dark`, body `--h-on-dark-2` | Focus outline switches to `--h-on-dark` |
| `.h-stats` | `--h-signal` | `--h-on-dark` | Counts only. Focus outline switches to `--h-on-dark` |

Rules: alternate bands, never place two navy or two crimson bands in a row, and use the crimson band at most once per page. On inner pages most sections stay on paper. Use `.h-tone` for one supporting block (for example the calculator or a call box).

### 2.3 Hero

Homepage hero classes: `.h-hero`, `.h-hero-title`, `.h-t1`, `.h-t2`, `.h-mast` and children, `.h-hero-body`, `.h-standfirst`, `.h-bestfor`, `.h-hero-side`, `.h-hero-links`.

The masthead mosaic (`.h-mast`, `.h-mast-head`, `.h-mast-count`, `.h-mast-lines`, `.h-rank`, `.h-mast-name`, `.h-mast-score`, `.h-mast-more`) is homepage only. Do not copy it to inner pages.

Inner pages currently use this hero (same shape on every template):

```html
<section class="page-hero">
  <div class="wrap">
    <p class="kicker">...</p>
    <h1>...</h1>
    <p>...</p>
    <AuthorBio />
  </div>
</section>
```

Restyle it as an inner-page register head, using the homepage parts:

- Wrapper: `.h-wrap h-grid`, with top padding from `.h-hero-title` (`clamp(28px, 5vw, 60px)`) and bottom padding from `.h-hero-body` (`clamp(56px, 8vw, 120px)` is the ceiling. Inner heroes may use the `.h-head` gaps and let the next section supply the space).
- `h1`: serif 500, `letter-spacing: -0.035em`, `line-height: 0.98`, `text-wrap: balance`, on the axis (`grid-column: 2 / -1` at 900px and wider). Size:
  - Hub pages with a short `h1`: the `.h-t1` clamps.
  - Profiles, guides, legal, and any page with a long or data-driven `h1`: keep the existing `.page-hero h1` clamp from `global.css`, `clamp(2.3rem, 4.6vw, 3.8rem)`, and remove its `max-width: 16ch` so the title can run across columns 2 to 3.
- Kicker: restyle as `.h-note` in column 1.
- Intro paragraph: `.h-standfirst` on the axis.
- `AuthorBio`: column 3, second row, with the homepage overrides (`.sr-home .author-bio` and its `.kicker`, `.byline`, `p:last-child` rules: no top border, `max-width: 34rem`, small text).
- Buttons, where the template already has a `.btn-row`: column 1 under the note, as in `.h-hero-side`.
- `.dates` lines (bond and state profiles, guides): keep the text. Set in `--h-fs-small`, colour `--h-ink-2`, under the standfirst.

Do not add the `h-rise` headline animation to inner pages unless the `h1` is split into `span` wrappers as on the homepage. A plain `h-fade-up` on the hero body is enough, inside the no-preference media query.

### 2.4 Buttons

Classes (all existing): `.btn`, `.btn-brass`, `.btn-stamp`, `.btn-ghost`, `.btn-row`, `.btn.full`, `.nav-cta`, `.text-link`.

Homepage overrides to promote (`home.css`, "Buttons" block):

- `.btn`: `min-height: 52px`, `padding: 14px 22px`, `font-size: 1.0625rem`, transition as in 1.8, `:active` `translateY(1px)`.
- Primary (`.btn`, `.btn-brass`, `.btn-stamp`): crimson fill from `global.css`, hover `--signal-2`. Unchanged.
- `.btn-ghost`: filled, not outlined. `background` and `border-color` `--h-tone-2`, text `--h-ink`. Hover: navy fill, `--h-on-dark` text. On `.h-tone`: `--h-tone-3`.
- `.btn-ghost` on the navy closing band: `#283341` fill (`--h-navy-2`). Hover: paper fill, ink text.
- Below 560px, buttons in a `.btn-row` go full width (`flex: 1 1 100%`).
- `.text-link` with an arrow: wrap the arrow in `<span aria-hidden="true">`. The span slides `translateX(6px)` on hover.

Do not rename button classes. `.btn-brass` is the primary button name used across templates.

### 2.5 Nav (header)

Markup: `Layout.astro`, `header.site-header#site-header` with `.wrap.header-bar`, `a.brand`, `button.nav-toggle`, `nav.nav-links#nav-links`, `a.nav-cta`. Base CSS: `global.css`.

Homepage overrides to promote (`home.css`, "Shared shell" block):

- `.site-header .wrap` width becomes `--h-shell-wrap`.
- `.site-header { border-bottom: 0; }`
- `.site-header .brand`: paper plate. `align-self: stretch; background: #f5f9fe; padding: 0 14px; min-height: var(--header-h);`
- `.site-header .brand img { height: 54px !important; }`. The `!important` is needed because the `img` carries an inline `style` height in `Layout.astro`. Leave that inline style in place while unmigrated pages exist.

Keep: the six nav links and their labels and order, the `aria-label="Primary"`, `aria-expanded` and `aria-controls` on the toggle, the toggle script, the skip link, and `position: sticky`.

### 2.6 Trust bar

Markup: `.trust-bar` inside `main` in `Layout.astro`. It prints the `updatedLabel`. Homepage overrides: paper ground, `border-bottom: 0`, `font-size: 0.9375rem`, wrap padding `10px` top and bottom, width `--h-shell-wrap`. Keep the text and the `updatedLabel` and `dateModified` props that bond and legal pages pass.

### 2.7 Closing band

Markup: `section.cta-band` in `Layout.astro`, rendered when `feeder` is false. Homepage overrides (`body:has(.sr-home) .cta-band ...`):

- `padding-block: clamp(72px, 10vw, 152px)`.
- `.wrap` becomes a grid. Three columns at 900px and wider.
- `h2` on the axis in the `--h-fs-h2` sizes, weight 500, `letter-spacing: -0.035em`, `line-height: 1.02`.
- `.kicker` restyled as a margin note in column 1: `0.9375rem`, weight 600, no uppercase, paper colour.
- Paragraph `#d6dee8`, `1.0625rem` then `1.125rem` at 700px and wider.
- Buttons as in 2.4. Focus outline paper.

The band's copy contains the preferred-partner label and the phone number. Do not edit it. Feeder pages do not render this band. Keep it that way.

### 2.8 Footer

Markup: `footer.site-footer` in `Layout.astro` with `FooterArt`, `.footer-grid`, `.footer-links`, `.footer-label`, `.footer-note`, `.footer-bottom`. Homepage overrides:

- Width `--h-shell-wrap`.
- `.brand`: `display: inline-flex; background: #f5f9fe; padding: 10px 16px;` (paper plate for the lockup).
- `.footer-label`: `0.9375rem`, no uppercase, no letter spacing, paper colour.
- `.footer-note`: `margin-top: 6px; font-size: 0.9375rem; color: #b9c3d1;`
- `.footer-bottom`: `border-top: 0; padding-top: 8px; font-size: 0.875rem; color: #9da9b9;`

Keep: every footer link, the feeder variants of the note and the second register link, the skyline art, the copyright line, and the licensed-agents line.

### 2.9 Mobile bar

Markup: `.mobile-cta` in `Layout.astro` (non-feeder), and `.guide-sticky` in the feeder guide. Homepage override for `.mobile-cta`: solid `#161e2a`, `border-top: 0`, no backdrop filter, focus outline paper. Apply the same treatment to `.guide-sticky` on the feeder guide. Keep the hide-on-intersect script and the `body` bottom padding rules in `global.css`.

### 2.10 Cards: the ledger

Component: `src/components/AgencyCard.astro`. Classes: `.agency-card`, `.agency-card.preferred`, `.rank-plate`, `.card-body`, `.card-meta`, `.pill`, `.pill.seal`, `.rank-reason`, `.signals`. Container on the homepage: `.h-ledger`. Container on inner pages: `.ledger`.

Do not edit `AgencyCard.astro` markup, its `data-*` attributes, or its text. The agencies hub filter script reads `data-kind`, `data-categories`, `data-states`, `data-nationwide`, and `data-search`. Restyle with CSS only.

Homepage treatment to promote (`home.css`, "The register" block):

- Card: grid, `padding: clamp(22px, 2.6vw, 34px) var(--h-bleed)`, transparent, no border, no shadow. Odd rows `--h-tone-1`. Hover and focus `--h-tone-2`. Focus outline offset `-4px`.
- At 900px and wider: three columns. Rank and kind in column 1, name and tagline on the axis in column 2, signals stacked in column 3. `.card-body` uses `display: contents`.
- `.rank-plate strong`: weight 500, `clamp(2.75rem, 4.2vw, 3.75rem)`, slides `translateX(6px)` on hover. `.rank-plate span`: small, sentence case, `--h-ink-2`.
- `.pill`: no border, `--h-tone-2` fill, `--h-fs-small`, `padding: 3px 9px`. Steps to `--h-tone-3` on card hover.
- `.pill.seal` (the preferred-partner label): solid `--h-signal` with `--h-on-dark` text. The label text is unchanged.
- `.agency-card.preferred`: `box-shadow: inset 6px 0 0 var(--h-signal)`. Rank numeral in `--h-signal`.
- `.rank-reason`: `--h-signal`, `--h-fs-small`.
- `.signals`: `--h-fs-small`, first item weight 600 in `--h-ink`.

Two things to handle when the container is `.ledger` and not `.h-ledger`:

1. `--h-bleed` is declared on `.h-ledger`. Declare it on `.ledger` too (`--h-bleed: min(24px, var(--h-m))`) and apply the same negative inline margin, and remove the `.ledger` background and top border from `global.css` within the `body.sr-register` scope.
2. On the agencies hub, the filter script hides cards with `display: none`. Odd and even banding by `:nth-child` will then be uneven. On that page use one ground for every card (`--h-tone-1`) with a `4px` gap between cards, the same pattern as `.h-faq-list`. Do not change the filter script.

The bonds hub reuses `.agency-card` for bond forms with a `.rank-plate` that prints "B" and "Form" and has no `.card-meta`. The three-column layout still works. Column 1 holds only the plate.

### 2.11 Cards: tiles

Existing classes on inner pages: `.tile` (bonds hub, guides hub, agency profile), `.cert` (boxed notes and call boxes), `.grid-2`, `.grid-3`.

Homepage counterpart: `.h-series-tile` with `.h-series-main`, `.h-series-mark`, `.h-series-line`, `.h-series-who`, `.h-series-desk`, in `.h-series-grid`.

Restyle `.tile` as a filled tile:

- No border. Ground `--h-tone-1` or `--h-tone-2`. Padding `clamp(24px, 2.6vw, 36px) clamp(20px, 2.4vw, 32px)`.
- `h3` in `--h-fs-lead`. On hover the `h3` underlines (`text-decoration-thickness: 2px; text-underline-offset: 5px`). Replace the `global.css` border-colour hover.
- `.kicker` inside a tile becomes a small 600 label, as in `.h-series-mark`.
- Navy tiles (`--h-navy`, `--h-navy-2`) are allowed in a set of four, alternating as on the homepage. Switch focus outlines to `--h-on-dark` on navy tiles.
- Grid gap: none (gutterless, as `.h-series-grid`) or `4px` (as the filled matrices). Do not use the `16px` outlined-card gap on migrated pages.

Restyle `.cert` as a flat panel: no border, `--h-tone-1` ground (or `--h-paper` when it sits on a `.h-tone` section, as `.calc-card` does), padding `clamp(22px, 3vw, 44px)`.

The bonds hub series tiles may use the full `.h-series-tile` markup only if no text is added or removed. The homepage splits `cat.ledger` into a word and a letter and prints `cat.whoNeeds`. The bonds hub prints `cat.ledger`, `cat.name`, `cat.headline`, and `cat.summary`. Keep the hub's fields. Style only.

### 2.12 State matrix

Component: `src/components/StatePicker.astro`. Classes: `.state-grid`, `.state-chip`. Do not edit the component.

Promote (`home.css`, "State files"): `gap: 4px`. Three columns below 560px, then `repeat(auto-fill, minmax(132px, 1fr))`. Chip: no border, `--h-tone-1`, `min-height: 64px`, state code in `--h-fs-sub` weight 600. Hover and focus: navy fill, paper code. `global.css` also defines `.state-chip.is-on` with the same navy treatment. Keep it.

### 2.13 Forms

Homepage form: the calculator (`BondCalculator.jsx`), classes `.calc-wrap`, `.calc-card`, `.calc-sub`, `.form-group`, `.calc-result`, `.calc-result-big`, `.calc-result-label`, `.result-details`, `.rd-item`, `.rd-label`, `.rd-value`. It is used on the homepage only. Do not edit the component.

Inner-page form: the register filters on the agencies hub, `.filters#register-filters` with four `label` elements wrapping `select` and `input[type="search"]`.

Apply the homepage field treatment to `.filters`:

- Container: no border. Ground `--h-tone-1`. Keep the flex layout from `global.css`.
- Labels: `--h-fs-small`, weight 600, no uppercase, no letter spacing, `--h-ink` (from `.sr-home .form-group label`).
- `select` and `input`: `min-height: 56px`, `padding: 12px 14px`, `background-color: var(--h-paper)`, `border: 1px solid #6a7789`, `--h-fs-body`, square corners. Hover: border `--h-ink`, ground `--h-tone-1` (use `--h-paper` to `--h-tone-2` if the container itself is tone-1, so the hover is visible).
- Focus: the global `:focus-visible` outline, `2px solid var(--focus)` with `outline-offset: 3px`. Do not remove it.

Keep each `label` wrapping its control, every `name` attribute, every option value and label, the placeholder text, and the element ids `register-filters`, `register-count`, `register-list`.

### 2.14 Tables

The homepage has no table. Inner pages use `.table` inside `.table-scroll` (`global.css`), plus page-scoped variants in template `<style>` blocks: `.cost-table` (bond profile, credit guide) and `.bond-table` (state profile, with a stacked mobile layout driven by `data-label`).

Derive the table style from homepage patterns. Use only these values:

- Header cells: `--h-fs-small`, weight 600, `--h-ink`, no uppercase, no letter spacing. This is the same change the homepage makes to `.rd-label` and `.form-group label`.
- Rows: remove the `border-bottom` hairline. Band odd body rows with `--h-tone-1`, as the ledger does. On a `.h-tone` section, band with `--h-tone-2`.
- Cell padding: keep `12px 10px` from `global.css`, or use `14px 16px` from `.rd-item`.
- Numerals in cost columns: `font-variant-numeric: lining-nums`.
- Links in cells keep the `--link` colour and underline.

Keep: `caption` elements (including `.sr-only` captions), `scope` attributes, `data-label` attributes, the `.table-scroll` wrapper, and the stacked mobile layout of `.bond-table`. The `.bond-table` mobile `td::before` label takes the same small 600 sentence-case treatment. `.sr-only` is defined inside template `<style>` blocks. Leave those definitions where they are.

### 2.15 FAQ

Classes (existing, used on the homepage, FAQ page, bond profiles, state profiles, and the feeder guide): `.faq-stack`, `.faq-item` (a `details`), `.faq-q` (a `summary`), `.faq-a`, `.faq-foot`, `.faq-intro`. Homepage list container: `.h-faq-list`.

Markup in use everywhere. Do not change it:

```html
<details class="faq-item">
  <summary class="faq-q">Question<span aria-hidden="true">+</span></summary>
  <div class="faq-a">...</div>
</details>
```

Promote (`home.css`, "Questions"):

- List: `display: grid; gap: 4px`. Apply to `.faq-stack` on inner pages.
- `.faq-item`: no border, `--h-tone-1`. Hover and `[open]`: `--h-tone-2`.
- `.faq-q`: `padding: 18px clamp(16px, 2vw, 26px)`, `--h-fs-sub`, `line-height: 1.2`, `min-height: 64px`, focus offset `-4px`.
- Plus sign: inherits the serif, weight 500, `--h-fs-lead`, `--h-ink`, rotates 45deg when open.
- `.faq-a`: `padding: 0 clamp(16px, 2vw, 26px) 22px`, `--h-ink`, `line-height: 1.55`.

The FAQ stays an accordion built on `details`. Answers come from data with `set:html`. Do not edit the data. Keep every `FAQPage` JSON-LD block byte for byte.

### 2.16 Prose

Classes: `.prose`, `.prose-wide`, `.pull`, `.source-list`, `.related-links`, `.note`, `.disclaimer`, `.byline`, `.dates`, `.video-frame`, `.video-note`, `.guide-cta`. Base CSS in `global.css`.

The homepage has no long-form block. Apply the type rules only:

- `.prose h2`: serif 500, `letter-spacing: -0.035em`, `line-height: 1.02` to `1.12`, `text-wrap: balance`. Size: keep `1.85rem` on narrow screens. The `--h-fs-h2` scale is for section heads on the axis, not for every subhead in an article.
- `.prose h3`: serif 600, `letter-spacing: -0.025em`, `line-height: 1.12`.
- `.prose p, .prose li`: `--h-fs-body`, `line-height: 1.55`, `--h-ink-2`. Keep `max-width: 42rem`.
- Placement: at 900px and wider the prose column starts on the axis (`grid-column: 2 / -1` of a `.h-wrap h-grid`), and column 1 holds the margin note or stays empty.
- `.note`, `.disclaimer`: remove the top and bottom hairlines. Use a `--h-tone-1` ground with `padding: 14px 16px` (from `.rd-item`), `--h-fs-small`.
- `.pull`: keep the `2px` crimson left rule from `global.css`. It is the one accent rule in the prose system.
- `.source-list` and `.related-links`: keep as lists. Keep the 44px minimum link height on small screens set in the template `<style>` blocks.

### 2.17 Margin-note stats

Inner pages use `.stat-row` (bond profile) with hairline dividers. Restyle with the homepage figure treatment: remove dividers, set `strong` in serif 500 with `lining-nums`, set the label in `--h-fs-body`, `line-height: 1.35`. Use the crimson `.h-stats` band at most once per page and only for counts that are already on the page. For in-flow figures use `--h-tone-1` cells with a `4px` gap, as `.result-details` does.

### 2.18 Homepage-only components

These stay on the homepage. Do not reuse them on inner pages without owner sign-off: `.h-mast` masthead mosaic, `.h-stats` four-count band with `.h-stat-trio`, `.h-file-rows`, `.h-steps` stepped list, `.h-points`. The `.h-steps` counter numerals and `.h-series-mark b` letters are generated or derived from data. Do not hand-write numerals or letters into inner pages.

### 2.19 What must survive every component change

- Analytics: the inline Clarity script in the `head` of `Layout.astro`. Do not move, edit, or remove it. Do not add tags.
- SEO: `title`, `meta description`, canonical, Open Graph, Twitter tags, `theme-color`, icons, manifest.
- Schema: the `Organization` and `WebPage` JSON-LD in `Layout.astro`, and every page-level block (`FAQPage`, `Article`, `WebSite`). Pages that pass `includeSchema={false}` keep doing so.
- Accessibility: skip link, one `h1` per page, heading order (`h1`, then `h2`, then `h3`), `aria-label` and `aria-hidden` attributes, table captions and scopes, form labels, alt text, visible focus outlines (paper colour on navy and crimson grounds), touch targets of 44px or more.
- No horizontal overflow at 320, 390, 768, 1000, 1120, 1440, and 1920 px.

---

## 3. Page-type rollout plan

Order matters. Type 1 unblocks all others. After type 1, types 2 to 9 can run in parallel, one PR per type. Every template is an Astro file that generates its leaves at build time. Edit the template, then run `npm run build`. Never edit built output.

Each step list assumes section 2 as the reference for values.

### Type 1. Shared chrome

Files: `src/layouts/Layout.astro`, new `src/styles/register.css`.
Size: **M**. One layout and one new stylesheet, but every later PR depends on it and unmigrated pages must not change. Single template.

1. Add the `register` prop to `Layout.astro` and the `sr-register` body class (section 2.0). Default off.
2. Create `register.css`. Add the token block on `body.sr-register`.
3. Add base type: `h1`, `h2`, `h3`, `.h-note`, body size, from 1.3.
4. Add grid parts: `.h-wrap`, `.h-grid`, `.h-head`, `.h-side`, `.h-section`, `.h-tone`, `.h-dark`.
5. Add buttons (2.4) and `.text-link` arrow motion.
6. Add the shell: header brand plate, trust bar, closing band, footer, mobile bar, and `.guide-sticky` (2.5 to 2.9), re-scoped from the `body:has(.sr-home)` block.
7. Add the inner-page hero rules for `.page-hero` (2.3) and the `.author-bio` overrides.
8. Add the reduced-motion block from 1.9.
9. Do not turn the prop on for any page in this PR, except one low-traffic proof page if the owner agrees (the 404 page is the natural choice).
10. Verify: build passes, all pages byte-identical to the base branch except any proof page. The homepage is unchanged.

### Type 2. Bonds hub

File: `src/pages/bonds/index.astro`.
Size: **S**. One static template, reuses tiles and ledger. Single template.

1. Pass `register` to `Layout` and import `register.css`.
2. Hero: kicker "Bond series" as margin note, `h1` on the axis, intro as standfirst, `AuthorBio` in column 3.
3. Four series tiles: restyle `.tile` in `.grid-2` as filled tiles (2.11). Remove the inline `margin-bottom:36px` only if a class supplies the same gap.
4. "Common forms" head: convert `.section-head` to the `.h-head` layout (kicker to margin note, `h2` on the axis, paragraph in `.h-side`).
5. Form list: ledger bands (2.10) on `.ledger`. Add the ledger and tile rules to `register.css` if type 4 has not already.
6. Verify the "Typical" and "Face" values in `.signals` are unchanged.

### Type 3. Bond profile

File: `src/pages/bonds/[id].astro` (one template, many leaves: category pages, the mortgage broker page, the contract page, and every other bond form).
Size: **L**. 539 lines, several conditional branches (`isMortgage`, `isContract`, `isCategoryPage`), cost tables, FAQ, stat rows, page-scoped `<style>` block, and two `FAQPage` schemas. Edit the template only.

1. Pass `register` and import `register.css`. Keep the `dateModified` and `updatedLabel` props exactly as they are.
2. Hero (2.3). Long `h1` values: use the `.page-hero h1` clamp. Keep the `.dates` line and the two buttons.
3. Prose blocks (2.16). Place on the axis. Replace inline `margin-bottom` styles with classes only where the result is visually equal or better.
4. Tables (2.14): `.table`, `.cost-table`. Restyle inside the template's `<style>` block for scoped variants and in `register.css` for `.table`. Keep captions, scopes, `data-label`, and every link in every cell.
5. `.stat-row` (2.17).
6. FAQ (2.15).
7. `.cost-note`, `.source-list`, `.cost-sources`, `.related-links`: type only. Do not reword notes or reorder sources.
8. Agency ledger at the bottom: ledger bands (2.10).
9. Check four leaves after build: one category page, the mortgage broker page, the contract page, and one plain bond form. Compare every number, rate, date, and source link with the base build.

### Type 4. Agencies hub

File: `src/pages/agencies/index.astro`.
Size: **M**. Short template, but it holds the full register, the filter form, and a client script that depends on the card markup. Single template.

1. Pass `register` and import `register.css`.
2. Hero (2.3). The kicker prints the desk count from data. Keep the expression.
3. The `.cert` ordering note: flat panel (2.11). Keep the text and the methodology link.
4. Filters (2.13).
5. `#register-count`: restyle `.disclaimer` as a tone note (2.16). The script rewrites its text. Do not change the id or the sentence.
6. Register list: single-tone cards with a `4px` gap (2.10, point 2), three-column card layout at 900px and wider.
7. Test the filters after build: state, bond series, kind, and search. The count line must update and hidden cards must leave no gaps.
8. Confirm card order and every rank number match the base build.

### Type 5. Agency profile

File: `src/pages/agencies/[slug].astro` (one template, one leaf per agency).
Size: **M**. 159 lines, heavy use of inline `style` attributes, a signals table, and partner-specific branches. Edit the template only.

1. Pass `register` and import `register.css`.
2. Hero (2.3). The `.card-meta` pills under the intro take the pill treatment (2.10). `.pill.seal` becomes solid crimson. Its text stays exactly as rendered.
3. Editorial reason `.cert`: flat panel. Keep the "How the register is scored" link.
4. Aside: "Public signals" table (2.14). Keep each signal label, source link, "as of" date, and value. Keep the score and breakdown line for non-partner files exactly as rendered.
5. Call box `.cert`: flat panel on `--h-tone-1`. Buttons per 2.4. Keep both branches (partner and non-partner), every `href`, `target`, and `rel`, the published phone line, and the address line.
6. "Bond series on this file": `.section-head` to `.h-head`, tiles per 2.11.
7. "Typical desks" line and "Sources" list: type only.
8. Replace inline styles with classes where practical. Colour and size must come from tokens.
9. Check after build: the preferred partner's file and two other files. The preferred-partner label, rank, score, and signal values must match the base build character for character.

### Type 6. States hub and state profile

Files: `src/pages/states/index.astro` (hub), `src/pages/states/[state].astro` (one template, 50 leaves).
Size: hub **S** (26 lines, hero plus `StatePicker`). Profile **M** (241 lines, brief with table and FAQ, `StatuteHistory` component, ledger, picker, scoped `<style>` block). Edit templates only.

Hub:

1. Pass `register`, import `register.css`.
2. Hero (2.3).
3. State matrix (2.12), full width (`grid-column: 1 / -1`).

Profile:

1. Pass `register`, import `register.css`.
2. Hero (2.3), with `.dates`.
3. `.prose.state-brief`: prose rules (2.16). `.bond-table` (2.14), including its stacked layout at 720px and below, restyled inside the template's `<style>` block. `.table-note`: small, `--h-ink-2`.
4. FAQ (2.15). Keep the `FAQPage` schema passed through the `head` slot.
5. `StatuteHistory`: this component was not reviewed for this guide. Apply prose and table type rules through CSS. Do not change its markup or text. Read the component before styling it.
6. Series pills (`a.pill` in `.card-meta`): pill treatment, with a hover step to `--h-tone-3`.
7. "Desks on the file" heading: `h2` on the axis. Count sentence unchanged.
8. Ledger bands (2.10). Odd and even banding is fine here because nothing is filtered on the client.
9. "Other states": kicker as margin note, matrix per 2.12.
10. Check three leaves: a state with a brief, a state without one, and a state with statute history.

### Type 7. Guides hub and guide articles

Files: `src/pages/guides/index.astro`, `how-to-find-a-surety-bond-agency.astro`, `how-surety-bonds-work.astro`, `bond-vs-insurance.astro`, `best-surety-bond-companies.astro`, `credit-score-impact.astro`.
Size: hub **S**. The three short articles **S** each (72 to 137 lines, hero plus `.wrap.prose`). `credit-score-impact` **M** (356 lines, cost table, scoped styles, two schemas). `best-surety-bond-companies` **L** (456 lines, feeder layout, video, two tables, picks, FAQ, sticky bar, own Article schema). Six single templates, no generator.

Order: hub, then the three short articles in one PR, then `credit-score-impact`, then `best-surety-bond-companies`.

Hub:

1. Pass `register`, import `register.css`. Hero (2.3).
2. Guide list: filled `.tile` rows with a `4px` gap (2.11). Place the list on the axis and drop the inline `max-width:720px` in favour of the grid. Keep titles, descriptions, order, and links.

Short articles:

1. Pass `register`, import `register.css`. Keep `canonical` props and the `Article` schema.
2. Hero (2.3) with the `.page-hero h1` clamp. Prose on the axis (2.16). `.source-list` type only.

`credit-score-impact`:

1. As above, plus `.cost-table` (2.14) in the template `<style>` block. Keep both JSON-LD blocks, the `.sr-only` caption, and every sourced figure.

`best-surety-bond-companies` (feeder):

1. Keep `feeder` and `includeSchema={false}` on `Layout`. The page must stay free of the closing band and partner branding, as the layout comment requires.
2. Hero: `.page-hero.shortlist-hero`. Keep `.byline` and `.dates`.
3. `.intro`, `.what-is`, `.pick` blocks: these are page-specific classes. Read their rules in the template before restyling. Apply flat tone panels and the type rules. Do not reorder picks.
4. `.cert.guide-cta`: flat panel, buttons per 2.4.
5. `.video-frame`: keep the iframe, its attributes, and `.video-note`. Ground stays navy.
6. Both tables (2.14). Keep the visible captions and every published figure.
7. FAQ (2.15). `.guide-sticky`: solid navy bar (2.9).
8. Check that the shortlist order, ratings, limits, and links match the base build.

### Type 8. FAQ, methodology, about, contact

Files: `src/pages/faq.astro`, `methodology.astro`, `about.astro`, `contact.astro`.
Size: **S** each (48 to 91 lines). **M** as one PR. Four single templates.

FAQ:

1. Pass `register`, import. Hero (2.3). Keep the `FAQPage` schema.
2. Questions: `.faq-stack` on the axis with the banded treatment (2.15). Keep `.faq-foot` and its button.

Methodology:

1. Hero, prose on the axis. Table (2.14). `.source-list` type only.
2. This page states the ranking rules. Change no words, numbers, weights, or order.

About:

1. Hero. `.story-grid`: prose on the axis, `.story-aside` in column 1 or 3 with its `.cert` as a flat panel. Keep `position: sticky` behaviour and the `dl` content.
2. `dt` labels: small 600 sentence-case treatment in place of uppercase tracking.

Contact:

1. Hero. Two `.cert` panels in `.grid-2`: flat panels with a `4px` gap or the grid gutter.
2. Keep the phone number, the published address, the hours line, the email, and every outbound link with its `target` and `rel`. The address on this page is the partner's published business address. Leave it as is. Add no other location.

### Type 9. Legal and utility

Files: `src/pages/privacy.astro`, `src/pages/terms.astro`, `src/pages/404.astro`.
Size: **S**. Hero plus prose on the two legal pages. Hero plus one button on the 404. Three single templates.

1. Pass `register`, import. Hero (2.3) with the `.page-hero h1` clamp.
2. Legal prose on the axis (2.16). Keep the `dateModified` and `updatedLabel` props the legal pages pass. Change no legal text.
3. 404: hero and primary button only. It can serve as the proof page for type 1.

### Close-out (after types 1 to 9 are merged)

Size: **M**. Optional, owner decision. Fold `register.css` into `global.css`, remove the prop and the prefix, trim `home.css` to homepage-only parts, and remove rules in `global.css` that no template uses any more. Verify every page against screenshots from the migrated state.

---

## 4. Guardrails

**Restyle only.** Change layout and style. Change nothing else.

Do not change:

- Facts, prices, premiums, rates, face amounts, dates, "as of" stamps, or update labels.
- Sources, source labels, source links, or their order.
- Product names, company names, agency names, bond names.
- Rankings, rank numbers, scores, score breakdowns, or the order of any list.
- Methodology claims or any wording on the methodology page.
- The preferred-partner label. "Cornerstone Network Preferred Partner", "Cornerstone network partner", "Preferred partner", "Partner", and the `.rank-reason` sentence stay exactly as rendered, on the same elements, for the same agency. Restyle around them.
- Nav items, footer links, legal links, or their labels and order.
- The meaning of any sentence.

Do not add:

- Jeff's name, a personal location, or the text "Hanok Ventures", unless that exact text already appears on the page being edited.
- Invented facts, numbers, testimonials, badges, counts, or claims.
- Em dashes or en dashes in any copy. Use a period, a comma, or a short sentence. ASCII hyphens in class names, paths, and compound terms are fine.
- New tokens, colours, type sizes, radii, shadows, fonts, or component classes beyond this guide. The only new names allowed are the `register` prop, the `sr-register` body class, and `src/styles/register.css` from section 2.0.
- AI images, unless they are photorealistic and very high quality. Never place a lone image on one item of a list. The homepage uses no images beyond the logo. The default for inner pages is no new images.

Keep:

- Analytics exactly as it is in `Layout.astro`. Do not add, move, or remove tags.
- SEO tags: title, description, canonical, Open Graph, Twitter.
- Schema: every JSON-LD block, unchanged.
- Accessibility: skip link, heading order, labels, captions, alt text, `aria` attributes, focus outlines, 44px touch targets, reduced-motion handling (1.9), and full content without JavaScript.
- Client behaviour: nav toggle, mobile bar hiding, register filters, calculator.
- The feeder page's separation from partner branding.

Process:

- Edit templates and shared CSS. Do not hand-edit generated leaves or built output.
- Unmigrated pages must stay byte-identical. Check with a build diff.
- No horizontal overflow from 320px to 1920px.
- Production is unchanged and stays unchanged. Do not deploy, publish, or merge. The owner handles production.
- Work in a draft PR. Report what was checked and what was left alone.

---

## 5. Builder briefs

### Brief for a Cursor CloudAgent

```
Repo: SuretyResearch (Astro). Base branch: fable/homepage-redesign.

Task: restyle ONE page type to match the homepage redesign.
Page type: <name the type and its files from DESIGN-SYSTEM.md section 3>

Rules:
1. Read DESIGN-SYSTEM.md in the repo root first. Follow it. It is the source of truth,
   together with src/styles/home.css and src/pages/index.astro.
2. Restyle only the named page type. Do not touch other templates. If type 1 (shared
   chrome) is not merged yet and you are not doing type 1, stop and say so.
3. Use the opt-in mechanism in section 2.0: the register prop on Layout, the sr-register
   body class, and src/styles/register.css imported from the template you migrate.
4. Use only tokens, values, and classes listed in DESIGN-SYSTEM.md. No new colours,
   sizes, radii, shadows, or fonts.
5. Keep every guardrail in section 4. Restyle only. Do not change facts, prices, dates,
   sources, product names, rankings, methodology claims, the preferred-partner label,
   nav items, legal links, or meaning. Do not add Jeff's name, a personal location, or
   the text "Hanok Ventures". No em or en dashes in copy. No invented facts.
6. Keep analytics, SEO tags, JSON-LD, and accessibility as they are. Keep reduced-motion
   handling per section 1.9.
7. Edit the template or shared CSS, then run npm run build. Do not hand-edit generated
   pages.
8. Verify: build passes. Pages outside your page type are byte-identical to the base
   branch build. Text, links, and numbers on your pages match the base build. No
   horizontal overflow at 320, 390, 768, 1120, and 1440 px.
9. Open a DRAFT pull request against fable/homepage-redesign (or against master if that
   branch has already been merged). Do not merge. Do not deploy. Production deploys
   belong to the owner.
10. In the PR description list: files changed, checks run, anything left alone on purpose,
    and anything you were unsure about.
```

### Brief for Grok

```
You are restyling one page type of the SuretyResearch site (Astro) so it matches the
homepage redesign on branch fable/homepage-redesign.

Page type: <name the type and its files from DESIGN-SYSTEM.md section 3>

Follow DESIGN-SYSTEM.md in the repo root. Read it fully before editing. Take every
colour, size, spacing, and motion value from that file or from src/styles/home.css.
If a value is not there, do not use it.

Scope: only the named page type. Layout and style only. If shared chrome (type 1) is not
merged and your type is not type 1, stop and report.

How: turn on the register prop for your template, import src/styles/register.css in that
template, and add any missing component rules to register.css under body.sr-register, as
section 2.0 describes. Edit templates, not built pages. Run npm run build.

Guardrails (section 4 has the full list):
- Do not change facts, prices, dates, sources, product names, rankings, scores,
  methodology claims, nav items, legal links, or meaning.
- Do not change the preferred-partner label or which agency carries it.
- Do not add Jeff's name, a personal location, or the text "Hanok Ventures".
- No em or en dashes in copy. No invented facts.
- No new images unless photorealistic and very high quality, and never a lone image on
  one list item.
- Keep analytics, SEO tags, schema, accessibility, and reduced-motion handling.

Before you finish, confirm: the build passes, other page types are byte-identical to the
base build, your pages show the same text, links, and numbers as before, and nothing
overflows horizontally from 320px to 1440px.

Deliver a DRAFT pull request against fable/homepage-redesign (or master if that branch
has merged). Do not merge, publish, or deploy. The owner handles production. Summarise
what changed, what you checked, and what you left alone.
```
