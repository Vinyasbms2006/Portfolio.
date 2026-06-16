import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);


const GithubIcon = ({ size = 18 }: { size?: number }) => (
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

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
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

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          subtitleRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden bg-surface"
    >
      {/* Dot pattern overlay */}
      <div className="dot-pattern absolute inset-0 opacity-50 pointer-events-none" />

      {/* Content */}
      <div className="text-center max-w-2xl mx-auto px-6 relative z-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-indigo mb-8">
          Get in Touch
        </p>

        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold text-text-primary leading-tight tracking-tight"
        >
          Let&apos;s Build Something
          <br />
          <span className="gradient-text">Extraordinary</span>
        </h2>

        <p
          ref={subtitleRef}
          className="text-lg text-text-secondary mt-6 max-w-lg mx-auto"
        >
          Interested in collaboration, internship opportunities, or just a
          conversation about technology and innovation?
        </p>

        <div ref={ctaRef}>
          <MagneticButton
            href="mailto:vinyasdt.cs24@bmsce.ac.in"
            variant="primary"
            className="mt-10 px-10 py-5 text-base hover:shadow-glow hover:bg-accent-violet"
          >
            Say Hello →
          </MagneticButton>

          <div className="mt-8 flex gap-6 items-center justify-center">
            <a
              href="https://github.com/Vinyasbms2006"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary hover:text-accent-indigo transition-colors flex items-center gap-2"
            >
              <GithubIcon size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vinyas-d-t-30404533a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary hover:text-accent-indigo transition-colors flex items-center gap-2"
            >
              <LinkedInIcon size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
