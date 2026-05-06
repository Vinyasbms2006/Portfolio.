import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDot.current;
    const outline = cursorOutline.current;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(outline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power4.out',
      });
    };

    const onMouseEnter = () => {
      gsap.to(outline, { scale: 1.5, backgroundColor: 'rgba(139, 92, 246, 0.1)' });
    };

    const onMouseLeave = () => {
      gsap.to(outline, { scale: 1, backgroundColor: 'transparent' });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Add hover effects to interactive elements (delayed to allow rendering)
    setTimeout(() => {
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach((el) => {
          el.addEventListener('mouseenter', onMouseEnter);
          el.addEventListener('mouseleave', onMouseLeave);
        });
    }, 500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-2 h-2 bg-accent-purple rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorOutline}
        className="fixed top-0 left-0 w-10 h-10 border border-accent-purple rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
