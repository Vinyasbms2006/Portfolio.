import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import ExplorationLab from './components/sections/ExplorationLab';
import Timeline from './components/sections/Timeline';
import Contact from './components/sections/Contact';

// UI
import SectionTransition from './components/ui/SectionTransition';

// Scroll Restoration helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset window scroll position
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ── Views ──

const Home = () => (
  <>
    <Hero />
    <SectionTransition variant="aurora" />
    <About isTeaser={true} />
  </>
);

const ProjectsPage = () => (
  <>
    <Projects />
    <SectionTransition variant="dots" />
    <ExplorationLab />
  </>
);

const JourneyPage = () => (
  <>
    <Timeline />
  </>
);

function App() {
  return (
    <ReactLenis root>
      <HashRouter>
        <ScrollToTop />
        <CustomCursor />
        <Navbar />
        
        <main className="relative z-10 bg-surface min-h-screen flex flex-col justify-between">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          
          {/* Universal Footer CTA and Links */}
          <div>
            <SectionTransition variant="aurora" />
            <Contact />
            <Footer />
          </div>
        </main>
      </HashRouter>
    </ReactLenis>
  );
}

export default App;
