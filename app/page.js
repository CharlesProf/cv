"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const heroLines = [
  "I'm a Computer Science Graduate from Binus University",
  "I'm a former Associate Software Engineer at Bithealth that was outsourced to Siloam Hospital"
];

const navItems = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "about", label: "About", icon: UserIcon },
  { id: "resume", label: "Resume", icon: FileIcon },
  { id: "skills", label: "Skills", icon: SkillsIcon },
  { id: "portfolio", label: "Portfolio", icon: ImageIcon },
  { id: "contact", label: "Contact", icon: MailIcon }
];

const experiences = [
  {
    title: "Backend Software Engineer / IT Consultant",
    date: "Former Role",
    place: "BitHealth (IT Healthcare Consultant) - Assigned to Siloam Hospitals Group, Indonesia",
    points: [
      "Developed and maintained backend services for healthcare applications used by Siloam Hospitals, one of Indonesia's largest hospital networks.",
      "Managed and improved existing application workflows, ensuring system stability and efficient data processing.",
      "Implemented new backend features for ongoing healthcare system development projects.",
      "Troubleshot and resolved code-level issues to improve reliability and system performance.",
      "Maintained code quality through unit testing, debugging, code optimization, and refactoring for maintainability.",
      "Collaborated with cross-functional teams including developers, product teams, and external technology partners.",
      "Contributed to a large-scale CRM integration project with Avanade to enable personalized customer engagement.",
      "Implemented device token integration to support push notification services within CRM customer journeys.",
      "Participated in WhatsApp integration with 8x8 to support automated patient communication and engagement.",
      "Contributed to patient personalization features based on treatment history and predefined criteria."
    ]
  },
  {
    title: "Backend Developer Intern",
    date: "August 2023 - June 2024",
    place: "PT. Inovasi Sukses Sentosa, Indonesia",
    points: [
      "Developed new backend features in collaboration with multiple internal teams for business and operational needs.",
      "Contributed to building and enhancing internal web platforms used by back-office teams.",
      "Maintained and fixed existing systems while optimizing modules to improve website loading performance.",
      "Supported feature development across frontend and backend using ASP.NET, C#, and React.",
      "Improved code structure and maintainability through iterative enhancements and technical cleanup."
    ]
  }
];

const education = [
  {
    title: "Bachelor of Computer Science",
    date: "2020 - 2024",
    place: "Bina Nusantara University (BINUS)",
    description:
      "Computer Science Global Class graduate from BINUS University. Beyond academic studies in computer science, I actively participated in various organizations and activities, and was an active member of the university badminton club while maintaining a GPA of 3.70."
  },
  {
    title: "Student Exchange Program",
    date: "January 2023 - June 2023",
    place: "Tampere University, Finland",
    description:
      "Strengthened global collaboration experience and adaptability through international coursework and team-based assignments."
  }
];

const projects = [
  {
    id: 1,
    type: "web",
    label: "Full Stack Website",
    title: "Hospital Operations Dashboard",
    description: "A dashboard to monitor queues, status updates, and operational KPIs for service teams.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: 2,
    type: "web",
    label: "Frontend Engineering",
    title: "Personal Portfolio",
    description: "A modern portfolio with smooth transitions, filterable projects, and clean visual hierarchy.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: 3,
    type: "design",
    label: "UI Design",
    title: "Clinical UI System",
    description: "Component-driven UI kit and screen prototypes for data-heavy healthcare interfaces.",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1500&q=80"
  }
];

const skillColumns = [
  [
    { name: "JavaScript", value: 90 },
    { name: "Laravel (PHP)", value: 95 },
    { name: "C Programming Language", value: 100 },
    { name: "C#", value: 100 },
    { name: "PostgreSQL", value: 95 },
    { name: "MongoDB", value: 90 },
    { name: "Express.js (Node.js)", value: 85 }
  ],
  [
    { name: "React.js", value: 85 },
    { name: "HTML", value: 95 },
    { name: "CSS", value: 95 },
    { name: "SQL", value: 95 },
    { name: "Figma", value: 65 },
    { name: "Git", value: 85 },
    { name: "Python", value: 75 }
  ]
];

