import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ExternalLink } from 'lucide-react';

const Github = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.38 6.52-1.6 6.52-7.01 0-1.5-.5-2.7-1.3-3.7.13-.3.5-1.7-.13-3.6 0 0-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C7.3 1.7 6.3 2 6.3 2c-.6 1.9-.2 3.3-.1 3.6A5.4 5.4 0 0 0 4.9 9.3c0 5.4 3.3 6.6 6.5 7.02a4.8 4.8 0 0 0-1 3.03V22"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>
);

const projects = [
  { 
    id: 1, 
    title: 'AI Study Assistant', 
    description: 'A full-stack web application leveraging the OpenAI API to generate customized study plans, quizzes, and flashcards from lecture notes. Built with React, Node.js, and MongoDB.', 
    category: 'Full Stack App', 
    link: '#', 
    github: '#' 
  },
  { 
    id: 2, 
    title: 'Campus Event Tracker', 
    description: 'A cross-platform mobile application built with React Native that helps students discover and track local campus events in real-time. Features interactive maps and push notifications.', 
    category: 'Mobile App', 
    link: '#', 
    github: '#' 
  },
  { 
    id: 3, 
    title: 'Algorithms Visualizer', 
    description: 'An interactive web tool built in React and TypeScript to visualize sorting and pathfinding algorithms. Designed to help peers understand complex data structures visually.', 
    category: 'Web App', 
    link: '#', 
    github: '#' 
  },
];

export default function Projects() {
  const container = useRef<HTMLElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.project-card');
    
    // Horizontal scroll timeline
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1), // Optional: snaps to sections
        end: () => `+=${container.current?.offsetWidth || 0 * sections.length}`, 
      }
    });
  }, { scope: container });

  return (
    <section id="projects" ref={container} className="h-screen w-full overflow-hidden bg-charcoal flex flex-col relative z-10">
      <div className="absolute top-24 left-6 md:left-24 z-20">
        <h2 className="text-sm font-bold tracking-widest uppercase text-accent-purple">Academic & Personal Projects</h2>
      </div>
      
      <div 
        ref={scrollWrapper} 
        className="flex h-full w-max mt-16 md:mt-0"
      >
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card w-screen h-full flex items-center justify-center p-6 md:p-24 shrink-0"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-6xl items-center">
              <div className="w-full md:w-[55%] aspect-video bg-gray-800 rounded-xl overflow-hidden relative group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-105 transition-transform duration-700 ease-out" />
                <span className="absolute inset-0 flex items-center justify-center text-gray-500 z-10 group-hover:text-white transition-colors duration-500">Project Screenshot</span>
              </div>
              <div className="w-full md:w-[45%] flex flex-col items-start">
                <p className="text-xs md:text-sm text-gray-400 mb-3 uppercase tracking-widest">{project.category}</p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 md:mb-6 leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href={project.link} className="flex items-center gap-2 px-6 py-3 bg-white text-charcoal rounded-full text-xs font-bold uppercase tracking-wider hover:bg-accent-blue hover:text-white transition-all duration-300">
                    <span>View Project</span>
                    <ExternalLink size={16} />
                  </a>
                  <a href={project.github} className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-full text-xs font-bold uppercase tracking-wider hover:border-white transition-colors duration-300">
                    <Github size={16} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
