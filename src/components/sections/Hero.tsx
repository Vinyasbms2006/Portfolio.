import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const text1 = useRef<HTMLHeadingElement>(null);
  const text2 = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Initial load animation
    const tl = gsap.timeline();
    tl.from([text1.current, text2.current], {
      y: 150,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.2
    });

    // Scroll animation for parallax
    gsap.to(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      opacity: 0,
    });
  }, { scope: container });

  return (
    <section id="hero" ref={container} className="h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 overflow-hidden">
      <div className="overflow-hidden p-2">
        <h1 ref={text1} className="text-6xl md:text-[10vw] leading-none font-bold tracking-tighter uppercase">
          Software
        </h1>
      </div>
      <div className="overflow-hidden p-2">
        <h1 ref={text2} className="text-6xl md:text-[10vw] leading-none font-bold tracking-tighter uppercase text-accent-purple">
          Engineering
        </h1>
      </div>
      <p className="mt-8 text-lg text-gray-400 max-w-lg mx-auto opacity-80">
        Computer Science student passionate about building scalable applications and intuitive user interfaces.
      </p>
    </section>
  );
}
