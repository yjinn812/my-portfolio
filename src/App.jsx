import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Profile from "./components/sections/Profile";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import HashScroll from "./components/ui/HashScroll";

const OpsScrollScene = lazy(() => import("./components/ui/OpsScrollScene"));

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <HashScroll />
      <Suspense fallback={null}>
        <OpsScrollScene />
      </Suspense>
      <Navbar />
      <main id="main">
        <Hero />
        <Profile />
        <Experience />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
