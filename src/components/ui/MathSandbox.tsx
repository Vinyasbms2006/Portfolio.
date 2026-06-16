import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, HelpCircle } from 'lucide-react';

type FormulaType = 'clifford' | 'flowfield' | 'lorenz' | 'gravity';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const MathSandbox: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [formula, setFormula] = useState<FormulaType>('flowfield');
  const [speed, setSpeed] = useState<number>(1.2);
  const [frequency, setFrequency] = useState<number>(0.005);
  const [chaos, setChaos] = useState<number>(2.5);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showFormulaInfo, setShowFormulaInfo] = useState<boolean>(false);

  // Particle list
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean }>({ x: 0, y: 0, isDown: false });

  // Math equations displayed in monospace typewriter style
  const FORMULA_METADATA = {
    clifford: {
      name: 'Clifford Attractor Map',
      equation: 'x[n+1] = sin(a * y) + c * cos(a * x)\ny[n+1] = sin(b * x) + d * cos(b * y)',
      description: 'A chaotic polynomial mapping that creates beautiful, clustered dust-cloud shapes using trigonometric recursion.',
    },
    flowfield: {
      name: 'Trigonometric Vector Field',
      equation: 'θ = sin(x * f) * cos(y * f) * chaos\nF = (cos(θ), sin(θ))',
      description: 'An equations-based flow field where the direction of motion at any point is governed by cross-frequency sine/cosine waves.',
    },
    lorenz: {
      name: 'Lorenz Chaotic Attractor',
      equation: 'dx/dt = σ*(y-x), dy/dt = x*(ρ-z)-y, dz/dt = x*y-β*z',
      description: 'A projection of the famous 3D atmospheric convection system of differential equations showing deterministic chaos.',
    },
    gravity: {
      name: 'Lagrangian Orbital Gravity',
      equation: 'a = G * M / (r^2 + ε)\nF = -grad(V)',
      description: 'A mathematical gravity simulation where particles are attracted to orbital nodes and your cursor, governed by inverse-square laws.',
    },
  };

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight || 450;
      initParticles(canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [formula]); // Re-init on formula change as they require different scales

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const count = formula === 'clifford' ? 1200 : 350; // Clifford looks better with high density

    const colors = [
      'rgba(79, 70, 229, 0.35)',  // Accent Indigo
      'rgba(99, 102, 241, 0.3)',   // Accent Violet
      'rgba(6, 182, 212, 0.35)',  // Accent Cyan
      'rgba(139, 92, 246, 0.35)', // Accent Purple
      'rgba(59, 130, 246, 0.3)',   // Accent Blue
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 200,
        maxLife: 150 + Math.random() * 150,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current = particles;
  };

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lorenzTime = 0;

    // Lorenz specific state
    let lorenzPoints: { x: number; y: number; z: number }[] = [];

    const draw = () => {
      if (isPaused) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Draw faint background to create beautiful path trails
      ctx.fillStyle = formula === 'clifford' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // ── Clifford Attractor Mapping ──
      if (formula === 'clifford') {
        // Clifford Constants
        const a = 1.5 + frequency * 100;
        const b = 1.6 + chaos * 0.2;
        const c = 1.2 + speed * 0.1;
        const d = 1.5;

        particles.forEach((p) => {
          // Normal map space
          const nx = (p.x - w / 2) / (w / 4);
          const ny = (p.y - h / 2) / (h / 4);

          // Apply Clifford formula
          const nextX = Math.sin(a * ny) + c * Math.cos(a * nx);
          const nextY = Math.sin(b * nx) + d * Math.cos(b * ny);

          // Convert back to canvas coordinate space
          p.x = w / 2 + nextX * (w / 6);
          p.y = h / 2 + nextY * (h / 6);

          // Render
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      }

      // ── Flow Field (Sine / Cosine Wave equations) ──
      else if (formula === 'flowfield') {
        particles.forEach((p) => {
          // Angle calculated using sin/cos of frequency scaling
          const angle = Math.sin(p.x * frequency) * Math.cos(p.y * frequency) * chaos * Math.PI;

          p.vx += Math.cos(angle) * 0.12 * speed;
          p.vy += Math.sin(angle) * 0.12 * speed;

          // Mouse Attraction / Repulsion
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Push away on click, gently attract on hover
            const factor = mouse.isDown ? -0.8 : 0.25;
            p.vx += (dx / dist) * force * factor;
            p.vy += (dy / dist) * force * factor;
          }

          // Apply friction
          p.vx *= 0.95;
          p.vy *= 0.95;

          p.x += p.vx;
          p.y += p.vy;
          p.life++;

          // Reset when particle goes offscreen or dies
          if (p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.life > p.maxLife) {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
            p.vx = 0;
            p.vy = 0;
            p.life = 0;
          }

          ctx.beginPath();
          ctx.moveTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        });
      }

      // ── Lorenz Attractor 3D projection ──
      else if (formula === 'lorenz') {
        // Numerical Integration parameters
        const sigma = 10;
        const beta = 8/3;
        const rho = 28 + (frequency - 0.005) * 1000; // adjust rho via frequency slider

        // Simulate 3 Lorenz attractors with slightly different starting points to show sensitivity
        if (lorenzPoints.length === 0) {
          lorenzPoints = [
            { x: 0.1, y: 0, z: 0 },
            { x: 0.101, y: 0, z: 0 },
            { x: 0.099, y: 0, z: 0 },
          ].map(p => ({ ...p }));
        }

        const dt = 0.008 * speed;

        for (let step = 0; step < 4; step++) { // multiple sub-steps per frame for smooth drawing
          lorenzPoints.forEach((p, idx) => {
            const dx = sigma * (p.y - p.x) * dt;
            const dy = (p.x * (rho - p.z) - p.y) * dt;
            const dz = (p.x * p.y - beta * p.z) * dt;

            const nextX = p.x + dx;
            const nextY = p.y + dy;
            const nextZ = p.z + dz;

            // Project 3D Lorenz to 2D
            // Rotate slightly over time for a 3D rotation effect
            lorenzTime += 0.00002;
            const cosTime = Math.cos(lorenzTime * chaos);
            const sinTime = Math.sin(lorenzTime * chaos);
            
            // X-Y rotation + scaling to fit canvas
            const rotX = nextX * cosTime - nextY * sinTime;
            const cx = w / 2 + rotX * 8;
            const cy = h / 2 + (nextZ - 25) * 7; // offset center Z axis

            p.x = nextX;
            p.y = nextY;
            p.z = nextZ;

            // Draw trails
            ctx.beginPath();
            ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
            
            const colorPalette = [
              'rgba(79, 70, 229, 0.4)', // Indigo
              'rgba(6, 182, 212, 0.4)',  // Cyan
              'rgba(139, 92, 246, 0.4)', // Purple
            ];
            ctx.fillStyle = colorPalette[idx];
            ctx.fill();
          });
        }
      }

      // ── Gravity Orbitals (Lagrangian Attractors) ──
      else if (formula === 'gravity') {
        // Attractor nodes (one central node, one orbiting node, and the mouse)
        const orbitals = [
          { x: w / 2, y: h / 2, mass: 120 * chaos },
          { 
            x: w / 2 + Math.cos(Date.now() * 0.001) * 150, 
            y: h / 2 + Math.sin(Date.now() * 0.001) * 150, 
            mass: 50 * speed 
          }
        ];

        // Add mouse as a strong gravity well if hovering
        if (mouse.x > 0 && mouse.x < w && mouse.y > 0 && mouse.y < h) {
          orbitals.push({
            x: mouse.x,
            y: mouse.y,
            mass: mouse.isDown ? -250 : 150, // repel if clicked, attract if hovering
          });
        }

        // Render gravity source nodes as faint glows
        orbitals.forEach((orb) => {
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, Math.abs(orb.mass) * 0.15, 0, Math.PI * 2);
          ctx.fillStyle = orb.mass > 0 ? 'rgba(79, 70, 229, 0.03)' : 'rgba(239, 68, 68, 0.03)';
          ctx.fill();
        });

        particles.forEach((p) => {
          orbitals.forEach((orb) => {
            const dx = orb.x - p.x;
            const dy = orb.y - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist > 8) {
              // G * M / (r^2 + epsilon) -> epsilon avoids infinite forces at close distances
              const force = orb.mass / (distSq + 2000);
              p.vx += (dx / dist) * force * speed;
              p.vy += (dy / dist) * force * speed;
            }
          });

          // Apply resistance/friction
          p.vx *= 0.98;
          p.vy *= 0.98;

          p.x += p.vx;
          p.y += p.vy;

          // Reset if particle goes far offscreen
          if (p.x < -100 || p.x > w + 100 || p.y < -100 || p.y > h + 100) {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
            p.vx = (Math.random() - 0.5) * 2;
            p.vy = (Math.random() - 0.5) * 2;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [formula, speed, frequency, chaos, isPaused]);

  // Handle Mouse Events
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handleMouseDown = () => {
    mouseRef.current.isDown = true;
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initParticles(canvas.width, canvas.height);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 max-w-6xl mx-auto my-8">
      {/* ── Visual Playground Canvas ── */}
      <div 
        ref={containerRef}
        className="flex-grow bg-white border border-border-light rounded-2xl relative shadow-premium overflow-hidden min-h-[450px]"
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="absolute inset-0 block w-full h-full cursor-crosshair select-none"
        />

        {/* Floating Equation Monospace HUD */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none bg-white/85 backdrop-blur-sm px-4 py-3 rounded-lg border border-border-light max-w-xs md:max-w-md">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-indigo">
            Active System: {FORMULA_METADATA[formula].name}
          </p>
          <pre className="text-xs font-mono text-text-primary mt-1.5 whitespace-pre-wrap leading-tight">
            {FORMULA_METADATA[formula].equation}
          </pre>
        </div>

        {/* Attractor Interaction Indicator */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-text-secondary">
          ⚡ Mouse attracts • Click to repel/scramble
        </div>
      </div>

      {/* ── Controls Sidebar ── */}
      <div className="w-full md:w-80 shrink-0 glass-panel rounded-2xl p-6 flex flex-col justify-between border border-border-light shadow-premium">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-text-primary">
              Physics Controls
            </h3>
            <button 
              onClick={() => setShowFormulaInfo(!showFormulaInfo)}
              className="text-text-tertiary hover:text-accent-indigo transition-colors"
              title="Formula Details"
            >
              <HelpCircle size={18} />
            </button>
          </div>

          {/* Description Overlay */}
          {showFormulaInfo && (
            <div className="mb-4 bg-accent-indigo/5 border border-accent-indigo/10 p-3 rounded-lg text-xs text-text-secondary leading-relaxed">
              <strong>{FORMULA_METADATA[formula].name}</strong>: {FORMULA_METADATA[formula].description}
            </div>
          )}

          {/* Formula Select Pills */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-xs font-semibold text-text-secondary mb-1">
              Select Mathematics Map
            </label>
            {(Object.keys(FORMULA_METADATA) as FormulaType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFormula(type)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium border transition-all duration-300 ${
                  formula === type
                    ? 'bg-accent-indigo text-white border-accent-indigo shadow-sm'
                    : 'bg-white border-border-light text-text-secondary hover:border-border-medium hover:text-text-primary'
                }`}
              >
                {FORMULA_METADATA[type].name}
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-1 font-medium">
                <span>Speed / Delta-T</span>
                <span className="font-mono">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-border-light rounded-lg appearance-none cursor-pointer accent-accent-indigo"
              />
            </div>

            {formula !== 'gravity' && (
              <div>
                <div className="flex justify-between text-xs text-text-secondary mb-1 font-medium">
                  <span>Frequency scale (f)</span>
                  <span className="font-mono">{frequency.toFixed(4)}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.015"
                  step="0.0005"
                  value={frequency}
                  onChange={(e) => setFrequency(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-border-light rounded-lg appearance-none cursor-pointer accent-accent-indigo"
                />
              </div>
            )}

            {formula !== 'clifford' && (
              <div>
                <div className="flex justify-between text-xs text-text-secondary mb-1 font-medium">
                  {formula === 'gravity' ? <span>G-Mass Constant</span> : <span>Chaos Coefficient</span>}
                  <span className="font-mono">{chaos.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.5"
                  step="0.1"
                  value={chaos}
                  onChange={(e) => setChaos(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-border-light rounded-lg appearance-none cursor-pointer accent-accent-indigo"
                />
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-4 border-t border-border-light pt-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 bg-text-primary text-white hover:bg-accent-indigo rounded-lg text-xs font-semibold transition-all duration-300"
          >
            {isPaused ? (
              <>
                <Play size={14} /> Resume
              </>
            ) : (
              <>
                <Pause size={14} /> Pause
              </>
            )}
          </button>

          <button
            onClick={resetCanvas}
            className="flex items-center justify-center p-2.5 bg-white border border-border-medium hover:border-text-primary text-text-secondary hover:text-text-primary rounded-lg text-xs font-semibold transition-all duration-300"
            title="Reset Particles"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathSandbox;
