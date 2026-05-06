import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function About() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Background color shift for the main wrapper
    gsap.to('main', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      backgroundColor: '#0f0c29', // dark purple gradient feel
    });

    // Text reveal logic
    const splitText = textRef.current?.innerText.split(' ') || [];
    if (textRef.current) {
        textRef.current.innerHTML = '';
        splitText.forEach((word) => {
            const span = document.createElement('span');
            span.innerText = word + ' ';
            span.style.opacity = '0.2';
            span.style.transition = 'opacity 0.1s';
            textRef.current?.appendChild(span);
        });

        const spans = textRef.current.querySelectorAll('span');
        
        gsap.to(spans, {
            scrollTrigger: {
                trigger: container.current,
                start: 'top 70%',
                end: 'bottom 80%',
                scrub: 1,
            },
            opacity: 1,
            stagger: 0.1,
            color: '#ffffff'
        });
    }

  }, { scope: container });

  return (
    <section id="about" ref={container} className="min-h-screen flex flex-col justify-center p-6 md:p-24 relative z-10">
      <div className="max-w-5xl mb-16">
        <h2 className="text-sm font-bold tracking-widest uppercase text-accent-purple mb-8">About & Skills</h2>
        <p ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-gray-500">
          I am a dedicated student eager to bring theoretical knowledge into practical solutions. Proficient in React, TypeScript, Node.js, and Python. Always learning, building, and exploring new technologies.
        </p>
      </div>
      
      {/* Static Skills List for Extra Detail */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full border-t border-gray-800 pt-16">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Frontend</h3>
          <ul className="text-gray-400 space-y-2">
            <li>React & Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>HTML/CSS</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Backend</h3>
          <ul className="text-gray-400 space-y-2">
            <li>Node.js</li>
            <li>Express</li>
            <li>Python</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Tools</h3>
          <ul className="text-gray-400 space-y-2">
            <li>Git & GitHub</li>
            <li>Docker</li>
            <li>Figma</li>
            <li>VS Code</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Coursework</h3>
          <ul className="text-gray-400 space-y-2">
            <li>Data Structures</li>
            <li>Algorithms</li>
            <li>Web Development</li>
            <li>Databases</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
