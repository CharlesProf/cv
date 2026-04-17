"use client";

import { useEffect, useState } from "react";
import { navLinks } from "../../data/navigation";
import {
  HomeIcon,
  UserIcon,
  FileIcon,
  SkillsIcon,
  ImageIcon,
  MailIcon
} from "../icons";

const navIcons = {
  home: HomeIcon,
  about: UserIcon,
  resume: FileIcon,
  skills: SkillsIcon,
  portfolio: ImageIcon,
  contact: MailIcon
};

export default function SideNav() {
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const observers = [];

    navLinks.forEach(({ id }) => {
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

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <aside className="side-nav" aria-label="Section navigation">
      {navLinks.map(({ id, label }) => {
        const Icon = navIcons[id];
        return (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-dot ${activeNav === id ? "active" : ""}`}
            aria-label={label}
            title={label}
          >
            <Icon />
          </a>
        );
      })}
    </aside>
  );
}
