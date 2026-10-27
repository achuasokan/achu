"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [isExit, setIsExit] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Lock body scroll while loader is visible
    document.body.style.overflow = "hidden";

    // ~1.8s signature draw & graceful brief hold, then trigger organic dissolve
    const exitTimer = setTimeout(() => {
      setIsExit(true);
      document.body.style.overflow = "";

      // Remove from DOM after dissolve finishes
      setTimeout(() => {
        setIsMounted(false);
      }, 750);
    }, 1800);

    return () => {
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <aside
      className={`signature-loader ${isExit ? "sig-exit" : ""}`}
      aria-label="Loading portfolio"
      role="status"
    >
      {/* Ambient Watercolor Bloom Backdrop */}
      <div className="sig-ambient-wash" aria-hidden="true" />

      {/* Central Artwork & Typography */}
      <div className="sig-stage">
        {/* <p className="sig-kicker">Software Engineer</p> */}

        <h1 className="sig-name">Achu Asokan</h1>

        {/* The Signature Watercolor Hand-Drawn Stroke */}
        <div className="sig-svg-wrap" aria-hidden="true">
          <svg
            className="sig-painterly-svg"
            viewBox="0 0 280 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="sig-watercolor-rough" x="-10%" y="-100%" width="120%" height="300%">
                <feTurbulence type="fractalNoise" baseFrequency="0.08 0.5" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <linearGradient id="sig-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dfb776" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#dfb776" stopOpacity="1" />
                <stop offset="85%" stopColor="#fff2d6" stopOpacity="1" />
                <stop offset="100%" stopColor="#dfb776" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* 1. Organic Wavy Watercolor Stroke (Draws smoothly from left to right) */}
            <path
              className="sig-path-wavy"
              d="M 8 8.0 C 40 7.8, 70 8.8, 105 7.2 C 135 5.2, 165 5.0, 195 6.4 C 212 7.4, 222 9.8, 238 9.8 C 250 9.8, 260 7.8, 272 7.4"
              stroke="url(#sig-gold-grad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#sig-watercolor-rough)"
            />

            {/* 2. Straight Gold Hairline (Draws in tandem) */}
            <line
              className="sig-path-line"
              x1="24"
              y1="19"
              x2="256"
              y2="19"
              stroke="rgba(223, 183, 118, 0.45)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* <p className="sig-tagline">
          <em>From concept to creation.</em>
        </p> */}
      </div>
    </aside>
  );
}
