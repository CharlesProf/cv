import Link from "next/link";
import { navLinks } from "../../data/navigation";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="site-logo">
        <span className="logo-badge">CW</span>
        <span className="logo-name">Charles Wilbert</span>
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link key={link.id} href={`/#${link.id}`} className="header-nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
