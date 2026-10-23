"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface PageData {
  file: string;
  title: string;
  place: string;
  tag: string;
}

const PAGES: PageData[] = [
  {
    file: "/plates/plate1-spark.svg",
    title: "Spark — Real-time Dating Platform",
    place: "Next.js 16 · Socket.IO · Redux",
    tag: "Production System · 2025",
  },
  {
    file: "/plates/plate2-casa.svg",
    title: "Casa Ananda — Luxury Resort Experience",
    place: "Next.js 16 · GSAP 3 · Lenis Scroll",
    tag: "Interactive Web Experience · 2025",
  },
  {
    file: "/plates/plate3-youtube.svg",
    title: "YouTube Video Streaming Client",
    place: "React · REST APIs · Media Player",
    tag: "React Web Application · 2024",
  },
  {
    file: "/plates/plate4-tesla.svg",
    title: "Tesla Automotive Digital Showroom",
    place: "HTML5 · CSS3 · Responsive UI Craft",
    tag: "Editorial Web Platform · 2024",
  },
  {
    file: "/plates/plate5-techno.svg",
    title: "Techno-Web Digital Architecture Hub",
    place: "Clean Architecture · Node.js · Systems",
    tag: "Full Stack Architecture · 2024",
  },
];

const M = PAGES.length;
const N = 18;
const SPAN = 0.449;
const BETA = 0.6;
const TILT_X = 4.5;
const TILT_Y = 7;
const ZOOM_MIN = 0.9;
const ZOOM_MAX = 1.5;

