import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section id="contact" ref={container} className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center relative z-10 overflow-hidden">
      <h2 ref={headingRef} className="text-6xl md:text-[8vw] leading-none font-bold tracking-tighter uppercase mb-12">
        Hire <span className="text-accent-purple">Me</span>
      </h2>
      <p className="text-gray-400 max-w-md mx-auto mb-10">
        I am currently looking for an internship or junior developer role. Let's connect!
      </p>
      <button className="px-10 py-5 bg-white text-charcoal rounded-full font-bold uppercase tracking-widest hover:bg-accent-blue hover:text-white transition-all duration-500 hover:scale-105">
        Email Me
      </button>
    </section>
  );
}
