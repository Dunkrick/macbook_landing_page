# Frontend Learning Log — Rithwick

> This is your personal reference for every concept you encounter while building this page.
> Think of it as your own documentation — written in YOUR words after you understand something.

---

## Concepts Covered So Far

### 1. JSX — What it is and why React uses it
JSX looks like HTML inside JavaScript, but it's actually syntactic sugar for `React.createElement()`. When you write `<h1>Hello</h1>`, Vite/Babel transforms it into `React.createElement('h1', null, 'Hello')` at build time.

**Why it matters:** It lets you write UI declaratively — you describe WHAT the UI should look like, and React figures out HOW to update the DOM.

---

### 2. Components — The building blocks
Each `.jsx` file exports a function that returns JSX. That function IS the component. `<NavBar />` is just calling the `NavBar()` function and rendering its return value.

**Why it matters:** Components are reusable, testable, and isolatable. Change the NavBar? You only touch one file.

---

### 3. CSS Custom Properties (Design Tokens)
In `index.css`, the `@theme` block defines variables like `--color-primary: #0071e3`. These are your "design tokens" — a single source of truth for colors, fonts, and spacing.

**Why it matters:** Change `--color-primary` once, and every element using it updates automatically. This is how design systems work at scale.

---

### 4. GSAP ScrollTrigger — Making scroll the controller
`ScrollTrigger` connects GSAP animations to scroll position. Instead of animations playing on page load, they play as the user scrolls into a section.

Key concepts:
- `trigger` — the element that triggers the animation
- `start` / `end` — when the animation starts/ends relative to the viewport
- `scrub` — makes the animation follow scroll position (like a scrubber on a video timeline)
- `pin` — pins the element in place while the animation plays

**Why it matters:** Scroll-driven animations create a cinematic, editorial experience. The user controls the pacing.

---

### 5. React Three Fiber (R3F) — 3D in React
R3F is a React renderer for Three.js. Instead of imperative Three.js code (`scene.add(mesh)`), you write declarative JSX (`<mesh>`).

- `<Canvas>` sets up the WebGL renderer, scene, and camera
- `<group>` is like a `<div>` for 3D — a container for grouping objects
- `useGLTF` loads `.glb` 3D model files
- `useVideoTexture` maps a video onto a 3D surface

**Why it matters:** You already use R3F in the Features section — the MacBook model spins and swaps video textures as you scroll. Understanding this puts you ahead of 95% of frontend devs.

---

### 6. Zustand — Simple global state
Zustand creates a store (a shared data container) that any component can read from or write to without prop drilling.

```js
const useMacbookStore = create((set) => ({
    color: '2e2c2e',
    setColor: (color) => set({ color }),
}))
```

Any component calls `useMacbookStore()` to access `color` or `setColor`. When one component changes the color, all components using it re-render automatically.

**Why it matters:** Global state avoids "prop drilling" — passing data through 5 layers of components just to reach the one that needs it.

---

### 7. Path Aliases — Clean imports
Instead of `import NavBar from '../../components/NavBar'`, you write `import NavBar from '@components/NavBar'`.

Configured in `vite.config.js` — resolved at build time, zero runtime cost.

**Why it matters:** Files move, folders restructure. With aliases, your imports don't break.

---

### 8. SEO Meta Tags — How the web discovers you
- `<title>` — shows in browser tab + Google results
- `<meta name="description">` — the snippet under your title in Google
- `og:title`, `og:description` — how your page looks when shared on social media

**Why it matters:** 90% of people will first see your page as a link preview. Make it count.

---

*Add your own notes below as you learn new concepts...*
