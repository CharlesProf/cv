"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = projects.find((p) => String(p.id) === id);
  const [slideIdx, setSlideIdx] = useState(0);

  if (!project) {
    return (
      <main className="detail-not-found">
        <p>Project not found.</p>
        <button type="button" onClick={() => router.back()}>Go back</button>
      </main>
    );
  }

  const prevSlide = () =>
    setSlideIdx((i) => (i - 1 + project.slides.length) % project.slides.length);
  const nextSlide = () =>
    setSlideIdx((i) => (i + 1) % project.slides.length);

  return (
    <main className="project-detail-page">
      <div className="detail-back">
        <button className="back-btn" type="button" onClick={() => router.back()}>
          ← Back to Portfolio
        </button>
      </div>

      {/* Carousel */}
      <motion.div
        className="detail-carousel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="carousel-slide"
          style={{ backgroundImage: `url(${project.slides[slideIdx]})` }}
        />
        {project.slides.length > 1 && (
          <>
            <button className="carousel-arrow carousel-prev" type="button" onClick={prevSlide} aria-label="Previous slide">
              &#8249;
            </button>
            <button className="carousel-arrow carousel-next" type="button" onClick={nextSlide} aria-label="Next slide">
              &#8250;
            </button>
            <div className="carousel-dots">
              {project.slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel-dot ${i === slideIdx ? "active" : ""}`}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Content grid: description + sidebar */}
      <div className="detail-content-grid">
        {/* Left: overview + features */}
        <motion.div
          className="detail-main"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="detail-label">{project.label}</span>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-overview">{project.overview}</p>

          <div className="detail-features">
            {project.features.map((section) => (
              <div className="feature-block" key={section.role}>
                <h3>{section.role}</h3>
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: project info sidebar */}
        <motion.aside
          className="detail-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="sidebar-heading">Project Information</h3>

          <div className="sidebar-section">
            <p className="sidebar-label">Category</p>
            <p className="sidebar-value">{project.category}</p>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-label">Tech Stack</p>
            <div className="tech-tags">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {project.liveLink && (
            <div className="sidebar-section">
              <p className="sidebar-label">Project URL</p>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="sidebar-url"
              >
                {project.liveLink.replace(/^https?:\/\//, "").split("/")[0]}
              </a>
            </div>
          )}

          <div className="sidebar-actions">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="detail-btn primary"
            >
              Visit Website
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="detail-btn secondary"
            >
              GitHub
            </a>
          </div>
        </motion.aside>
      </div>
    </main>
  );
}
