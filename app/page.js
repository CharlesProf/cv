"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SideNav from "./components/layout/SideNav";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Resume from "./components/sections/Resume";
import Skills from "./components/sections/Skills";
import Portfolio from "./components/sections/Portfolio";
import Contact from "./components/sections/Contact";

export default function Home() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.2 });

  return (
    <main ref={pageRef}>
      <motion.div className="progress-line" style={{ scaleX: smoothProgress }} />
      <SideNav />
      <Hero />
      <About />
      <Resume />
      <Skills />
      <Portfolio />
      <Contact />
    </main>
  );
}
