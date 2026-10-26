"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import GetInTouch from "./GetInTouch";

interface PageData {
  file: string;
  title: string;
  place: string;
  tag: string;
  url: string;
}

const PAGES: PageData[] = [
  {
    file: "/plates/plate1-spark.svg",
    title: "Spark — Real-time Dating Platform",
    place: "React · TypeScript · Node.js · MongoDB",
    tag: "Production System · 2025",
    url: "https://spaark.fun",
  },
  {
    file: "/plates/plate2-casa.svg",
    title: "Casa Ananda — Luxury Resort Website",
    place: "Next.js · TypeScript · GSAP · Lenis",
    tag: "Interactive Web Experience · 2025",
    url: "https://casaananda.in",
  },
  {
    file: "/plates/plate3-tvtrac.svg",
    title: "tvtrac. — Media Discovery & Tracking Platform",
    place: "Next.js · TypeScript · Node.js · MongoDB · PWA",
    tag: "Production System · 2025",
    url: "https://tvtrac.fun",
  },
  {
    file: "/plates/plate4-comix.svg",
    title: "Comix — Full-Stack Comic Book E-commerce Platform",
    place: "EJS · JavaScript · Node.js · Express.js · MongoDB",
    tag: "E-commerce Platform · 2025",
    url: "https://comix-3597.onrender.com",
  },
];

const M = PAGES.length;
const TILT_X = 4.5;
const TILT_Y = 7;
const ZOOM_MIN = 0.9;
const ZOOM_MAX = 1.5;

