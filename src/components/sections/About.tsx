import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Cpu, Code2, Layout, GitMerge, Database, Globe, Wrench, BookOpen, ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const VISION_TEXT =
  'I am a Computer Science student at BMS College of Engineering, driven by an insatiable curiosity for technology. I build full-stack applications, explore AI and intelligent systems, and believe in crafting software that solves real-world problems with elegance.';

interface SkillDomain {
  icon: React.ComponentType<any>;
  title: string;
  skills: string;
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    icon: Cpu,
    title: 'AI & ML',
    skills: 'Python, TensorFlow, OpenAI API, NLP',
  },
  {
    icon: Code2,
    title: 'Full Stack',
    skills: 'React, Node.js, Express, MongoDB',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    skills: 'Figma, Tailwind CSS, Responsive Design',
  },
  {
    icon: GitMerge,
    title: 'Systems',
    skills: 'Data Structures, Algorithms, OS Concepts',
  },
  {
    icon: Database,
    title: 'Data',
    skills: 'PostgreSQL, MongoDB, SQL, Firebase',
  },
  {
    icon: Globe,
    title: 'Web Technologies',
    skills: 'TypeScript, Next.js, REST APIs',
  },
  {
    icon: Wrench,
    title: 'Developer Tools',
    skills: 'Git, Docker, VS Code, Linux',
  },
  {
    icon: BookOpen,
    title: 'CS Fundamentals',
    skills: 'OOP, DBMS, Computer Networks',
  },
];

interface AboutProps {
  isTeaser?: boolean;
}

export default function About({ isTeaser = false }: AboutProps) {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // --- Word-by-word scroll reveal ---
      const wordEls = gsap.utils.toArray<HTMLSpanElement>('.about-word');

      if (wordEls.length) {
        gsap.fromTo(
          wordEls,
          { opacity: 0.15, color: 'var(--color-text-tertiary)' },
          {
            opacity: 1,
            color: 'var(--color-text-primary)',
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: 1,
            },
          }
        );
      }

      // --- Skill cards stagger reveal ---
      const cards = gsap.utils.toArray<HTMLDivElement>('.skill-card');

      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const words = VISION_TEXT.split(' ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-surface relative px-6 md:px-16 lg:px-24 py-24 md:py-32"
    >
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-indigo mb-12">
        About
      </p>

      {/* Vision statement — word-by-word reveal */}
      <div ref={textRef} className="max-w-5xl">
        <p className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
          {words.map((word, i) => (
            <span
              key={i}
              className="about-word inline-block mr-[0.3em] will-change-[opacity,color]"
              style={{ opacity: 0.15, color: 'var(--color-text-tertiary)' }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Knowledge Constellation */}
      <div ref={cardsRef} className="mt-20 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.title}
                className="skill-card glass-panel rounded-xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-premium-hover cursor-default flex flex-col justify-between"
                style={{ opacity: 0 }}
              >
                <div>
                  {/* Modern Lucide Icon */}
                  <div className="text-accent-indigo mb-4 flex items-center justify-start h-8" aria-hidden="true">
                    <Icon size={24} className="stroke-[1.5]" />
                  </div>

                  {/* Domain title */}
                  <h3 className="text-sm font-semibold text-text-primary mb-2">
                    {domain.title}
                  </h3>
                </div>

                {/* Sub-skills */}
                <p className="text-xs text-text-tertiary leading-relaxed mt-2">
                  {domain.skills}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Home Teaser CTA */}
      {isTeaser && (
        <div className="mt-24 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-text-secondary mb-4">
            Curious to see what I&apos;ve built with these technologies?
          </p>
          <MagneticButton
            onClick={() => navigate('/projects')}
            variant="secondary"
            className="group font-semibold shadow-premium hover:shadow-premium-hover"
          >
            <span className="flex items-center gap-2">
              Explore Selected Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </MagneticButton>
        </div>
      )}
    </section>
  );
}
