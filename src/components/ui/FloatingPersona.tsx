import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FloatingPersona: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion spring values for smooth mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 20, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Define 3D rotation and translation offsets based on mouse positions
  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

  const avatarX = useTransform(springX, [-300, 300], [15, -15]);
  const avatarY = useTransform(springY, [-300, 300], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      mouseX.set(Math.max(Math.min(deltaX, 350), -350));
      mouseY.set(Math.max(Math.min(deltaY, 350), -350));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-[400px] h-[400px] flex items-center justify-center pointer-events-none select-none"
      style={{ perspective: '1000px' }}
    >
      {/* ── Perspective Parent Container ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Decorative central glowing background radial wash */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent-indigo/10 blur-[80px] z-0" />

        {/* Orbit Rings (Embedded mathematical graphics to frame the avatar) */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <svg className="w-[340px] h-[340px] text-accent-indigo/15 animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 4" />
            <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 5" />
          </svg>
        </div>

        {/* Outer Orbit Rings (Rotating in opposite direction) */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <svg className="w-[390px] h-[390px] text-accent-cyan/10 animate-[spin_60s_linear_reverse_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 50 2 A 48 48 0 0 1 98 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 50 98 A 48 48 0 0 1 2 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* ── Floating Curious Coder Avatar ── */}
        <motion.div
          style={{
            x: avatarX,
            y: avatarY,
            transformStyle: 'preserve-3d',
            translateZ: '30px',
          }}
          className="relative w-[280px] h-[280px] flex items-center justify-center z-10"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* Blended drop shadow and filter */}
            <img
              src="/floating_coder.png"
              alt="Floating Coder Character"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(79,70,229,0.2)] select-none pointer-events-none"
            />
          </motion.div>
        </motion.div>

        {/* Floating tech nodes connected to avatar */}
        <motion.div
          style={{
            x: useTransform(springX, [-300, 300], [-10, 10]),
            y: useTransform(springY, [-300, 300], [-15, 15]),
            translateZ: '60px',
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-8 bg-white/70 backdrop-blur-md border border-border-light px-3 py-1 rounded-full text-[9px] font-mono text-text-secondary shadow-sm z-20"
        >
          const state = &apos;exploring&apos;
        </motion.div>

        <motion.div
          style={{
            x: useTransform(springX, [-300, 300], [25, -25]),
            y: useTransform(springY, [-300, 300], [10, -10]),
            translateZ: '40px',
          }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-4 bg-white/70 backdrop-blur-md border border-border-light px-3 py-1 rounded-full text-[9px] font-mono text-text-secondary shadow-sm z-20"
        >
          12.9716° N, 77.5946° E
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FloatingPersona;
