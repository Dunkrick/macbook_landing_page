# M3 Pro: One Machine. Everything.
A highly personalized, brutalist landing page built as a creative showcase. It captures my daily workflow as a multidisciplinary creator and engineer using my MacBook Pro M3 Pro (16", 18GB RAM, 512GB SSD).

## The Narrative
Rather than standard Apple marketing copy, this page tells a raw, honest story. 
From tearing through 4K timelines in **DaVinci Resolve**, to laying down tracks in **GarageBand**, iterating UI in **Figma**, running dev servers with **Antigravity IDE**, and rendering 3D scenes in **Blender**.

This machine handles the heavy stuff and breezes through the rest.

## Design System & Aesthetics
Raw, analog street-style aesthetic:
- **Typography:** Heavy condensed slab-serif `Anton` for headers, and `DM Mono` for spec details, body copy, and metadata.
- **Color-Blocked Rhythm:** Alternating full-bleed background colors (Deep Black, Paper White `#f5f2eb`, Electric Blue `#4f5ef7`, and burnt Orange `#e8490f`).
- **Tactile Details:** Screen-print grain overlays (`.bg-grain`), thick sharp borders (`border-4` and `border-6`), and hard-offset flat drop shadows (`shadow-[8px_8px_0px]`).
- **Custom Buttons:** Sticker-style buttons that feature a flat offset shadow which collapses on hover to mimic a real click.

## Tech Stack
- **React.js & TypeScript** - 100% type-safe component architecture (.tsx / .ts)
- **GSAP & ScrollTrigger** - Advanced scroll-bound typography reveals and scroll-linked layout animations
- **Three.js & React Three Fiber (R3F)** - High-fidelity interactive 3D MacBook Pro model rendering
- **Tailwind CSS v4** - Modern styling compiler
- **Vite** - High-speed module bundling

## Key Features
- **3D Model Customizer:** Interactive switches to toggle between 14" and 16" scaling, and real-time color swatches (Space Black and Silver) updating Three.js materials.
- **Exploded Component Scroll:** A scroll-controlled GSAP sequence that spins the MacBook 360° and systematically explodes it into its 5 hardware layers (Liquid Retina XDR screen, Keyboard deck, M3 Pro logic board, Battery modules, and Aluminum shell).
- **Embedded Mask Transition:** A custom, vector-sharp `"M3 PRO."` text-mask container that smoothly zooms in to reveal a full-bleed game-capture video background.
- **Image Scatter Scroll:** A floating showcase of my creative renders that dynamically scatter into a clean board-style layout upon scroll.

## Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dunkrick/gsap_macbook_landing.git
   cd gsap_macbook_landing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

© 2026 Rithwick. Built with passion on a MacBook Pro.
