"use client";

import React from "react";

export default function GetInTouch() {
  return (
    <section id="contact" className="dispatch-section">
      {/* Decorative watercolor divider framing top of section */}
      <div className="rule short" aria-hidden="true" />

      <div className="dispatch-grid">
        {/* Left Column: Context, Direct Invitation & Status */}
        <div className="dispatch-intro">
          <p className="section-label">G E T &nbsp; I N &nbsp; T O U C H</p>
          <h2 className="dispatch-title">
            Have a project in mind? <em>Let’s talk.</em>
          </h2>
          <p className="dispatch-desc">
            Open to full-time software engineering roles, freelance projects, and new challenges worth taking on.
          </p>
          <p className="dispatch-subnote">
            Based in Kerala, India · Open to opportunities worldwide.
          </p>
        </div>

        {/* Right Column: Conversational Note & Social Medallion Dock */}
        <div className="dispatch-actions-panel">
          <div className="dispatch-note-wrap">
            <span className="dispatch-gold-quote" aria-hidden="true">“</span>
            <p className="dispatch-note">
              You can explore my work or get in touch directly through the links below.
            </p>
          </div>

          {/* Social, Email & Document Medallion Dock (5 Icons) */}
          <div className="dispatch-dock">
            {/* Direct Email */}
            <a
              href="mailto:achuasokan.me@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Achu%20Asokan"
              className="dock-item"
              aria-label="Send direct email"
              title="Direct Email (achuasokan.me@gmail.com)"
            >
              <div className="dock-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                  <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
                </svg>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/achu-a-4xd2y"
              target="_blank"
              rel="noopener noreferrer"
              className="dock-item"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <div className="dock-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/achuasokan"
              target="_blank"
              rel="noopener noreferrer"
              className="dock-item"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <div className="dock-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/achu.asokan/"
              target="_blank"
              rel="noopener noreferrer"
              className="dock-item"
              aria-label="Instagram Profile"
              title="Instagram"
            >
              <div className="dock-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </a>

            {/* CV */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="dock-item"
              aria-label="View or download CV"
              title="Curriculum Vitae (PDF)"
            >
              <div className="dock-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative watercolor divider framing bottom of section */}
      <div className="rule short" aria-hidden="true" />

      {/* Grounded Monograph Footer */}
      <footer className="contact-hub-footer">
        <p className="footer-credits">
          Achu Asokan · Full Stack Developer · Kerala, India
        </p>
        <p className="footer-sub">
          © 2026 Achu Asokan
        </p>
      </footer>
    </section>
  );
}
