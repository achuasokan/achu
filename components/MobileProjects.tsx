"use client";

import React from "react";
import Image from "next/image";

interface MobileProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  highlights: { label: string; detail: string }[];
  tech: string[];
  url: string;
  domain: string;
  image: string;
}

const MOBILE_PROJECTS: MobileProject[] = [
  {
    id: "spark",
    num: "01",
    title: "Spark",
    subtitle: "Real-time Dating Platform",
    tag: "Production System · 2025",
    description:
      "Spark is a modern full-stack dating platform that enables users to discover profiles, connect through matching, and communicate in real time, delivering an interactive experience across the application.",
    highlights: [
      {
        label: "Profile Discovery & Matching",
        detail: "Explore user profiles and connect with potential matches based on shared interests and preferences.",
      },
      {
        label: "Real-Time Messaging",
        detail: "Enable instant communication between users through real-time chat functionality.",
      },
      {
        label: "Interactive User Profiles",
        detail: "Create and manage dating profiles with personal details, photos, and preferences.",
      },
    ],
    tech: ["React", "TypeScript", "Node.js", "MongoDB"],
    url: "https://spaark.fun",
    domain: "spaark.fun",
    image: "/Img/spark.webp",
  },
  {
    id: "casa",
    num: "02",
    title: "Casa Ananda",
    subtitle: "Luxury Resort Website",
    tag: "Interactive Web Experience · 2025",
    description:
      "A cinematic website built for a luxury resort in Kerala, featuring immersive visuals, smooth scrolling, and interactive animations for an engaging browsing experience.",
    highlights: [
      {
        label: "Immersive Visual Design",
        detail: "Cinematic imagery, layered layouts, and smooth transitions.",
      },
      {
        label: "Interactive Animations",
        detail: "Scroll-based effects and parallax movement using GSAP and Lenis.",
      },
      {
        label: "Responsive Experience",
        detail: "Layouts designed for desktop and mobile devices.",
      },
    ],
    tech: ["Next.js", "TypeScript", "GSAP", "Lenis"],
    url: "https://casaananda.in",
    domain: "casaananda.in",
    image: "/Img/casa.webp",
  },
  {
    id: "tvtrac",
    num: "03",
    title: "tvtrac.",
    subtitle: "Media Discovery & Tracking Platform",
    tag: "Production System · 2025",
    description:
      "tvtrac. is a full-stack Progressive Web App (PWA) for discovering, tracking, and organizing favorite TV shows and movies in one place, delivering an app-like experience across desktop and mobile devices.",
    highlights: [
      {
        label: "Media Discovery",
        detail: "Browse movies and TV shows using integrated media data.",
      },
      {
        label: "Personal Tracking",
        detail: "Manage watched titles and personal watchlists in one place.",
      },
      {
        label: "Progressive Web App",
        detail: "Designed as an installable PWA, bringing an app-like experience to devices.",
      },
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "PWA"],
    url: "https://tvtrac.fun",
    domain: "tvtrac.fun",
    image: "/Img/tvtrac.webp",
  },
  {
    id: "comix",
    num: "04",
    title: "Comix",
    subtitle: "Comic Book E-commerce Platform",
    tag: "E-commerce Platform · 2025",
    description:
      "Developed a full-stack comic book e-commerce platform that allows users to explore comic collections, discover titles, and purchase their favorite comics through an intuitive online shopping experience.",
    highlights: [
      {
        label: "Comic Book Collection",
        detail: "Browse comic books, explore available titles, and view product details.",
      },
      {
        label: "Shopping Cart Management",
        detail: "Manage selected comics and review items before proceeding with a purchase.",
      },
      {
        label: "Dynamic Web Experience",
        detail: "Built dynamic pages using EJS templates, with server-side logic powered by Node.js and Express.js.",
      },
    ],
    tech: ["EJS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    url: "https://comix-3597.onrender.com",
    domain: "comix-3597.onrender.com",
    image: "/Img/comix.webp",
  },
];

export default function MobileProjects() {
  return (
    <div className="mobile-projects-stack" aria-label="Projects Showcase">
      {MOBILE_PROJECTS.map((project, index) => (
        <article
          key={project.id}
          className={`mobile-project-card card-${project.id}`}
          style={
            {
              top: "72px",
              zIndex: index + 1,
            } as React.CSSProperties
          }
        >
          {/* Card Header: Title + Subtitle on Left, Compact Gold "Live ↗" Button on Right */}
          <div className="mp-card-header">
            <div className="mp-card-heading">
              <h3 className="mp-card-title">{project.title}</h3>
              <p className="mp-card-subtitle">{project.subtitle}</p>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mp-compact-link"
              title={`Visit live: ${project.url}`}
            >
              <span className="mp-compact-link-text">VISIT LIVE</span>
              <span className="mp-compact-link-arrow">↗</span>
            </a>
          </div>

          {/* Visual Screen Preview (Mockup Frame) - Clickable to open live demo */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mp-visual-frame"
            title={`Visit live: ${project.url}`}
          >
            <div className="mp-visual-inner">
              <Image
                src={project.image}
                alt={`${project.title} Preview`}
                width={900}
                height={620}
                className="mp-visual-img"
                priority={index === 0}
              />
            </div>
          </a>

          {/* Content Details */}
          <div className="mp-card-content">
            {/* Tech Stack Pills */}
            <div className="mp-card-tech">
              {project.tech.map((t) => (
                <span key={t} className="mp-tech-pill">
                  {t}
                </span>
              ))}
            </div>

            {/* Narrative Description */}
            <p className="mp-card-desc">{project.description}</p>

            {/* Project Highlights */}
            <div className="mp-highlights-block">
              <h4 className="mp-highlights-title">PROJECT HIGHLIGHTS</h4>
              <ul className="mp-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="mp-highlight-item">
                    <span className="mp-bullet-dot" />
                    <div className="mp-highlight-text">
                      <span className="mp-highlight-label">{h.label}</span>
                      <span className="mp-highlight-detail">{h.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
