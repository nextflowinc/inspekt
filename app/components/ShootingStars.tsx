'use client';
import { useEffect, useRef } from 'react';

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Star = {
      x: number; y: number;
      len: number; speed: number;
      opacity: number; maxOpacity: number;
      phase: 'in' | 'hold' | 'out';
      life: number; maxLife: number;
    };

    const stars: Star[] = [];

    const spawn = (): Star => ({
      x: Math.random() * canvas.width * 1.5 + canvas.width * 0.25,
      y: Math.random() * canvas.height * 0.6,
      len: 80 + Math.random() * 120,
      speed: 0.2 + Math.random() * 2,
      opacity: 0,
      maxOpacity: 0.45 + Math.random() * 0.3,
      phase: 'in',
      life: 0,
      maxLife: 80 + Math.random() * 60,
    });

    for (let i = 0; i < 10; i++) {
      const s = spawn();
      s.life = Math.random() * s.maxLife;
      s.opacity = s.maxOpacity * 0.5;
      stars.push(s);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // droite vers gauche
        s.x -= s.speed * 0.6;
        s.y += s.speed;
        s.life++;

        if (s.phase === 'in') {
          s.opacity += 0.015;
          if (s.opacity >= s.maxOpacity) {
            s.opacity = s.maxOpacity;
            s.phase = 'hold';
          }
        } else if (s.phase === 'hold') {
          if (s.life >= s.maxLife) s.phase = 'out';
        } else {
          s.opacity -= 0.012;
          if (s.opacity <= 0) {
            stars[i] = spawn();
            continue;
          }
        }

        // queue : part de derrière (droite) vers la tête (gauche-bas)
        const tx = s.x + Math.cos(Math.atan2(s.speed, s.speed * 0.6)) * s.len;
        const ty = s.y - Math.sin(Math.atan2(s.speed, s.speed * 0.6)) * s.len;

        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, `rgba(210,245,255,0)`);
        grad.addColorStop(1, `rgba(210,245,255,${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // point brillant à la tête
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,250,255,${s.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}