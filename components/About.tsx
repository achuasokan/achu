import React from "react";

export default function About() {
  return (
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
    </section>
  );
}
