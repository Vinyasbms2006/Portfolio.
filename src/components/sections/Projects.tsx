import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ExternalLink } from 'lucide-react';
import GlassCard from '../ui/GlassCard';




/* ── GitHub SVG icon ── */
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

/* ── Project data ── */
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  gradient: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Drop by Drop',
    category: 'Client Project • In Progress',
    description:
      'A portfolio website for a leading rainwater harvesting company in Bengaluru. Recognized and approved by BBMP. Showcasing their innovative water conservation projects across the city.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: '#',
    live: '#',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    featured: true,
  },
  {
    id: 2,
    title: 'Doctor Appointment App',
    category: 'Full Stack Application',
    description:
      'A comprehensive doctor appointment booking platform enabling patients to discover, schedule, and manage medical consultations seamlessly.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: '#',
    live: '#',
    gradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    id: 3,
    title: 'AI Study Assistant',
    category: 'AI-Powered Application',
    description:
      'Leveraging OpenAI API to generate personalized study plans, interactive quizzes, and smart flashcards from lecture notes.',
    tech: ['React', 'OpenAI API', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
    gradient: 'from-indigo-500/10 to-blue-500/10',
  },
  {
    id: 4,
    title: 'Algorithms Visualizer',
    category: 'Educational Tool',
    description:
      'An interactive visualization tool for sorting and pathfinding algorithms, designed to make complex data structures intuitive.',
    tech: ['React', 'TypeScript', 'Canvas API'],
    github: '#',
    live: '#',
    gradient: 'from-emerald-500/10 to-teal-500/10',
  },
];

/* ── Component ── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLDivElement>('.project-card');

      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen bg-surface-white py-24 md:py-32 px-6 md:px-16 lg:px-24"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-indigo mb-4">
          Projects
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-16">
          Selected Work
        </h2>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

/* ── Single Project Card ── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`project-card ${project.featured ? 'md:col-span-2' : ''}`}
      style={{ opacity: 0 }}
    >
      <GlassCard tilt glowOnHover className="flex flex-col h-full">
        {/* Gradient hero area */}
        <div
          className={`relative overflow-hidden shrink-0 ${
            project.featured ? 'h-64' : 'h-48'
          } bg-gradient-to-br ${project.gradient}`}
        >
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-60" />

          {/* Decorative shapes */}
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 blur-xl group-hover:scale-110 transition-transform duration-700" />

          {/* Inner content scales on hover */}
          <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
          <div>
            {/* Category badge */}
            <span className="text-xs font-medium text-accent-indigo bg-accent-indigo/5 rounded-full px-3 py-1 inline-block mb-4">
              {project.category}
            </span>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 bg-surface rounded-full text-text-tertiary border border-border-light"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              <a
                href={project.github}
                aria-label={`View ${project.title} source code on GitHub`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border-light text-text-tertiary hover:text-accent-indigo hover:border-accent-indigo/30 transition-colors duration-300"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={project.live}
                aria-label={`View ${project.title} live site`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border-light text-text-tertiary hover:text-accent-indigo hover:border-accent-indigo/30 transition-colors duration-300"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
