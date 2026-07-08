# Architecture Decision Records

## ADR-001: Keep React + Vite + Tailwind v4 Stack
**Date:** 2026-07-03
**Status:** Accepted

**Context:** The project was initially built following a YouTube tutorial using React, Vite, GSAP, React Three Fiber, and Tailwind v4. We considered whether to change the core stack.

**Decision:** Keep the existing stack. It's modern, performant, and already works. No value in rebuilding what isn't broken.

**Why this matters (for learning):** A senior engineer doesn't chase new tools for the sake of it. You evaluate: "Does this serve the goal?" If the current tools work, keep them. Energy goes to improving the product, not the plumbing.

---

## ADR-002: Path Aliases via Vite
**Date:** 2026-07-03
**Status:** Accepted

**Context:** Imports like `../../constants` and `../../../store` are fragile and hard to read. When you move a file, every relative import breaks.

**Decision:** Added path aliases in `vite.config.js`: `@components`, `@constants`, `@store`, etc.

**Why this matters (for learning):** Path aliases are resolved at *build time* by Vite — they cost nothing at runtime. They make imports predictable: `@constants` always means `src/constants/`, no matter where the importing file lives. This is standard practice in production codebases.

---

## ADR-003: Content-First Transformation
**Date:** 2026-07-03
**Status:** Accepted

**Context:** The page visually works but reads like Apple's marketing voice. The animations, 3D models, and layout are solid — the content is what needs transformation.

**Decision:** Rewrite all copy first (low effort, max impact), then iterate on animations and interactions in later phases.

**Why this matters (for learning):** In product design, content shapes structure — not the other way around. A designer writes the words first, then designs around them. The best frontend code in the world means nothing if the content doesn't resonate. This is called "content-first design."

---

## ADR-004: SEO and Meta Tags
**Date:** 2026-07-03
**Status:** Accepted

**Context:** The original `index.html` had `<title>macbook_gsap_app</title>` — the default Vite scaffold name. No description, no Open Graph tags.

**Decision:** Added proper title, meta description, and OG tags. Added Google Fonts preconnect for Inter.

**Why this matters (for learning):** Every page on the internet is discovered through search engines and social sharing. The `<title>` tag is what appears in browser tabs and Google results. `og:title` and `og:description` control how your page looks when shared on LinkedIn, Twitter, or WhatsApp. These are free wins that take 5 minutes but affect how 90% of people first encounter your work.

---

## ADR-005: Personal Narrative Over Generic Marketing
**Date:** 2026-07-03
**Status:** Accepted

**Context:** The original copy used generic phrases like "Handles the heavy stuff", "Take a closer look", "Built for creators who code" — all of which could appear on any Apple product page.

**Decision:** Rewrite all copy in Rithwick's first-person voice, including:
- The research journey (ROG Zephyrus G14 comparison, the offline store deal)
- Real-world experience (fans kicked in only twice, all-day battery without charger)
- Actual daily workflow (Brave, DaVinci Resolve, Antigravity IDE, Obsidian, Figma, Terminal)
- Apple R&D context with personal annotations

**Why this matters (for learning):** Authenticity is the ultimate differentiator. Anyone can copy Apple's marketing. Nobody can copy your story. In product design, we call this "voice" — the personality that comes through in every word. Your portfolio should sound like *you talking to a friend*, not a press release.
