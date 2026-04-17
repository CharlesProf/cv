"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { skillColumns } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section-shell skills-block">
      <SectionTitle title="Skills" />
      <div className="skills-grid">
        {skillColumns.map((col, colIndex) => (
          <div className="skills-col" key={`skill-col-${colIndex}`}>
            {col.map((skill) => (
              <article className="skill-item" key={skill.name}>
                <div className="skill-head">
                  <span>{skill.name}</span>
                  <strong>{skill.value}%</strong>
                </div>
                <div className="skill-track">
                  <motion.div
                    className="skill-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
