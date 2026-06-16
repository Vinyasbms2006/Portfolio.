import React from 'react';

interface SectionTransitionProps {
  variant?: 'gradient' | 'dots' | 'aurora';
}

const SectionTransition: React.FC<SectionTransitionProps> = ({ variant = 'gradient' }) => {
  if (variant === 'dots') {
    return (
      <div className="w-full h-20 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="flex gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo opacity-40 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent-violet opacity-60 animate-pulse [animation-delay:0.2s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-80 animate-pulse [animation-delay:0.4s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent-purple opacity-60 animate-pulse [animation-delay:0.6s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue opacity-40 animate-pulse [animation-delay:0.8s]" />
        </div>
      </div>
    );
  }

  if (variant === 'aurora') {
    return (
      <div className="relative w-full h-[120px] overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 aurora-gradient opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-24 bg-accent-indigo/5 blur-3xl rounded-full" />
      </div>
    );
  }

  // Default: 'gradient'
  return (
    <div className="w-full h-20 flex items-center justify-center pointer-events-none" aria-hidden="true">
      <div className="w-3/5 h-[1px] bg-gradient-to-r from-transparent via-accent-indigo/25 via-accent-cyan/25 to-transparent" />
    </div>
  );
};

export default SectionTransition;
