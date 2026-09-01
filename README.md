# This is H

The first version of the website for **H** — infrastructure stewardship for organisations doing good. A single-page, static site for `thisish.org.nz`.

No build step, no framework, no dependencies. Semantic HTML, one CSS file, one small JS file.

---

## 1. File structure

```
.
├── index.html                 the homepage, including the "Thinking" teaser section
├── thinking/
│   ├── index.html              the Thinking archive — every published piece, newest first
│   ├── _template/index.html    starting point for a new article (see section 11) — not published, noindexed
│   └── <article-slug>/index.html   one folder per published article, giving it a clean permanent URL
├── assets/
│   ├── css/style.css          design system + all styling
│   ├── js/main.js             mobile menu, sticky header, scroll-reveal, accordion behaviour
│   └── img/
│       ├── favicon.svg        placeholder favicon (forest-green square + "H")
│       ├── og-image.svg       placeholder social-share image (1200×630) for the homepage
│       └── og/                 one social-share image per Thinking page (see section 11)
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
| The "Why H" copy | `<section class="section-alt" id="why-h">` — this is the one section that explains H (kept deliberately short; see section 6 below) |
| The "Thinking" homepage teaser (latest article(s)) | `<section id="thinking">` in `index.html` — see section 11 below for how to add a new entry |
| The Thinking archive (all published articles) | `thinking/index.html` — see section 11 |
| An individual article | `thinking/<slug>/index.html` — see section 11 |

---

## 6. Design decisions (short version)

- **Palette**: warm cream/off-white as the primary background, deep forest green (`--green`, `--green-deep`) as the dominant brand colour, and soft pink (`--pink`, `--pink-deep`) reserved for punctuation — fine rules, small labels, hover states, subtle backgrounds. Pink is never used as a large fill.
- **Type**: Fraunces (a serif) for headings — warm, editorial, human rather than corporate — Inter for body copy (highly legible, neutral), and Caveat used *only* inside the logo lockup for the "this is" script — deliberately not reused elsewhere so it doesn't tip into twee.
- **No photography, no stock imagery, no botanical/decorative illustration, no gradients, no card-heavy layout** — sections lean on typography, rules, and generous whitespace rather than decoration, aiming for a calm, quiet, editorial feel rather than a typical consultancy or SaaS template.
- **The accordion uses native `<details>`/`<summary>`**, not custom JS — it's keyboard- and screen-reader-accessible by default, and still works with JavaScript disabled.
- **All content is visible without JavaScript.** The scroll-reveal fade-in is opt-in: CSS shows every section by default, and only once `main.js` confirms it's actually running does it hide sections for the fade-in effect. If a script fails to load, nothing on the page is ever lost or hidden.
- **One page, deliberately short** — hero, problem accordion, support offer, a standalone "Built for the for-purpose sector" statement, one consolidated "Why H" section, working-together, contact, footer. Nav links to four of those (Home, What H helps with, Why H, Say hello); the rest are reachable by scrolling. Earlier drafts had more separate sections explaining H (why H / how H works / small by design / philosophy / about) — these were deliberately merged into one "Why H" section to keep the page short, quiet and confident rather than over-explained.
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

---

## 11. Adding a new Thinking article

"Thinking" (nav label; the homepage section is introduced as "From H") is H's permanent, editorial home for longer pieces — deliberately not a newsletter archive and not a blog. It follows the same philosophy as the rest of the site: plain HTML, no templating engine, no database. Adding a new piece means touching a small, fixed set of files — the design never needs to change.

Every article folder sits two levels deep (`thinking/<slug>/index.html`), which is why its relative links climb `../../` for the site root and `../` for the Thinking archive — keep that depth for any new article.

**Steps:**

1. **Duplicate the template.** Copy `thinking/_template/index.html` into a new folder, e.g. `thinking/lease-review-basics/index.html`. Use a short, lowercase, hyphenated slug — it becomes the permanent URL, so pick one you're happy to keep.
2. **Fill in the placeholders.** Every `[BRACKETED]` value in the template — title, description, date, category, reading time, body copy — including the `<title>`, meta description, Open Graph/Twitter tags, canonical URL and the JSON-LD `Article` block near the top. Reading time is just a rough word-count/220wpm estimate; no need to be exact.
3. **Delete the noindex line.** The template ships with `<meta name="robots" content="noindex,nofollow" />` so an unfinished copy never gets indexed by mistake. Remove that line once the article is ready to publish.
4. **Add a social image.** Duplicate `assets/img/og/thinking.svg`, save it as `assets/img/og/<slug>.svg`, and swap the title text (and category label) for the new piece. Same dark-green/cream/pink treatment as the rest of the site — no photography needed.
5. **List it in the archive.** In `thinking/index.html`, copy one `<article class="thinking-entry">` block inside `.thinking-list` and fill it in with the same title, date, category, reading time and excerpt, linking to `<slug>/`. Newest goes first.
6. **Update the homepage teaser.** In `index.html`, the `<section id="thinking">` shows at most the three most recent pieces (only the first gets the `thinking-entry--featured` styling). Add the new entry at the top; if there are now more than three, move the oldest of the three out (it's still safe in the full archive).
7. **Add it to `sitemap.xml`.** One `<url>` block with the article's full URL and `<lastmod>`.
8. **Delete the instructional comment** at the very top of the copied file (the one explaining these steps) — it's for the person editing, not for readers.

That's the whole workflow — no build step, no CMS, nothing to redesign. The layout, typography and CTA at the bottom of every article stay identical by design; only the words change.

**Email signup (Kit).** H's website is the permanent home of the writing; [Kit](https://kit.com) (formerly ConvertKit) remains the subscriber list and the thing that actually sends email — nothing here replaces or duplicates that. Every Thinking page reuses the *same* Kit form already embedded on the homepage (`data-uid="7c95191513"`, `https://h-102.kit.com/7c95191513/index.js`) — the archive page has the full-size version, and every article template already ships with a compact one after the "Talk to H" CTA, so there's no extra step when adding a new article. If that form is ever swapped for a different Kit form or list, update the `data-uid`/`src` pair in all four places it appears: `index.html`, `thinking/index.html`, `thinking/_template/index.html`, and any already-published article pages.
