import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.38 6.52-1.6 6.52-7.01 0-1.5-.5-2.7-1.3-3.7.13-.3.5-1.7-.13-3.6 0 0-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C7.3 1.7 6.3 2 6.3 2c-.6 1.9-.2 3.3-.1 3.6A5.4 5.4 0 0 0 4.9 9.3c0 5.4 3.3 6.6 6.5 7.02a4.8 4.8 0 0 0-1 3.03V22" />
    <path d="M9 20c-5 1.5-5-2.5-7-3" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navLinks = [
  { label: 'About', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Journey', path: '/journey' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Desktop / Main Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'glass-panel-strong rounded-2xl mx-4 mt-4 border-b border-border-light'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-8">
          {/* ── Brand ── */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-text-primary select-none"
          >
            Vinyas - The Dev
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-accent-indigo'
                    : 'text-text-secondary hover:text-accent-indigo'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href="#contact"
              onClick={scrollToContact}
              className="text-sm font-medium text-text-secondary hover:text-accent-indigo transition-colors"
            >
              Contact
            </a>

            {/* Separator */}
            <div className="w-px h-4 bg-border-medium" />

            {/* Social Icons */}
            <a
              href="https://github.com/Vinyasbms2006"
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-accent-indigo transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/vinyas-d-t-30404533a"
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-accent-indigo transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-text-primary hover:text-accent-indigo transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Overlay Menu ── */}
      <div
        className={`fixed inset-0 z-[9998] transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 glass-panel-strong" />

        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-text-primary hover:text-accent-indigo transition-colors z-10"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {/* Centered Navigation */}
        <div className="relative flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-semibold transition-colors ${
                isActive(link.path)
                  ? 'text-accent-indigo'
                  : 'text-text-primary hover:text-accent-indigo'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <a
            href="#contact"
            onClick={scrollToContact}
            className="text-3xl font-semibold text-text-primary hover:text-accent-indigo transition-colors"
          >
            Contact
          </a>

          {/* Mobile Social Row */}
          <div className="flex items-center gap-6 pt-6 border-t border-border-light">
            <a
              href="https://github.com/Vinyasbms2006"
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-accent-indigo transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/vinyas-d-t-30404533a"
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-accent-indigo transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={22} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
