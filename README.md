# This is H

The first version of the website for **H** — infrastructure stewardship for organisations doing good. A single-page, static site for `thisish.org.nz`.

No build step, no framework, no dependencies. Semantic HTML, one CSS file, one small JS file.

---

## 1. File structure

```
.
├── index.html                 the entire site (one page)
├── assets/
│   ├── css/style.css          design system + all styling
│   ├── js/main.js             mobile menu, sticky header, scroll-reveal, accordion behaviour
│   └── img/
│       ├── favicon.svg        placeholder favicon (forest-green square + "H")
│       └── og-image.svg       placeholder social-share image (1200×630)
├── CNAME                      custom domain for GitHub Pages (thisish.org.nz)
├── robots.txt
├── sitemap.xml
└── README.md                  this file
```

The **logo isn't a separate image file yet** — see section 7. It's currently built from HTML + CSS (a coral block containing a script "this is" + bold "H"), reused in the nav, hero and footer as `.logo-mark`. That was a deliberate choice given no logo file was supplied to this session — see section 7 for how to swap in the real one.

---

## 2. Preview it locally

Any static file server works. From this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or, if you have Node:

```bash
npx serve .
```

There's nothing to install or build — you can also just double-click `index.html` to open it directly in a browser, though a local server is more representative (some relative-path and font behaviour differs with `file://`).

---

## 3. Deploying

### Option A — GitHub Pages (simplest, free)
1. Push this repo to GitHub.
2. Settings → Pages → Deploy from branch → pick `main` (or whichever branch holds this code) and the root folder.
3. The `CNAME` file already in this repo tells GitHub Pages to serve the site at `thisish.org.nz` once DNS is pointed at it (section 8).

### Option B — Netlify
1. Drag-and-drop this folder into Netlify, or connect the GitHub repo.
2. Build command: none. Publish directory: `/` (repo root).
3. Add `thisish.org.nz` as a custom domain in Site settings → Domain management.

### Option C — Cloudflare Pages
1. Connect the GitHub repo (or use direct upload).
2. Build command: none. Build output directory: `/`.
3. Add `thisish.org.nz` as a custom domain in the Pages project's Custom domains tab.

Any of the three work well for a static site like this; Cloudflare Pages is a reasonable default if you're also considering moving DNS to Cloudflare.

---

## 4. DNS records for thisish.org.nz

The exact records depend on which host you pick (section 3). As a rule:

