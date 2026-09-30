import React, { useEffect, useRef } from 'react';

interface CelebrationCanvasProps {
  triggerKey?: number;
  intensity?: 'high' | 'subtle';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  decay: number;
  shape: 'rect' | 'circle' | 'strip';
}

export const CelebrationCanvas: React.FC<CelebrationCanvasProps> = ({
  triggerKey = 0,
  intensity = 'high',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dark-mode sleek palette: Emerald neon, mint, champagne gold, platinum white
    const colors = [
      '#22c55e', // Neon emerald
      '#4ade80', // Light neon green
      '#10b981', // Emerald deep
      '#86efac', // Soft pale green
      '#facc15', // Subtle warm gold
      '#e2e8f0', // Crisp platinum
      '#34d399', // Mint cyan
    ];

    const particles: Particle[] = [];
    const particleCount = intensity === 'high' ? 90 : 45;

    // Center-top source origin near the success checkmark
    const originX = width / 2;
    const originY = Math.min(height * 0.22, 180);

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.8;
      const speed = Math.random() * 7 + 2.5;
      const spreadY = -Math.abs(Math.sin(angle) * speed) - Math.random() * 3.5;
      const spreadX = Math.cos(angle) * (speed * 1.3);

      particles.push({
        x: originX + (Math.random() - 0.5) * 40,
        y: originY + (Math.random() - 0.5) * 20,
        vx: spreadX,
        vy: spreadY,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        alpha: 1,
        decay: Math.random() * 0.005 + 0.004,
        shape: Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'strip' : 'circle',
      });
    }

    // Add 25 ambient gently floating background glow motes
    const ambientMotes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];
    for (let i = 0; i < 30; i++) {
      ambientMotes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? '#22c55e' : '#a7f3d0',
      });
    }

    const gravity = 0.14;
    const friction = 0.985;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle ambient floating motes
      for (const mote of ambientMotes) {
        mote.x += mote.vx;
        mote.y += mote.vy;
        if (mote.y < 0) mote.y = height + 10;
        if (mote.x < 0) mote.x = width;
        if (mote.x > width) mote.x = 0;

        ctx.save();
        ctx.globalAlpha = mote.alpha;
        ctx.fillStyle = mote.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#22c55e';
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render celebration confetti particles
      let activeParticles = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0) continue;
        activeParticles++;

        p.vx *= friction;
        p.vy = p.vy * friction + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha = Math.max(0, p.alpha - p.decay);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        // Subtle glow for neon green particles
        if (p.color === '#22c55e' || p.color === '#4ade80') {
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#22c55e';
        }

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === 'strip') {
          ctx.fillRect(-p.size * 0.8, -p.size * 0.25, p.size * 1.6, p.size * 0.4);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [triggerKey, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
