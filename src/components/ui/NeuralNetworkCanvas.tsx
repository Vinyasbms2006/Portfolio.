import { useRef, useEffect, useCallback } from 'react';

interface NeuralNetworkCanvasProps {
  className?: string;
  nodeCount?: number;
  interactivePhysics?: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const NeuralNetworkCanvas: React.FC<NeuralNetworkCanvasProps> = ({
  className = '',
  nodeCount = 65,
  interactivePhysics = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const CONNECTION_DISTANCE = 160;

  const createNodes = useCallback(
    (width: number, height: number): Node[] => {
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.15;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.5 + Math.random() * 2.5,
          opacity: 0.15 + Math.random() * 0.15,
        });
      }
      return nodes;
    },
    [nodeCount]
  );

  const updateNodes = useCallback(
    (nodes: Node[], width: number, height: number) => {
      const mouse = mouseRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (interactivePhysics && mouse.active) {
          // ── Vortex Attractor Physics ──
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 320 && dist > 0) {
            const force = (320 - dist) / 320; // stronger pull when closer
            
            // Tangential unit vectors (orbit direction)
            const orbitalX = -dy / dist;
            const orbitalY = dx / dist;

            // Pull towards the cursor
            node.vx += (dx / dist) * force * 0.08;
            node.vy += (dy / dist) * force * 0.08;

            // Swirl around the cursor
            node.vx += orbitalX * force * 0.22;
            node.vy += orbitalY * force * 0.22;
          }

          // Apply drag to keep swirling orbits stable
          node.vx *= 0.96;
          node.vy *= 0.96;
        } else {
          // ── Calm Ambient Drift Physics ──
          // Add minor noise drift
          node.vx += (Math.random() - 0.5) * 0.01;
          node.vy += (Math.random() - 0.5) * 0.01;

          // Drag back to steady ambient speed limit
          const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          const maxAmbientSpeed = 0.25;
          if (speed > maxAmbientSpeed) {
            node.vx = (node.vx / speed) * maxAmbientSpeed;
            node.vy = (node.vy / speed) * maxAmbientSpeed;
          }
          node.vx *= 0.99;
          node.vy *= 0.99;
        }

        // Apply movement
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around boundaries (re-spawns at opposite edge)
        const padding = 30;
        if (node.x < -padding) node.x = width + padding;
        if (node.x > width + padding) node.x = -padding;
        if (node.y < -padding) node.y = height + padding;
        if (node.y > height + padding) node.y = -padding;
      }
    },
    [interactivePhysics]
  );

  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, nodes: Node[], width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      // Draw mathematical connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            let opacity = (1 - dist / CONNECTION_DISTANCE) * 0.045;

            // Highlight connections close to the mouse to show interactive energy
            if (interactivePhysics && mouse.active) {
              const mdx1 = mouse.x - nodes[i].x;
              const mdy1 = mouse.y - nodes[i].y;
              const mdist1 = Math.sqrt(mdx1 * mdx1 + mdy1 * mdy1);

              if (mdist1 < 180) {
                const boost = (180 - mdist1) / 180;
                opacity += boost * 0.035;
              }
            }

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            // Dynamic color shift depending on distance
            ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // Draw constellation nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Interpolate colors between indigo and violet
        const t = (node.opacity - 0.15) * 6.6; // normalized value
        const r = Math.round(79 + (99 - 79) * t);
        const g = Math.round(70 + (102 - 70) * t);
        const b = Math.round(229 + (241 - 229) * t);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.opacity})`;
        ctx.fill();
      }
    },
    [interactivePhysics]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dimensionsRef.current = { width, height };

      // Initialize nodes
      if (nodesRef.current.length === 0) {
        nodesRef.current = createNodes(width, height);
      } else {
        // Adapt coordinates to new sizes
        for (const node of nodesRef.current) {
          if (node.x > width) node.x = Math.random() * width;
          if (node.y > height) node.y = Math.random() * height;
        }
      }
    };

    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      updateNodes(nodesRef.current, width, height);
      drawFrame(ctx, nodesRef.current, width, height);
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    
    // Listen globally on the parent container if available to track mouse easily
    const triggerEl = canvas.parentElement || canvas;
    triggerEl.addEventListener('mousemove', handleMouseMove);
    triggerEl.addEventListener('mouseleave', handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      triggerEl.removeEventListener('mousemove', handleMouseMove);
      triggerEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [createNodes, updateNodes, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default NeuralNetworkCanvas;