**GitHub Pages**
| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<your-github-username>.github.io` |

**Netlify** — Netlify will show you the exact records once you add the domain (typically an `A` record to their load balancer, or a `CNAME`/`ALIAS` at the apex if your DNS provider supports it, plus `www` as a `CNAME` to your `*.netlify.app` subdomain).

**Cloudflare Pages** — if your domain's nameservers are already on Cloudflare, adding the custom domain in the Pages dashboard configures the DNS automatically. If not, Cloudflare will give you the `CNAME`/`A` records to add at your current registrar.

Whichever you choose, add the records at your domain registrar (wherever `thisish.org.nz` is registered) and allow up to 24–48 hours for DNS propagation, though it's usually much faster with `.nz` domains.

---

## 5. Editing guide — where things live

| What | Where |
|---|---|
| Any copy/wording | `index.html` — it's plain text between tags, no templating |
| Email address | Search-and-replace `hello@thisish.org.nz` in `index.html` (appears in the hero, contact section and footer) |
| Navigation links/labels | `<div class="site-nav-panel">` near the top of `index.html` |
| Footer placeholder links (Privacy, Terms, LinkedIn) | `<ul class="footer-legal">` in the footer — currently `href="#"`, replace with real URLs once they exist |
| Brand colours | CSS custom properties at the top of `assets/css/style.css`, under `:root` — `--green`, `--green-deep`, `--pink`, `--pink-deep`, `--cream`, `--ink`, etc. Changing these updates the whole site |
| Fonts | The Google Fonts `<link>` in the `<head>` of `index.html`, and the `--font-display` / `--font-body` / `--font-script` variables in `style.css` |
| Logo | See section 7 below |
| Page title / meta description / social preview text | `<title>` and `<meta name="description">` etc. in the `<head>` of `index.html` |
| Accordion questions & answers ("What can H help with?") | `<div class="problems-list">` in `index.html` — each is a `<details class="problem">` block; add or remove blocks freely, the accordion behaviour is automatic |
| The four core offer cards | `<div class="offer-grid">` |
| The "Why H?" name-meaning section (the cycling "H is Home. / Haumaru. / …" brand moment) | `<section class="why-h" id="why-h">` — the six cycling phrases live in `<div class="h-mark__rotator">`; add, remove or reorder `<span class="h-mark__word">` entries freely (each is `<span class="h-mark__prefix">H is </span><span class="h-mark__value">…</span>`), the CSS crossfade in `style.css` (`.h-mark__word`, `@keyframes h-rotate`) redistributes automatically as long as the `nth-child` animation-delay rules cover the number of phrases present |
| The "Why it matters" copy | `<section class="section-alt" id="why-it-matters">` — the section on why place matters to the people an organisation serves (kept deliberately short; see section 6 below) |

---

## 6. Design decisions (short version)

- **Palette**: warm cream/off-white as the primary background, deep forest green (`--green`, `--green-deep`) as the dominant brand colour, and soft pink (`--pink`, `--pink-deep`) reserved for punctuation — fine rules, small labels, hover states, subtle backgrounds. Pink is never used as a large fill.
- **Type**: Fraunces (a serif) for headings — warm, editorial, human rather than corporate — Inter for body copy (highly legible, neutral), and Caveat used *only* inside the logo lockup for the "this is" script — deliberately not reused elsewhere so it doesn't tip into twee.
- **No photography, no stock imagery, no botanical/decorative illustration, no gradients, no card-heavy layout** — sections lean on typography, rules, and generous whitespace rather than decoration, aiming for a calm, quiet, editorial feel rather than a typical consultancy or SaaS template.
- **The accordion uses native `<details>`/`<summary>`**, not custom JS — it's keyboard- and screen-reader-accessible by default, and still works with JavaScript disabled.
- **All content is visible without JavaScript.** The scroll-reveal fade-in is opt-in: CSS shows every section by default, and only once `main.js` confirms it's actually running does it hide sections for the fade-in effect. If a script fails to load, nothing on the page is ever lost or hidden.
- **One page, deliberately short** — hero, the "Why H?" name-meaning brand moment, problem accordion, support offer, a standalone "Built for the for-purpose sector" statement, one consolidated "Why it matters" section, working-together, contact, footer. Nav links to four of those (Home, Why H, What H helps with, Say hello); the rest are reachable by scrolling. Earlier drafts had more separate sections explaining H (why H / how H works / small by design / philosophy / about) — these were deliberately merged into one "Why it matters" section to keep the page short, quiet and confident rather than over-explained.
- **"Why H?" is deliberately not an acronym.** The name doesn't stand for one fixed thing — it can mean whatever matters to the organisation, place or community H is supporting (Home, Haumaru, Haven, Help, Hapori, and so on). The section right after the hero makes that openness the point, rather than pinning H to one official definition — see `.why-h` in `style.css` and the "Why H?" name-meaning row in the table above.
- **Language**: H is intentionally a one-person organisation, so copy avoids "we"/"our"/"our team" in H's own voice — it uses "H", "you" and "your" instead. (The problem-list questions are written in the visitor's own voice — e.g. "We need to buy a property" — which is a different case and is left as-is.)

---

## 7. Replacing the placeholder logo

No logo file was provided to this build, so the wordmark is currently recreated in HTML/CSS rather than as an image — a forest-green block with "this is" in a script font next to a bold "H" (see `.logo-mark` in `style.css`, used in the nav and footer).

To swap in the real logo file once you have it exported:

1. Export the logo as an **SVG** (preferred, scales cleanly) or a high-resolution PNG with transparent background. Save it to `assets/img/logo.svg` (or `.png`).
2. In `index.html`, there are three places using the CSS-built logo, each looking like this:
   ```html
   <span class="logo-mark logo-mark--hero" aria-hidden="true">
     <span class="logo-mark__script">this is</span><span class="logo-mark__h">H</span>
   </span>
   ```
   Replace each with an `<img>`, e.g.:
   ```html
   <img src="assets/img/logo.svg" alt="This is H" class="logo-mark logo-mark--hero" />
   ```
   (Keep `alt="This is H"` on at least the header and footer instances for accessibility — the current hero one is `aria-hidden` because the `<h1>` right below it already states the brand and headline.)
3. You'll likely want to adjust sizing — the current classes (`logo-mark--nav`, `logo-mark--hero`, `logo-mark--footer`) set a `font-size` that scales the whole CSS lockup; for an `<img>` instead, replace those with `width`/`max-width` rules sized to match (roughly 90px tall in the nav, 200–260px in the hero).
4. Update `assets/img/favicon.svg` and `assets/img/og-image.svg` from the real logo/mark too — those are currently simple recreations for the same reason.

---

## 8. Connecting thisish.org.nz

Once the site is deployed (section 3) and you've chosen a host:

1. Add `thisish.org.nz` (and optionally `www.thisish.org.nz`) as a custom domain in that host's dashboard.
2. Add the DNS records the host gives you (or the GitHub Pages ones in section 4) at your domain registrar.
3. Most hosts (GitHub Pages, Netlify, Cloudflare Pages) issue a free SSL certificate automatically once DNS resolves — this can take a few minutes to a few hours after the records propagate.
4. If you want `thisish.org.nz` to be the canonical URL and `www.thisish.org.nz` to redirect to it (or vice versa), that's a one-line setting in most hosts' domain panel — check your chosen host's docs.

---

## 9. What's deliberately not in this version

Per the brief, this first version does not include: pricing, fixed service packages, a founder bio, a contact form (all contact routes through `mailto:`), testimonials, case studies, or any named clients — all intentional, not oversights, so that nothing on the site implies scale, history, or relationships H doesn't yet have on the public record.

---

## 10. Continuing to edit this with Claude

The code is intentionally plain: one HTML file, one CSS file, one small JS file, no build tooling, no component framework. To make further changes, just point Claude (or any editor) at `index.html` and `assets/css/style.css` directly — there's no compilation step, so changes are visible on refresh.
