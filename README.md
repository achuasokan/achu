# Achu Asokan — Tactile Sketchbook Portfolio

A personal portfolio built with **Next.js 16**, **React 19**, and the **ThreeUI Sketchbook** architecture.

Features:
- **Paper & Ink Atmosphere**: Tactile watercolor ground wash, botanical accents, warm parchment palette (`#ece7dc`), and classic typography (*Instrument Serif* + *Newsreader*).
- **Physical 3D Page Turn**: An 18-strip nested CSS 3D transform chain that curls and bends realistically like real book paper.
- **Interactive Brass Loupe (Magnifying Glass)**: A real draggable magnifier with 2.3x optical zoom and lens refraction to inspect every project detail.
- **3D Tilt & Zoom**: Perspective tilt following cursor movement and smooth spring-physics zoom controls.
- **4 Custom Project Plates**:
  1. **Plate I: Spark** — Full-stack real-time dating application (Next.js 16, Socket.IO, Redux Toolkit).
  2. **Plate II: Casa Ananda** — Cinematic luxury resort landing page (Next.js 16, GSAP 3, Lenis smooth scrolling).
  3. **Plate III: TVTrac** — Real-time television & cinema tracking engine (Next.js 16, TMDB API, Redux Toolkit).
  4. **Plate IV: Comix** — Hardware-accelerated digital comic & manga reader (React 19, HTML5 Canvas, WebGL).
- **Editorial Index**: Interactive plate list allowing instant riffle navigation to any selected project.

---

## Getting Started

### 1. Install Dependencies
In the `portfolio` directory:
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the portfolio.

---

## Instant Preview (No install required)
You can also directly open `public/landing-pages/meng-to-sketchbook.html` in your browser (Google Chrome, Edge, Safari) to interact with the full page turn physics, brass magnifying glass, and project plates immediately.

---

## Architecture (Option 2 — ThreeUI Registered Source)

```
portfolio/
├── app/
│   ├── layout.tsx                      # Root layout with Google Fonts
│   ├── page.tsx                        # Scene configured with <MengToSketchbookLandingPage />
│   └── globals.css                     # Global reset & ThreeUI styles
├── src/
│   └── shaders/
│       ├── threeui.css                 # ThreeUI presentation styles
│       └── landing-pages/
│           ├── LandingPages.tsx         # Component export
│           ├── LandingPageFrame.tsx     # Frame container & customization bridge
│           ├── pageTypography.ts        # Typography controller & dynamic CSS generator
│           └── pageRecipes.ts           # MENG_TO_SKETCHBOOK_TYPOGRAPHY recipe
└── public/
    └── landing-pages/
        ├── meng-to-sketchbook.html      # Canonical source customized for Achu Asokan
        └── meng-to-sketchbook/
            ├── plate1-spark.svg         # Spark Dating Project Plate
            ├── plate2-casa.svg          # Casa Ananda Resort Plate
            ├── plate3-tvtrac.svg        # TVTrac Tracking Platform Plate
            └── plate4-comix.svg         # Comix Reader Platform Plate
```