export default function SketchbookPortfolio() {
  const [idx, setIdx] = useState(0);
  const [hintGone, setHintGone] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sb3dRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  // References for animation state
  const turnRef = useRef<{
    dir: "next" | "prev";
    from: number;
    to: number;
    t: number;
  } | null>(null);
  const springRef = useRef<{
    kind: "spring" | "tween";
    target: number;
    v?: number;
    k?: number;
    c?: number;
    from?: number;
    dur?: number;
    e?: number;
    done?: () => void;
  } | null>(null);

  const viewRef = useRef({
    rx: 0,
    ry: 0,
    z: 1,
    trx: 0,
    try_: 0,
    tz: 1,
  });
  const viewActiveRef = useRef(false);

  const dragRef = useRef<{
    dir: "next" | "prev";
    x0: number;
    w: number;
    moved: number;
    vel: number;
    tPrev: number;
  } | null>(null);

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const introOnRef = useRef(false);

  const hideHint = useCallback(() => {
    setHintGone(true);
  }, []);

  const kick = useCallback(() => {
    if (rafRef.current === null) {
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);



  const applyTurn = useCallback((t: number) => {
    if (!sb3dRef.current) return;
    sb3dRef.current.style.setProperty("--t", t.toFixed(4));
    sb3dRef.current.style.setProperty("--shade", Math.sin(Math.PI * t).toFixed(3));
    sb3dRef.current.classList.toggle("past-half", t >= 0.5);
  }, []);

  const layout = useCallback(() => {
    if (bookRef.current && sb3dRef.current) {
      sb3dRef.current.style.setProperty("--bw", `${bookRef.current.clientWidth}px`);
    }
  }, []);

  const buildLeaf = useCallback(
    (dir: "next" | "prev", from: number, to: number) => {
      const leaf = document.createElement("div");
      leaf.className = `sb-leaf ${dir}`;

      // Front face (visible 0° - 90°)
      const f = document.createElement("div");
      f.className = "sb-leaf-face front";
      const fImg = new Image();
      fImg.className = `sb-half-img ${dir === "next" ? "right" : "left"}`;
      fImg.draggable = false;
      fImg.alt = "";
      fImg.src = PAGES[from].file;
      f.appendChild(fImg);

      const fShade = document.createElement("div");
      fShade.className = `sb-leaf-shade ${dir === "next" ? "left" : "right"}`;
      f.appendChild(fShade);

      // Back face (visible 90° - 180°, lands on opposite side)
      const b = document.createElement("div");
      b.className = "sb-leaf-face back";
      const bImg = new Image();
      bImg.className = `sb-half-img ${dir === "next" ? "left" : "right"}`;
      bImg.draggable = false;
      bImg.alt = "";
      bImg.src = PAGES[to].file;
      b.appendChild(bImg);

      const bShade = document.createElement("div");
      bShade.className = `sb-leaf-shade ${dir === "next" ? "right" : "left"}`;
      b.appendChild(bShade);

      leaf.appendChild(f);
      leaf.appendChild(b);
      return leaf;
    },
    []
  );

  const halfEl = useCallback((pos: "left" | "right", i: number) => {
    const d = document.createElement("div");
    d.className = `sb-half ${pos}`;
    const im = new Image();
    im.className = `sb-half-img ${pos}`;
    im.draggable = false;
    im.alt = "";
    im.src = PAGES[i].file;
    d.appendChild(im);

    const shade = document.createElement("div");
    shade.className = `gutter-shade ${pos}`;
    d.appendChild(shade);
    return d;
  }, []);

  const paint = useCallback(() => {
    if (!bookRef.current || !sb3dRef.current) return;
    const book = bookRef.current;
    book.innerHTML = "";

    const turn = turnRef.current;
    if (!turn) {
      const f = document.createElement("div");
      f.className = "sb-full";
      const im = new Image();
      im.src = PAGES[idx].file;
      im.alt = PAGES[idx].title;
      im.draggable = false;
      f.appendChild(im);

      if (PAGES[idx].url) {
        const liveA = document.createElement("a");
        const themeClass = ["spark", "casa", "tvtrac", "comix"][idx] || "";
        liveA.className = `sb-book-live-link ${themeClass}`;
        liveA.href = PAGES[idx].url;
        liveA.target = "_blank";
        liveA.rel = "noopener noreferrer";
        liveA.title = `Visit live: ${PAGES[idx].url}`;
        f.appendChild(liveA);
      }

      book.appendChild(f);
      sb3dRef.current.style.setProperty("--t", "0");
      sb3dRef.current.style.setProperty("--shade", "0");
      sb3dRef.current.classList.remove("past-half");
    } else {
      const next = turn.dir === "next";
      book.appendChild(halfEl("left", next ? turn.from : turn.to));
      book.appendChild(halfEl("right", next ? turn.to : turn.from));
      book.appendChild(buildLeaf(turn.dir, turn.from, turn.to));
      applyTurn(turn.t);
    }

    const prevZone = document.createElement("button");
    prevZone.className = "sb-zone sb-prev";
    prevZone.setAttribute("aria-label", "previous page");

    const nextZone = document.createElement("button");
    nextZone.className = "sb-zone sb-next";
    nextZone.setAttribute("aria-label", "next page");

    book.appendChild(prevZone);
    book.appendChild(nextZone);

    layout();
  }, [applyTurn, buildLeaf, halfEl, idx, layout]);

  const applyView = useCallback(() => {
    if (!sb3dRef.current) return;
    const { rx, ry, z } = viewRef.current;
    sb3dRef.current.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    sb3dRef.current.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    sb3dRef.current.style.setProperty("--zoom", z.toFixed(3));
  }, []);

  const viewSpring = useCallback(() => {
    const e = 0.14;
    let moved = false;
    const view = viewRef.current;
    for (const [k, t] of [
      ["rx", "trx"],
      ["ry", "try_"],
      ["z", "tz"],
    ] as const) {
      const d = view[t] - view[k];
      if (Math.abs(d) > 0.0006) {
        view[k] += d * e;
        moved = true;
      } else {
        view[k] = view[t];
      }
    }
    if (moved) applyView();
    viewActiveRef.current = moved;
    return moved;
  }, [applyView]);

  const setView = useCallback(
    (rx: number, ry: number, z: number) => {
      viewRef.current.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
      viewRef.current.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
      viewRef.current.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
      viewActiveRef.current = true;
      kick();
    },
    [kick]
  );

  const tiltTo = useCallback(
    (cx: number, cy: number) => {
      if (dragRef.current || !bookRef.current) return;
      const r = bookRef.current.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 0.62)));
      const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)));
      setView(-ny * TILT_X, nx * TILT_Y, viewRef.current.tz);
    },
    [setView]
  );

  const animateTo = useCallback(
    (target: number, onDone: () => void, initialVel = 0, stiff = 220, damp = 24) => {
      springRef.current = {
        kind: "spring",
        v: initialVel,
        target,
        done: onDone,
        k: stiff,
        c: damp,
      };
      kick();
    },
    [kick]
  );

  const tweenTo = useCallback(
    (target: number, dur: number, onDone: () => void) => {
      springRef.current = {
        kind: "tween",
        from: turnRef.current ? turnRef.current.t : 0,
        target,
        dur,
        e: 0,
        done: onDone,
      };
      kick();
    },
    [kick]
  );

  const commitTurn = useCallback(
    (initialVel = 0) => {
      const turn = turnRef.current;
      if (!turn) return;
      animateTo(
        1,
        () => {
          const nextIdx = turn.to;
          turnRef.current = null;
          setIdx(nextIdx);
        },
        initialVel,
        220,
        24
      );
    },
    [animateTo]
  );

  const cancelTurn = useCallback(
    (initialVel = 0) => {
      if (!turnRef.current) return;
      animateTo(
        0,
        () => {
          turnRef.current = null;
          paint();
        },
        initialVel,
        220,
        24
      );
    },
    [animateTo, paint]
  );

  const startTurn = useCallback(
    (dir: "next" | "prev", t = 0) => {
      springRef.current = null;
      if (turnRef.current) {
        setIdx(turnRef.current.to);
        turnRef.current = null;
      }
      const from = idx;
      const to = dir === "next" ? (from + 1) % M : (from - 1 + M) % M;
      turnRef.current = { dir, from, to, t };
      paint();
    },
    [idx, paint]
  );

  const step = useCallback(
    (dir: "next" | "prev") => {
      if (turnRef.current) {
        setIdx(turnRef.current.to);
        turnRef.current = null;
      }
      startTurn(dir, 0);
      commitTurn(2.4);
    },
    [commitTurn, startTurn]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i === idx) return;
      if (turnRef.current) {
        turnRef.current = null;
      }
      const fwd = (i - idx + M) % M;
      const back = (idx - i + M) % M;
      if (Math.min(fwd, back) === 1) {
        step(fwd === 1 ? "next" : "prev");
        return;
      }
      setIdx(i);
    },
    [idx, step]
  );

  // Tick loop
  const tick = useCallback(
    (now: number) => {
      rafRef.current = null;
      const dt = Math.min(0.032, (now - lastTimeRef.current) / 1000 || 0.016);
      lastTimeRef.current = now;

      const spring = springRef.current;
      const turn = turnRef.current;

      if (spring && turn) {
        if (spring.kind === "tween") {
          spring.e = (spring.e || 0) + dt;
          const k = Math.min(1, (spring.e || 0) / (spring.dur || 0.3));
          turn.t = (spring.from || 0) + (spring.target - (spring.from || 0)) * k;
          applyTurn(turn.t);
          if (k >= 1) {
            springRef.current = null;
            if (spring.done) spring.done();
          }
        } else {
          const x = turn.t - spring.target;
          spring.v = (spring.v || 0) + (-(spring.k || 220) * x - (spring.c || 24) * (spring.v || 0)) * dt;
          turn.t += (spring.v || 0) * dt;
          if (Math.abs(turn.t - spring.target) < 0.003 && Math.abs(spring.v || 0) < 0.03) {
            turn.t = spring.target;
            springRef.current = null;
            applyTurn(turn.t);
            if (spring.done) spring.done();
          } else {
            applyTurn(turn.t);
          }
        }
      }

      viewSpring();

      if ((springRef.current || viewActiveRef.current) && rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [applyTurn, viewSpring]
  );

  // Initial paint & re-paint on index change
  useEffect(() => {
    paint();
  }, [idx, paint]);

  // Window resize
  useEffect(() => {
    layout();
    const onResize = () => {
      layout();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [layout]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      hideHint();
      step(e.key === "ArrowRight" ? "next" : "prev");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hideHint, step]);

  // Pointer move tilt handler
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tiltTo(e.clientX, e.clientY);
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setView(0, 0, viewRef.current.tz);
    };
    const onBlur = () => setView(0, 0, viewRef.current.tz);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onBlur);
    };
  }, [setView, tiltTo]);

  // Stage pointer drag handling (turning page)
  const onStagePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("a")) return;
    const onBook = target.closest(".sb-zone");
    if (!onBook || introOnRef.current || !bookRef.current) return;
    e.preventDefault();
    hideHint();

    const r = bookRef.current.getBoundingClientRect();
    const dir = (e.clientX - r.left) / r.width > 0.5 ? "next" : "prev";
    startTurn(dir, 0);

    dragRef.current = {
      dir,
      x0: e.clientX,
      w: r.width,
      moved: 0,
      vel: 0,
      tPrev: performance.now(),
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onStagePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.x0;
    drag.moved = Math.max(drag.moved, Math.abs(dx));
    const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.5);
    const t = Math.max(0, Math.min(1, raw));
    const now = performance.now();
    const dt = Math.max(0.001, (now - drag.tPrev) / 1000);
    const prevT = turnRef.current ? turnRef.current.t : 0;
    drag.vel = (t - prevT) / dt;
    drag.tPrev = now;

    if (turnRef.current) {
      turnRef.current.t = t;
      applyTurn(t);
    }
  };

  const onStagePointerUp = () => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    const turn = turnRef.current;
    if (!turn) return;

    if (drag.moved < 10) {
      cancelTurn(0);
      return;
    }
    const vel = Math.max(-6, Math.min(6, drag.vel || 0));
    const go = turn.t > 0.35 || vel > 0.6;
    if (go) commitTurn(vel);
    else cancelTurn(vel);
  };

  return (
    <>
      <div className="wash" aria-hidden="true" />

      {/* Top Header Navigation */}
      <header className="top">
        <a className="name" href="#">
          Achu Asokan
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* 1. Intro & About Section (Placed First) */}
      <section id="about" className="intro-about">
        <div className="about-wrap">
          <div className="about-content">
            <p className="about-kicker">Software Engineer</p>
            <h2 className="about-headline">
              From concept to <em>creation.</em>
            </h2>
            <div className="bio-paras">
              <p className="bio-para">
                I’m Achu, a full-stack developer based in Kerala, working on web and mobile applications. I enjoy exploring new ideas, solving problems, and finding better ways to build things.
              </p>
              <p className="bio-para">
                For me, the best digital experiences are the ones that feel simple to use but have a lot of thought behind them.
              </p>
            </div>

            <div className="about-disciplines">
              <div className="discipline-item">
                <span className="discipline-title">Frontend &amp; Mobile</span>
                <span className="discipline-techs">React · Next.js · Vue.js · TypeScript · TanStack Query · React Native · Expo</span>
              </div>
              <div className="discipline-item">
                <span className="discipline-title">Backend &amp; Systems</span>
                <span className="discipline-techs">Node.js · Express · NestJS · MongoDB · Docker · Socket.io</span>
              </div>
              <div className="discipline-item">
                <span className="discipline-title">Areas of Work</span>
                <span className="discipline-techs">Full Stack Web · Mobile Applications · UI/UX Design</span>
              </div>
            </div>
          </div>
          <div className="portrait-container">
            <img
              className="about-portrait"
              src="/achu.webp"
              alt="Achu Asokan"
            />
            <div className="portrait-lines" aria-hidden="true">
              <svg
                className="painterly-lines-svg"
                viewBox="0 0 280 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="watercolor-rough" x="-10%" y="-100%" width="120%" height="300%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.08 0.5" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                {/* 1. Organic Wavy Painterly Watercolor Line */}
                <path
                  d="M 8 8.0 C 40 7.8, 70 8.8, 105 7.2 C 135 5.2, 165 5.0, 195 6.4 C 212 7.4, 222 9.8, 238 9.8 C 250 9.8, 260 7.8, 272 7.4"
                  stroke="rgba(186, 180, 170, 0.6)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#watercolor-rough)"
                />
                {/* 2. Straight Gold Hairline */}
                <line
                  x1="24"
                  y1="19"
                  x2="256"
                  y2="19"
                  stroke="rgba(223, 183, 118, 0.42)"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll cue down to Projects */}
        <button
          type="button"
          className="hero-down"
          aria-label="scroll down to projects"
          onClick={() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </section>

      {/* Painted watercolor divider */}
      <div className="rule" aria-hidden="true" />

      {/* 2. Interactive Tactile Sketchbook (Placed Down / Below) */}
      <section id="projects" className="hero sketchbook-section">
        <img
          crossOrigin="anonymous"
          className="botany l"
          src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/339abd2c649a11f725af9114/botany-left.png"
          alt=""
          aria-hidden="true"
        />
        <img
          crossOrigin="anonymous"
          className="botany r"
          src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/339abd2c649a11f725af9114/botany-right.png"
          alt=""
          aria-hidden="true"
        />

        <div className="sb-header-label">
          <p className="section-label">P R O J E C T S</p>
        </div>

        <div className="sb-wrap" ref={wrapRef}>
          <div
            className="sb-stage"
            ref={stageRef}
            onPointerDown={onStagePointerDown}
            onPointerMove={onStagePointerMove}
            onPointerUp={onStagePointerUp}
            onPointerCancel={onStagePointerUp}
            onDoubleClick={() => setView(viewRef.current.trx, viewRef.current.try_, 1)}
          >
            <button
              type="button"
              className="sb-arrow left"
              onClick={() => step("prev")}
              aria-label="previous page"
            >
              <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
                <polyline
                  points="11,3 3,22 11,41"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Enlarged tactile sketchbook */}
            <div className="sb-3d" ref={sb3dRef}>
              <div className="sb-tilt">
                <div className="sb-cast ambient" aria-hidden="true" />
                <div className="sb-cast contact" aria-hidden="true" />
                <div className="sb-cast hair" aria-hidden="true" />
                <div className="sb-book" ref={bookRef} />
              </div>
            </div>

            <button
              type="button"
              className="sb-arrow right"
              onClick={() => step("next")}
              aria-label="next page"
            >
              <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
                <polyline
                  points="3,3 11,22 3,41"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className={`sb-hint ${hintGone ? "gone" : ""}`}>
            drag page to turn · use arrow keys or chevron buttons
          </p>
        </div>
      </section>

      {/* Get in Touch & Availability Hub (Replaces Plates & Merges Footer) */}
      <GetInTouch />
    </>
  );
}
