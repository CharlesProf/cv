"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { heroLines } from "../../data/navigation";

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.2 });
  const heroParallax = useTransform(smoothProgress, [0, 0.4], [0, -120]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % heroLines.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <motion.div className="hero-bg" style={{ y: heroParallax }} />
      <div className="hero-overlay" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-kicker">Portfolio</p>
        <h1>Charles Wilbert</h1>
        <div className="hero-text">
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              {heroLines[lineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="hero-links">
          <a href="mailto:charles.wilbert2408@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/charleswilbert/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/CharlesProf?tab=repositories" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <div className="hero-downloads">
          <a
            className="hero-btn"
            href="/charles-wilbert-cv.pdf"
            download="Charles-Wilbert-CV.pdf"
          >
            Download CV
          </a>
          <a
            className="hero-btn hero-btn--outline"
            href="/api/portfolio-pdf"
            download="Charles-Wilbert-Portfolio.pdf"
          >
            Download Portfolio
          </a>
        </div>
      </motion.div>
    </section>
  );
}
