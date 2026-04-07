import { useEffect, useRef } from 'react';

export default function ElectricField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let bolts = [];
    let sparks = [];
    let time = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ─── Particle ───────────────────────────────────
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        const cx = canvas.width * (0.3 + Math.random() * 0.4);
        const cy = canvas.height * (0.3 + Math.random() * 0.4);
        this.x = cx;
        this.y = cy;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.6 + 0.1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = Math.random() * 300 + 150;
        this.maxLife = this.life;
        this.size = Math.random() * 2 + 0.8;
        this.glowSize = this.size * (3 + Math.random() * 5);
        const pick = Math.random();
        if (pick < 0.3) this.color = [0, 168, 255];
        else if (pick < 0.5) this.color = [100, 200, 255];
        else if (pick < 0.7) this.color = [180, 220, 255];
        else if (pick < 0.85) this.color = [255, 255, 255];
        else this.color = [255, 200, 80];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Slight wander
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;
        this.life--;
        if (this.life <= 0 || this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
          this.reset();
        }
      }
      draw(ctx) {
        const alpha = Math.min(1, (this.life / this.maxLife) * 1.2);
        const [r, g, b] = this.color;
        // Big soft glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.08})`;
        ctx.fill();
        // Medium glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.25})`;
        ctx.fill();
        // Hot core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.9})`;
        ctx.fill();
        // White-hot center
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
        ctx.fill();
      }
    }

    // ─── Lightning Bolt ─────────────────────────────
    function createBolt() {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const length = 150 + Math.random() * 300;
      const points = [];
      let x = cx + Math.cos(angle) * 20;
      let y = cy + Math.sin(angle) * 20;
      const steps = Math.floor(length / 6);

      for (let i = 0; i < steps; i++) {
        const jitter = (1 - i / steps) * 25;
        x += Math.cos(angle) * 6 + (Math.random() - 0.5) * jitter;
        y += Math.sin(angle) * 6 + (Math.random() - 0.5) * jitter;
        points.push({ x, y });

        // Branches
        if (Math.random() < 0.12 && i > 2) {
          const ba = angle + (Math.random() - 0.5) * 2;
          let bx = x, by = y;
          const branch = [];
          for (let j = 0; j < Math.floor(Math.random() * 12) + 4; j++) {
            bx += Math.cos(ba) * 5 + (Math.random() - 0.5) * 12;
            by += Math.sin(ba) * 5 + (Math.random() - 0.5) * 12;
            branch.push({ x: bx, y: by });
          }
          points.push({ branch });
        }
      }

      // Spawn sparks at the bolt tip
      const tip = points.filter(p => !p.branch).pop();
      if (tip) {
        for (let i = 0; i < 8; i++) {
          sparks.push({
            x: tip.x, y: tip.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 20 + Math.random() * 15,
            size: Math.random() * 2 + 0.5,
          });
        }
      }

      return { points, life: 18, maxLife: 18 };
    }

    function drawBolt(bolt) {
      const a = bolt.life / bolt.maxLife;
      const mainPts = bolt.points.filter(p => !p.branch);
      
      // Thick outer glow
      ctx.beginPath();
      if (mainPts.length > 0) ctx.moveTo(mainPts[0].x, mainPts[0].y);
      mainPts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = `rgba(0, 140, 255, ${a * 0.3})`;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Core
      ctx.beginPath();
      if (mainPts.length > 0) ctx.moveTo(mainPts[0].x, mainPts[0].y);
      mainPts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = `rgba(180, 220, 255, ${a * 0.85})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // White-hot center line
      ctx.beginPath();
      if (mainPts.length > 0) ctx.moveTo(mainPts[0].x, mainPts[0].y);
      mainPts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.6})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw branches
      bolt.points.filter(p => p.branch).forEach(bp => {
        ctx.beginPath();
        bp.branch.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = `rgba(100, 180, 255, ${a * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    // ─── Initialize ─────────────────────────────────
    const count = Math.min(300, Math.max(100, Math.floor(window.innerWidth * 0.2)));
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.life = Math.random() * p.maxLife; // stagger
      particles.push(p);
    }

    // ─── Ambient background energy ──────────────────
    function drawAmbient() {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = Math.sin(time * 0.015) * 0.4 + 0.6;

      // Wide ambient glow
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.4);
      g1.addColorStop(0, `rgba(0, 120, 255, ${0.06 * pulse})`);
      g1.addColorStop(0.5, `rgba(0, 60, 180, ${0.03 * pulse})`);
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hot center
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      g2.addColorStop(0, `rgba(200, 230, 255, ${0.12 * pulse})`);
      g2.addColorStop(0.6, `rgba(0, 120, 255, ${0.06 * pulse})`);
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(cx - 100, cy - 100, 200, 200);
    }

    // ─── Main Loop ──────────────────────────────────
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      drawAmbient();

      // Particles
      particles.forEach(p => { p.update(); p.draw(ctx); });

      // Bolts — fire frequently
      if (Math.random() < 0.08) bolts.push(createBolt());
      bolts = bolts.filter(b => { b.life--; drawBolt(b); return b.life > 0; });

      // Sparks
      sparks = sparks.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08;
        s.life--;
        const a = s.life / 35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 100, ${a})`;
        ctx.fill();
        return s.life > 0;
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
