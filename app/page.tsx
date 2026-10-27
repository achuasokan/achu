import Preloader from "@/components/Preloader";
import About from "@/components/About";
import SketchbookPortfolio from "@/components/SketchbookPortfolio";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="page home">
      {/* Background paper texture */}
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

      {/* 1. Intro & About Section (Pure React Server Component) */}
      <About />

      {/* Painted watercolor divider */}
      <div className="rule" aria-hidden="true" />

      {/* 2. Interactive Tactile Sketchbook (Client Component for 3D physics) */}
      <SketchbookPortfolio />

      {/* 3. Get in Touch & Availability Hub (Contact & Attribution Footer) */}
      <GetInTouch />
    </main>
    </>
  );
}
