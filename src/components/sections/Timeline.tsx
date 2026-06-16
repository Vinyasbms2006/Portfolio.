import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Code2, Sparkles, Rocket, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const timelineData: TimelineEntry[] = [
  {
    year: '2024',
    title: 'Started B.E. in Computer Science',
    description:
      'Began my journey at BMS College of Engineering, diving deep into computer science fundamentals, data structures, and programming.',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'First Full-Stack Project',
    description:
      'Built the Doctor Appointment App — my first complete MERN stack application, learning backend architecture and database design.',
    icon: Code2,
  },
  {
    year: '2025',
    title: 'AI & Machine Learning Exploration',
    description:
      'Developed the AI Study Assistant using OpenAI API, exploring the intersection of artificial intelligence and education technology.',
    icon: Sparkles,
  },
  {
    year: '2026',
    title: 'First Client Project',
    description:
      'Took on Drop by Drop — a real-world rainwater harvesting company portfolio, gaining professional developer experience.',
    icon: Rocket,
  },
  {
    year: '2026',
    title: 'Building & Growing',
    description:
      'Continuing to explore AI, systems thinking, and innovative technologies. Always learning, always building.',
    icon: Activity,
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Animate the active timeline line height on scroll (works on single responsive line)
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }

      // Animate the surfer scroll guide along the timeline line with scroll velocity tilt
      if (rocketRef.current && lineRef.current) {
        gsap.fromTo(
          rocketRef.current,
          { y: 0 },
          {
            y: () => {
              // Travel the full height of the timeline container
              return lineRef.current ? lineRef.current.clientHeight : 600;
            },
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
              onUpdate: (self) => {
                const velocity = self.getVelocity(); // Scroll speed in px/s
                
                // Map velocity to rotation angle (lean forward/backward)
                const targetRotation = Math.max(-12, Math.min(12, velocity * 0.003));
                
                gsap.to(rocketRef.current, {
                  rotation: targetRotation,
                  duration: 0.2,
                  ease: 'power1.out',
                  overwrite: 'auto',
                });

                // Clear existing timeout
                if ((self as any).resetTimeout) {
                  clearTimeout((self as any).resetTimeout);
                }

                // Reset back to level position with an elastic ease when scroll stops
                (self as any).resetTimeout = setTimeout(() => {
                  gsap.to(rocketRef.current, {
                    rotation: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1.1, 0.6)',
                    overwrite: 'auto',
                  });
                }, 80);
              },
            },
          }
        );
      }

      // Animate each timeline card to slide in (responsive direction)
      const isDesktop = window.innerWidth >= 768;
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isEven = index % 2 === 0;
        const xOffset = isDesktop ? (isEven ? -30 : 30) : 30;

        gsap.from(card, {
          y: 40,
          x: xOffset,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 bg-surface"
    >
      {/* Section header */}
      <div className="max-w-5xl mx-auto font-sans mb-16 md:mb-24">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-indigo mb-4">
          Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
          My Path So Far
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Background Track Line (Full Height) - Responsive position */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-slate-100 z-0" />

        {/* Animated Active colored gradient line - Responsive position */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 origin-top z-10"
          style={{
            background:
              'linear-gradient(180deg, #4F46E5 0%, #6366F1 40%, #06B6D4 70%, #8B5CF6 100%)',
          }}
        />

        {/* Surfer Boy Scroll Guide (small, circular medallion riding the line) */}
        <div
          ref={rocketRef}
          className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 select-none pointer-events-none"
        >
          {/* Inner container with floating bobbing animation - borders & cropping are defined here */}
          <div className="w-full h-full rounded-full border-2 border-accent-indigo bg-white shadow-premium overflow-hidden flex items-center justify-center animate-float">
            <img
              src="/journey_surfer.jpg"
              alt="Surfer boy scroll indicator guide"
              className="w-full h-full object-cover scale-[1.05]"
            />
          </div>
        </div>

        {/* Entries */}
        <div className="flex flex-col gap-12 md:gap-16">
          {timelineData.map((entry, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex items-start md:items-center min-h-[120px]"
              >
                {/* Mobile circle node on left line */}
                <div className="md:hidden absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-3.5 h-3.5 rounded-full bg-accent-indigo ring-4 ring-white shadow-[0_0_10px_rgba(79,70,229,0.3)]" />
                </div>

                {/* Desktop circle node on center line */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-3.5 h-3.5 rounded-full bg-accent-indigo ring-4 ring-white shadow-[0_0_10px_rgba(79,70,229,0.3)]" />
                </div>

                {/* Mobile layout: always to the right */}
                <div className="md:hidden pl-10 w-full">
                  <div
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                  >
                    <TimelineCard entry={entry} />
                  </div>
                </div>

                {/* Desktop layout: alternating */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-16 w-full">
                  {isEven ? (
                    <>
                      {/* Content on the left */}
                      <div
                        ref={(el) => {
                          cardsRef.current[index] = el;
                        }}
                        className="flex justify-end"
                      >
                        <TimelineCard entry={entry} />
                      </div>
                      {/* Empty right */}
                      <div />
                    </>
                  ) : (
                    <>
                      {/* Empty left */}
                      <div />
                      {/* Content on the right */}
                      <div
                        ref={(el) => {
                          cardsRef.current[index] = el;
                        }}
                        className="flex justify-start"
                      >
                        <TimelineCard entry={entry} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const Icon = entry.icon;
  return (
    <div className="glass-panel rounded-xl p-6 max-w-md w-full border border-border-light shadow-premium hover:shadow-premium-hover transition-all duration-300">
      <span className="text-xs font-semibold text-accent-indigo bg-accent-indigo/5 rounded-full px-3 py-1 inline-block mb-3">
        {entry.year}
      </span>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-accent-indigo h-8 flex items-center justify-start" aria-hidden="true">
          <Icon size={22} className="stroke-[1.5]" />
        </div>
        <h3 className="text-lg font-bold text-text-primary tracking-tight">{entry.title}</h3>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed font-sans">
        {entry.description}
      </p>
    </div>
  );
}
