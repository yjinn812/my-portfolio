import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import HashScroll from "./components/ui/HashScroll";

const OpsScrollScene = lazy(() => import("./components/ui/OpsScrollScene"));
const PageDotGrid = lazy(() => import("./components/ui/PageDotGrid"));

export default function App() {
  return (
    <>
      <HashScroll />
      <Suspense fallback={null}>
        <OpsScrollScene />
        <PageDotGrid />
      </Suspense>
      <Navbar />
      <main id="main">
        <Hero />
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
