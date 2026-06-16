import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Server, Compass, Cloud, Smartphone, Orbit } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationCard {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  status: string;
}

const explorations: ExplorationCard[] = [
  {
    icon: Bot,
    title: 'Artificial Intelligence',
    description:
      'Exploring neural networks, natural language processing, and building AI-powered applications that augment human capabilities.',
    status: 'Actively Learning',
  },
  {
    icon: Server,
    title: 'Full-Stack Development',
    description:
      'Deepening expertise in the MERN stack, serverless architectures, and modern web technologies for production-grade applications.',
    status: 'Building',
  },
  {
    icon: Compass,
    title: 'Human-Computer Interaction',
    description:
      'Fascinated by how humans interact with technology. Designing interfaces that feel intuitive, accessible, and delightful.',
    status: 'Exploring',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Learning cloud infrastructure, containerization with Docker, and CI/CD pipelines for scalable deployments.',
    status: 'Learning',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Building cross-platform mobile experiences with React Native, focusing on performance and native-feel interactions.',
    status: 'Experimenting',
  },
  {
    icon: Orbit,
    title: 'Emerging Technologies',
    description:
      'Keeping pulse on Web3, AR/VR, quantum computing, and other technologies shaping the future of computing.',
    status: 'Watching',
  },
];

export default function ExplorationLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="exploration"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-surface-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-indigo mb-4">
          Exploration Lab
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
          What Excites Me
        </h2>
        <p className="text-lg text-text-secondary mb-16 max-w-2xl">
          Areas I&apos;m currently diving into, experimenting with, and building
          towards.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {explorations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="h-full"
              >
                <GlassCard tilt glowOnHover className="p-8 flex flex-col justify-between h-full">
                  <div>
                    {/* Top row: icon + status */}
                    <div className="flex justify-between items-center">
                      <div className="text-accent-indigo h-8 flex items-center justify-start" aria-hidden="true">
                        <Icon size={28} className="stroke-[1.5]" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-indigo bg-accent-indigo/5 rounded-full px-2.5 py-1">
                        {item.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-text-primary mt-6">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="h-0.5 w-full mt-6 rounded-full bg-gradient-to-r from-accent-indigo/20 via-accent-cyan/20 to-transparent" />
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