export default function SketchbookPortfolio() {
  const [idx, setIdx] = useState(0);
  const [activeCaption, setActiveCaption] = useState(PAGES[0].title);
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

  const stripsRef = useRef<HTMLDivElement[]>([]);
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
    const th = Math.PI * t;
    const beta = BETA * Math.sin(Math.PI * t);
    const D = 180 / Math.PI;
    const tt = th + beta;
    const td = (2 * beta) / N;
    sb3dRef.current.style.setProperty("--tt", `${(tt * D).toFixed(2)}deg`);
    sb3dRef.current.style.setProperty("--td", `${(td * D).toFixed(3)}deg`);
    sb3dRef.current.style.setProperty("--shade", Math.sin(Math.PI * t).toFixed(3));

    const strips = stripsRef.current;
    for (let i = 0; i < strips.length; i++) {
      const strip = strips[i];
      if (!strip) continue;
      const l1 = Math.abs(Math.cos(tt - i * td));
      const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
      strip.style.setProperty("--lit", l1.toFixed(3));
      strip.style.setProperty("--a1", ((1 - l1) * 0.62).toFixed(3));
      strip.style.setProperty("--a2", ((1 - l2) * 0.62).toFixed(3));
    }
  }, []);

  const layout = useCallback(() => {
    if (bookRef.current && sb3dRef.current) {
      sb3dRef.current.style.setProperty("--bw", `${bookRef.current.clientWidth}px`);
    }
  }, []);

  const buildCurl = useCallback(
    (dir: "next" | "prev", from: number, to: number) => {
      stripsRef.current = [];
      const curl = document.createElement("div");
      curl.className = `curl ${dir}`;
      curl.style.setProperty("--n", String(N));
      curl.style.setProperty("--span", String(SPAN));

      let host: HTMLElement = curl;
      for (let i = 0; i < N; i++) {
        const s = document.createElement("div");
        s.className = "strip";
        s.style.setProperty("--i", String(i));
        const gut = "calc(var(--bw) * 0.5)";
        const sw = `calc(var(--bw) * ${SPAN} / ${N})`;
        const A = `calc(-1 * (${gut} + ${i} * ${sw}))`;
        const B = `calc(${i + 1} * ${sw} - ${gut})`;

        const f = document.createElement("div");
        f.className = "face front";
        const b = document.createElement("div");
        b.className = "face back";

        f.style.backgroundImage = `url(${PAGES[from].file})`;
        f.style.backgroundPositionX = dir === "next" ? A : B;

        b.style.backgroundImage = `url(${PAGES[to].file})`;
        b.style.backgroundPositionX = dir === "next" ? B : A;

        const fSh = document.createElement("div");
        fSh.className = "sh";
        const fGl = document.createElement("div");
        fGl.className = "gl";
        f.appendChild(fSh);
        f.appendChild(fGl);

        const bSh = document.createElement("div");
        bSh.className = "sh";
        const bGl = document.createElement("div");
        bGl.className = "gl";
        b.appendChild(bSh);
        b.appendChild(bGl);

        s.appendChild(f);
        s.appendChild(b);
        if (i === N - 1) s.classList.add("edge");

        host.appendChild(s);
        host = s;
        stripsRef.current.push(s);
      }
      return curl;
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
      book.appendChild(f);
      sb3dRef.current.style.setProperty("--shade", "0");
      setActiveCaption(PAGES[idx].title);
    } else {
      const next = turn.dir === "next";
      book.appendChild(halfEl("left", next ? turn.from : turn.to));
      book.appendChild(halfEl("right", next ? turn.to : turn.from));
      book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
      applyTurn(turn.t);
      setActiveCaption(`${PAGES[turn.from].title} → ${PAGES[turn.to].title}`);
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
  }, [applyTurn, buildCurl, halfEl, idx, layout]);

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
    (target: number, onDone: () => void, stiff = 170, damp = 26) => {
      springRef.current = {
        kind: "spring",
        v: 0,
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

  const commitTurn = useCallback(() => {
    const turn = turnRef.current;
    if (!turn) return;
    animateTo(1, () => {
      const nextIdx = turn.to;
      turnRef.current = null;
      setIdx(nextIdx);
    });
  }, [animateTo]);

  const cancelTurn = useCallback(() => {
    if (!turnRef.current) return;
    animateTo(0, () => {
      turnRef.current = null;
      paint();
    });
  }, [animateTo, paint]);

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
      commitTurn();
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
          spring.v = (spring.v || 0) + (-(spring.k || 170) * x - (spring.c || 26) * (spring.v || 0)) * dt;
          turn.t += (spring.v || 0) * dt;
          if (Math.abs(turn.t - spring.target) < 0.002 && Math.abs(spring.v || 0) < 0.02) {
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
    const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.62);
    const t = Math.max(0, Math.min(1, raw));
    const now = performance.now();
    drag.vel = (t - (turnRef.current ? turnRef.current.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
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

    if (drag.moved < 6) {
      commitTurn();
      return;
    }
    const go = turn.t > 0.42 || drag.vel > 1.1;
    if (go) commitTurn();
    else cancelTurn();
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
          <a href="#plates">Journal</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <div className="top-socials">
            {/* GitHub */}
            <a
              href="https://github.com/achuasokan"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/achuasokan"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.9 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.1 9.3h3.6v11.6H3.1V9.3Zm6 0h3.4v1.6h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.35 4.3 5.4v6.45h-3.6v-5.72c0-1.36-.02-3.12-1.92-3.12-1.92 0-2.22 1.48-2.22 3.02v5.82H9.1V9.3Z" />
              </svg>
            </a>
            {/* Email */}
            <a href="mailto:achuasokan@gmail.com" className="icon-btn" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <rect x="2.4" y="4.6" width="19.2" height="14.8" rx="2.4" />
                <path d="m3.2 6.4 8.8 6.6 8.8-6.6" />
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* Main Hero & Tactile Sketchbook */}
      <section id="sketchbook" className="hero">
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

        <p className="hero-kicker">Full Stack Developer / Software Engineer / Next.js &amp; MERN @ Kerala</p>

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

          {/* Foot Captions */}
          <div className="sb-foot">
            <div className="sb-captions">
              <p className="sb-caption">{activeCaption}</p>
            </div>
          </div>

          <p className={`sb-hint ${hintGone ? "gone" : ""}`}>
            drag page to turn · use arrow keys or chevron buttons
          </p>
        </div>

        {/* Scroll cue down to About */}
        <button
          type="button"
          className="hero-down"
          aria-label="scroll to about section"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content">
          <p className="section-label">A B O U T</p>
          <p className="bio">
            Achu Asokan is a full-stack engineer and web craftsman based in Kerala, India. Specializing
            in high-performance web applications, real-time architectures, and interactive digital
            experiences, he builds across{" "}
            <a className="bio-link" href="#plates">
              Next.js 16, React 19, TypeScript, Node.js, and MongoDB
            </a>
            . From responsive real-time platforms like{" "}
            <a
              className="bio-link"
              href="#sketchbook"
              onClick={(e) => {
                e.preventDefault();
                goTo(0);
                document.getElementById("sketchbook")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              Spark
            </a>{" "}
            to immersive cinematic sites like{" "}
            <a
              className="bio-link"
              href="#sketchbook"
              onClick={(e) => {
                e.preventDefault();
                goTo(1);
                document.getElementById("sketchbook")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              Casa Ananda
            </a>
            , his work lives on the seam between technical rigor and visual craft: building software
            that feels alive, tactile, and thoughtfully engineered. This sketchbook captures selected
            architectural plates and production interfaces looked at up close.
          </p>
        </div>
        <div className="bloom-container">
          <img
            crossOrigin="anonymous"
            className="bloom"
            src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/339abd2c649a11f725af9114/bloom.png"
            alt="Botanical watercolor flower"
          />
          <div className="bloom-line" aria-hidden="true" />
        </div>
      </section>

      {/* Painted watercolor divider */}
      <div className="rule short" aria-hidden="true" />

      {/* Plates Index */}
      <section id="plates" className="plates">
        <p className="section-label">P L A T E S</p>
        <ol className="plate-list">
          {PAGES.map((p, i) => (
            <li key={i}>
              <button
                type="button"
                className="plate"
                aria-current={i === idx}
                onClick={() => {
                  goTo(i);
                  document.getElementById("sketchbook")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">{p.title}</span>
                <span className="p">{p.place}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <div className="rule short" aria-hidden="true" />

      {/* Footer / Contact */}
      <footer className="foot" id="contact">
        <p>
          Kerala, India · Full Stack Developer ·{" "}
          <a href="mailto:achuasokan@gmail.com" className="bio-link">
            achuasokan@gmail.com
          </a>{" "}
          ·{" "}
          <a href="tel:+918156836602" className="bio-link">
            +91 8156836602
          </a>
        </p>
      </footer>
    </>
  );
}
