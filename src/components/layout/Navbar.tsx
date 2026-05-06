import { Menu } from 'lucide-react';

const Github = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.38 6.52-1.6 6.52-7.01 0-1.5-.5-2.7-1.3-3.7.13-.3.5-1.7-.13-3.6 0 0-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C7.3 1.7 6.3 2 6.3 2c-.6 1.9-.2 3.3-.1 3.6A5.4 5.4 0 0 0 4.9 9.3c0 5.4 3.3 6.6 6.5 7.02a4.8 4.8 0 0 0-1 3.03V22"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Navbar() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center text-white mix-blend-difference pointer-events-none">
      <div className="text-xl md:text-2xl font-bold tracking-tighter uppercase">Student.</div>
      
      <div className="hidden md:flex gap-8 pointer-events-auto items-center">
        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-sm font-medium hover:text-accent-purple transition-colors uppercase tracking-wider">About & Skills</a>
        <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="text-sm font-medium hover:text-accent-purple transition-colors uppercase tracking-wider">Projects</a>
        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="text-sm font-medium hover:text-accent-purple transition-colors uppercase tracking-wider">Contact</a>
        
        <div className="w-px h-4 bg-gray-500 mx-2"></div>
        
        <a href="https://github.com/Vinyasbms2006" target="_blank" rel="noreferrer" className="hover:text-accent-purple transition-colors" aria-label="GitHub">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/vinyas-d-t-30404533a" target="_blank" rel="noreferrer" className="hover:text-accent-purple transition-colors" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
      </div>

      <button className="md:hidden p-2 hover:opacity-70 transition-opacity pointer-events-auto group">
        <Menu size={28} className="group-hover:text-accent-purple transition-colors" />
      </button>
    </nav>
  );
}
