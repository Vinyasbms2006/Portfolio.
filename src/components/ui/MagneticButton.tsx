import { useRef, useCallback, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-gradient-to-r from-accent-indigo to-accent-violet text-white rounded-full shadow-premium',
  secondary:
    'glass-panel border border-border-medium text-text-primary rounded-full',
  ghost:
    'bg-transparent text-text-secondary hover:text-accent-indigo rounded-full',
};

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  href,
  onClick,
  variant = 'primary',
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const magneticZone = 100;
  const maxOffset = 8;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const outerRadius = magneticZone + Math.max(rect.width, rect.height) / 2;

      if (distance < outerRadius) {
        const strength = 1 - distance / outerRadius;
        const offsetX = (distX / outerRadius) * maxOffset * strength;
        const offsetY = (distY / outerRadius) * maxOffset * strength;

        gsap.to(el, {
          x: offsetX,
          y: offsetY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  }, []);

  const baseClasses = `inline-flex items-center justify-center px-8 py-4 font-medium tracking-wide text-sm cursor-pointer select-none ${variantStyles[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
