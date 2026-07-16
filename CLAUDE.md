# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## No emojis

Do not use emojis in this codebase or in any output for this project — no checkmarks, sparkles, rockets, or the other decorative emojis AI coding tools tend to sprinkle into code, comments, commit messages, or chat. Keep everything plain text.

## What this is

A personal portfolio website for Mark Gonzalez. It is a **static site** — plain HTML, one CSS file, and one small JS file. There is no build step, no framework, no package manager, and no dependencies to install.

## Tech stack — keep this current

Maintain the table below as the single source of truth for what the site uses and exactly which part of the site each thing powers. **Whenever a library, framework, font, external service, or tool is added, removed, or repurposed, update this table in the same change** — including what it is used for. If something no longer maps to a real part of the site, remove its row.

| Library / tool | Version | Used for |
| --- | --- | --- |
| HTML5 | — | Page structure for `index.html`, `about.html`, `contact.html` |
| CSS3 (`css/style.css`) | — | All styling; theme driven by CSS custom properties in `:root` (dark grey scheme) |
| Vanilla JavaScript (`js/main.js`) | — | Footer year injection; contact-form submit handling (currently simulated); the 3D-models carousel — circular coverflow with auto-advance, focus-scaling, prev/next arrows, hover-pause, driven by the `MODELS` filename array |
| Inline SVG | — | GitHub / LinkedIn icons in the header (no icon library) |
| Raster images (`images/`) | — | Photographs / bitmap assets. Currently `images/mark.png`, the About-page portrait (rendered into the 3:4 `.about-photo` frame via `object-fit: cover`) |
| Project screenshots (`projects/`) | — | Home-page project-card thumbnails. User drops a screenshot here per project; each card's `<img>` points at it and the whole card links out to that project's live site. First entry: `projects/bargain-baskets.png` |
| 3D-model screenshots (`projects/3d-models/`) | — | Images shown in the auto-rotating "3D Models" carousel on the home page. Add a screenshot here, then add its filename to the `MODELS` array in `js/main.js`. The carousel section stays hidden while that array is empty |
| Inter font (self-hosted, `fonts/inter-{400,600,700}.woff2`) | Fontsource build | Primary UI font. Loaded via `@font-face` rules at the top of `css/style.css` (weights 400/600/700, `font-display: swap`); referenced through the `--font` variable, with `system-ui` fallback |
| GitHub Pages + `CNAME` | — | Hosting and the `markgcs.com` custom domain |

No package manager, bundler, or third-party JS/CSS dependencies are in use. If that changes, this section must reflect it.

## Running / previewing

Open the HTML files directly in a browser, or serve the folder over HTTP for accurate relative-path behavior:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`. There are no build, lint, or test commands — none are configured.

## Deployment

- Hosted on **GitHub Pages** from the `spulsion/Personal_Website` repo.
- The `CNAME` file pins the custom domain `markgcs.com`. Do not delete or rewrite it casually — the git history shows the CNAME being accidentally removed and re-added, which breaks the domain.
- Pushing to the default branch publishes the live site. Treat commits to it as production changes.

## Structure & the one thing to watch

Three pages — `index.html` (projects), `about.html`, `contact.html` — each a standalone document. They all share `css/style.css` and `js/main.js`.

**The header (`.site-header`: logo, nav links, GitHub/LinkedIn SVG icons) and footer are copy-pasted into all three HTML files.** There is no templating or includes. When you change nav links, social URLs, or the header/footer, you must edit **every** HTML file to keep them in sync. The only per-page difference in the nav is which link carries the `active` class.

- `css/style.css` — the entire design system. Colors, fonts, and spacing come from CSS custom properties in `:root` (`--bg`, `--text`, `--accent`, `--border`, etc.). Change theme values there rather than hardcoding. Section-by-section comment banners divide the file (Header, Hero, Projects Grid, Interests, About, Contact, Button, Footer, Responsive).
- `js/main.js` — loaded by all pages. Sets the footer year, and wires the contact form. It only touches form logic when `#contactForm` exists, so it's safe on pages without the form.

## Placeholder content still to be replaced

Several parts are scaffolding, not real content — replace rather than assume they work:

- **Project cards** in `index.html` use `href="#"`, placeholder thumbnails, and generic titles/tags.
- **Contact form** submission in `js/main.js` is **simulated** — a `setTimeout` fakes success and no message is actually sent. It must be wired to a real endpoint (the code comments suggest Formspree or a `fetch()` to a form backend) before it works.
- **Resume download** link in `about.html` (`href="#"`) and the About **photo** are placeholders.

## Note: duplicate folder

The parent directory also contains `Personal_Website - Copy`, a separate copy of this repo (with its own `.git`). Work in `Personal_Website` unless told otherwise, and be aware edits do not propagate between the two.
