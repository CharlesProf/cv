export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-copy">© {new Date().getFullYear()} Charles Wilbert</p>
      <div className="footer-links">
        <a href="mailto:charles.wilbert2408@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/charleswilbert/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/CharlesProf" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}
