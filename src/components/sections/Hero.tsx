import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import NeuralNetworkCanvas from '../ui/NeuralNetworkCanvas';
import MagneticButton from '../ui/MagneticButton';
import FloatingPersona from '../ui/FloatingPersona';

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

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HEADLINE_LINES = [
  { text: 'Computer', className: 'text-text-primary' },
  { text: 'Scientist.', className: 'gradient-text' },
  { text: 'Builder.', className: 'text-text-primary' },
  { text: 'Innovator.', className: 'text-text-tertiary' },
] as const;

export default function Hero() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const headlineEls = headlineRefs.current.filter(Boolean) as HTMLDivElement[];

      // ── Entrance timeline ──
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Badge
      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      });

      // Staggered headline reveals
      tl.from(
        headlineEls,
        {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
        },
        0.3,
      );

      // Subtitle
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.9,
        },
        1.2,
      );

      // CTAs
      tl.from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        1.4,
      );

      // Scroll indicator
      tl.from(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          duration: 1,
        },
        1.8,
      );

      // ── Scroll-triggered parallax fade-out ──
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: -100,
        opacity: 0,
      });

      // ── Bouncing scroll indicator ──
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: sectionRef },
  );

  const handleScrollToProjects = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    navigate('/projects');
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* ── Neural Network Background ── */}
      <div className="absolute inset-0 z-0 opacity-40">
        <NeuralNetworkCanvas interactivePhysics={true} />
      </div>

      {/* ── Aurora Gradient Overlay ── */}
      <div className="aurora-gradient absolute inset-0 z-[1] pointer-events-none" />

      {/* ── Subtle dot pattern for texture ── */}
      <div className="dot-pattern absolute inset-0 z-[2] pointer-events-none opacity-30" />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col justify-center items-start px-6 md:px-16 lg:px-24"
      >
        {/* Badge */}
        <span
          ref={badgeRef}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-text-secondary backdrop-blur-sm"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-indigo animate-pulse" />
          CS Student &bull; Builder
        </span>

        {/* Headline */}
        <h1 className="flex flex-col gap-0 leading-[0.95]">
          {HEADLINE_LINES.map((line, i) => (
            <div
              key={line.text}
              ref={(el) => { headlineRefs.current[i] = el; }}
              className="overflow-hidden"
            >
              <span
                className={`block text-[clamp(3rem,8vw,7rem)] font-bold tracking-tight ${line.className}`}
              >
                {line.text}
              </span>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary"
        >
          Exploring AI, systems, and emerging technologies through code and
          curiosity.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-8 flex items-center gap-4">
          <MagneticButton
            onClick={handleScrollToProjects}
            variant="primary"
            className="group px-6 py-3 text-sm font-semibold hover:brightness-110 shadow-premium"
          >
            <span className="flex items-center gap-2.5">
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </MagneticButton>

          <a
            href="https://github.com/Vinyasbms2006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-light bg-surface-white/60 text-text-secondary backdrop-blur-sm transition-all duration-300 hover:border-border-medium hover:text-text-primary hover:shadow-premium"
            aria-label="GitHub profile"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </div>

      {/* ── Floating Persona Illustration (Absolute Positioned in Right Blank Space) ── */}
      <div className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-0 hidden md:block select-none pointer-events-none">
        <div className="scale-75 lg:scale-95 origin-center flex justify-center items-center">
          <FloatingPersona />
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-tertiary">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-text-tertiary" />
      </div>
    </section>
  );
}
