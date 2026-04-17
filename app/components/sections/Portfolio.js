"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "../ui/SectionTitle";
import { projects } from "../../data/projects";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "design", label: "Design" }
];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [slideIndices, setSlideIndices] = useState({});

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.type === filter);
  }, [filter]);

  const setSlide = (projectId, index) =>
    setSlideIndices((prev) => ({ ...prev, [projectId]: index }));

  return (
    <section id="portfolio" className="section-shell portfolio-block">
      <SectionTitle title="Portfolio" />

      <div className="filters">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? "active" : ""}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project, idx) => {
          const slideIdx = slideIndices[project.id] ?? 0;
          return (
            <motion.article
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
            >
              <div
                className="project-image"
                style={{ backgroundImage: `url(${project.slides[slideIdx]})` }}
              >
                <div className="slide-dots">
                  {project.slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`slide-dot ${i === slideIdx ? "active" : ""}`}
                      onClick={() => setSlide(project.id, i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="project-overlay">
                  <a href={project.liveLink} target="_blank" rel="noreferrer">
                    <button type="button">View</button>
                  </a>
                  <Link href={`/portfolio/${project.id}`}>
                    <button type="button">Details</button>
                  </Link>
                </div>
              </div>
              <div className="project-content">
                <span>{project.label}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