export default function Home() {
  const pageRef = useRef(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [activeNav, setActiveNav] = useState("home");
  const [filter, setFilter] = useState("all");

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.2
  });
  const heroParallax = useTransform(smoothProgress, [0, 0.4], [0, -120]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % heroLines.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveNav(id);
          });
        },
        { threshold: 0.45 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.type === filter);
  }, [filter]);

  return (
    <main ref={pageRef}>
      <motion.div className="progress-line" style={{ scaleX: smoothProgress }} />

      <aside className="side-nav" aria-label="Section navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-dot ${isActive ? "active" : ""}`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon />
            </a>
          );
        })}
      </aside>

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
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <a className="hero-btn" href="#resume">
            Charles&apos;s CV
          </a>
        </motion.div>
      </section>

      <section id="about" className="about-block section-shell">
        <SectionTitle title="About" />
        <div className="about-content">
          <p>
            I am Charles Wilbert, a Computer Science Global Class graduate from BINUS University
            with professional experience in healthcare technology. My background centers on backend
            engineering, system integration, and enterprise application development, with hands-on
            work in CRM integration, push notification services, and communication workflows. I
            focus on delivering stable, scalable, and maintainable systems that support both
            operational efficiency and a strong end-user experience.
          </p>
        </div>
      </section>

      <section id="resume" className="section-shell resume-block">
        <SectionTitle title="Resume" />
        <div className="resume-grid">
          <TimelineColumn title="Experience" items={experiences} />
          <TimelineColumn title="Education" items={education} />
        </div>
      </section>

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

      <section id="portfolio" className="section-shell portfolio-block">
        <SectionTitle title="Portfolio" />
        <div className="filters">
          {["all", "web", "design"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item === "all" ? "All" : item === "web" ? "Web" : "Design"}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
            >
              <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}>
                <div className="project-overlay">
                  <button type="button">View</button>
                  <button type="button">Details</button>
                </div>
              </div>
              <div className="project-content">
                <span>{project.label}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell contact-block">
        <SectionTitle title="Contact" />
        <div className="contact-card">
          <p>Always exploring new opportunities in the IT field. Feel free to connect with me on LinkedIn!.</p>
          <a href="mailto:charles.wilbert2408@gmail.com">charles.wilbert2408@gmail.com</a>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <div className="section-line" />
    </div>
  );
}

function TimelineColumn({ title, items }) {
  return (
    <article className="timeline-col">
      <h3>{title}</h3>
      <div className="timeline">
        {items.map((item) => (
          <div className="timeline-item" key={`${title}-${item.title}`}>
            <h4>{item.title}</h4>
            <p className="date">{item.date}</p>
            <p className="place">{item.place}</p>
            {"points" in item ? (
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5.5 10.5V20h13V10.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.2 19.2c.9-2.7 3.6-4.5 6.8-4.5s5.9 1.8 6.8 4.5" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.5h7l3 3V20.5H7z" />
      <path d="M14 3.5v3h3" />
      <path d="M9.2 12h5.7M9.2 15h5.7" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.2" />
      <path d="M6.7 17l4.3-4.2 2.7 2.6 2.7-2.9 1.9 2.2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.6" y="5.5" width="16.8" height="13" rx="2" />
      <path d="M4.4 7l7.6 5.7L19.6 7" />
    </svg>
  );
}

function SkillsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 18.5h16" />
      <path d="M6 14.5h3" />
      <path d="M10.5 14.5H14" />
      <path d="M15.5 14.5H18" />
      <path d="M6 10h5" />
      <path d="M12.5 10H18" />
      <path d="M6 5.5h8" />
    </svg>
  );
}
