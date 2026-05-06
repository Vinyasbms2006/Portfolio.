import { ReactLenis } from 'lenis/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  return (
    <ReactLenis root>
      <Navbar />
      
      <main className="min-h-screen relative z-10 bg-charcoal">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </ReactLenis>
  );
}

export default App;
