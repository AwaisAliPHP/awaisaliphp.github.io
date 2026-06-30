# Awais Ali — Developer Portfolio

A fast, modern, single-page portfolio for **Awais Ali**, full-stack software engineer
(Laravel · PHP · React · REST APIs · SaaS). Built from scratch as a static site — no
build step, no framework, no heavy dependencies — so it deploys straight to GitHub Pages.

🔗 **Live:** https://awaisaliphp.github.io/

---

## ✨ Features

- Premium **dark / light** theme with a remembered preference (localStorage)
- Strong hero, animated gradient background, tech marquee
- **Case-study project cards** (with browser-framed screenshots for flagship apps)
- Skills / tech-stack grid, services, experience timeline, contact CTA
- Smooth, **lightweight** scroll-reveal animations + count-up stats (IntersectionObserver)
- Fully **responsive** and keyboard accessible (skip link, focus states, ARIA labels)
- **SEO** ready: meta description, Open Graph + Twitter cards, JSON-LD `Person` schema
- Graceful no-JS fallback

## 📁 Structure

```
awaisaliphp.github.io/
├── index.html                 # All page markup
├── assets/
│   ├── css/styles.css         # Design tokens + all styling
│   ├── js/main.js             # Theme, menu, reveals, counters (vanilla JS)
│   └── img/favicon.svg        # "A" monogram favicon
├── images/
│   ├── profile.jpg            # Hero / about photo  ← swap this to update your photo
│   ├── about.JPG              # Original photo (kept)
│   └── projects/              # Project screenshots used in case-study cards
│       ├── socialrocket.png
│       ├── trackpilot.png
│       └── dsr.png
├── cv/Awais_Ali_PHP_Laravel.pdf
├── favicon.ico
├── _backup_old_portfolio/     # Your previous site (index.html / style.css / script.js)
└── README.md
```

## ▶️ Run locally

It's a static site, so any of these work:

**Option A — just open it**
Double-click `index.html`. (Theme + animations work; some browsers restrict `fetch`,
but this site uses none, so it's fine.)

**Option B — WAMP (you already have it)**
The folder lives in `C:\wamp64\www\awaisaliphp.github.io`, so with WAMP running visit:
```
http://localhost/awaisaliphp.github.io/
```

**Option C — any quick static server**
```bash
# from the project folder
npx serve .          # or:  python -m http.server 8080
```

## 🖼️ Updating your photo

The hero/about image is **`images/profile.jpg`**. Replace that single file with your
preferred professional photo (portrait orientation, ~800×1000px, face near the top works
best) and the site updates everywhere. No code changes needed.

> Tip: the polished grey three-piece-suit studio photo would make an excellent hero —
> just save it as `images/profile.jpg`.

## ✏️ Editing content

- **Text / projects:** edit the relevant `<section>` in `index.html` (sections are clearly
  commented: HERO, ABOUT, SKILLS, WORK, SERVICES, EXPERIENCE, CONTACT).
- **Colors / spacing:** change the CSS variables at the top of `assets/css/styles.css`
  (`--accent`, `--bg`, `--radius`, etc.).
- **Contact details:** search `index.html` for the email / phone / links and update.

## 🚀 Deploy (GitHub Pages)

```bash
git add .
git commit -m "Rebuild portfolio"
git push origin main
```
The repo name `awaisaliphp.github.io` means GitHub Pages serves it automatically at the
live URL above (Settings → Pages → Branch: `main` / root).

---

Designed & built from scratch · © Awais Ali
