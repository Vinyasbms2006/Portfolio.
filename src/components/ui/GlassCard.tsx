import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glowOnHover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  tilt = false,
  glowOnHover = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Normalize to -1..1 range and apply max rotation of 8 degrees
    const maxRotation = 8;
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);

    setRotateY(normalizedX * maxRotation);
    setRotateX(-normalizedY * maxRotation);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        className={`glass-panel rounded-2xl overflow-hidden h-full ${
          glowOnHover
            ? 'transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.12),0_0_60px_rgba(79,70,229,0.06)]'
            : ''
        } ${className}`}
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: tilt ? rotateX : 0,
          rotateY: tilt ? rotateY : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default GlassCard;
