'use client';
import { useEffect, useRef } from 'react';

interface CanvasDemoProps {
  type: 'nodes' | 'repulsion';
}

// ── Nodes appearing one by one ────────────────────────────────────────────────
function NodesDemo({ canvas }: { canvas: HTMLCanvasElement }) {
  const ctx = canvas.getContext('2d')!;
  const N = 40, MAX_D = 90;
  const w = canvas.offsetWidth, h = canvas.height / (devicePixelRatio || 1);
  const nodes = Array.from({ length: N }, () => ({
    x: 24 + Math.random() * (w - 48),
    y: 24 + Math.random() * (h - 48),
  }));
  let visible = 0;

  function draw() {
    ctx.fillStyle = '#0D0D0F';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < visible; i++) {
      for (let j = i + 1; j < visible; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < MAX_D) {
          ctx.save();
          ctx.globalAlpha = (1 - d / MAX_D) * 0.35;
          ctx.strokeStyle = '#F97316'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); ctx.restore();
        }
      }
      ctx.fillStyle = '#0D0D0F';
      ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0EA5E9';
      ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, 3, 0, Math.PI * 2); ctx.fill();
    }
  }

  let timer: ReturnType<typeof setInterval>;
  function run() {
    draw();
    if (visible < N) { visible++; timer = setTimeout(run, 80); }
    else setTimeout(() => { visible = 0; run(); }, 1200);
  }
  run();
  return () => clearTimeout(timer);
}

// ── Repulsion demo with simulated cursor ──────────────────────────────────────
function RepulsionDemo({ canvas }: { canvas: HTMLCanvasElement }) {
  const ctx = canvas.getContext('2d')!;
  const N = 35, MAX_D = 100, REPEL_R = 80;
  const w = canvas.offsetWidth, h = canvas.height / (devicePixelRatio || 1);

  interface Node { ox:number;oy:number;x:number;y:number;vx:number;vy:number; }
  const nodes: Node[] = Array.from({ length: N }, () => {
    const x = 24 + Math.random() * (w - 48), y = 24 + Math.random() * (h - 48);
    return { ox: x, oy: y, x, y, vx: 0, vy: 0 };
  });

  let t = 0, raf = 0;
  function tick() {
    t += 0.018;
    const cx = w * 0.5 + Math.cos(t * 0.7) * w * 0.28;
    const cy = h * 0.5 + Math.sin(t) * h * 0.28;

    ctx.fillStyle = '#0D0D0F'; ctx.fillRect(0, 0, w, h);

    for (const n of nodes) {
      const dx = n.x - cx, dy = n.y - cy, d = Math.hypot(dx, dy) || 1;
      if (d < REPEL_R) {
        const f = Math.pow(1 - d / REPEL_R, 2) * 6;
        n.vx += (dx / d) * f; n.vy += (dy / d) * f;
      }
      n.vx *= 0.82; n.vy *= 0.82;
      n.x += n.vx; n.y += n.vy;
      n.x += (n.ox - n.x) * 0.05;
      n.y += (n.oy - n.y) * 0.05;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < MAX_D) {
          ctx.save(); ctx.globalAlpha = (1 - d / MAX_D) * 0.3;
          ctx.strokeStyle = '#F97316'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); ctx.restore();
        }
      }
      const near = Math.hypot(nodes[i].x - cx, nodes[i].y - cy) < REPEL_R;
      ctx.fillStyle = '#0D0D0F';
      ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = near ? '#F97316' : '#0EA5E9';
      ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, 3, 0, Math.PI * 2); ctx.fill();
    }

    // simulated cursor ring
    ctx.save();
    ctx.globalAlpha = 0.25; ctx.strokeStyle = '#F97316'; ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.arc(cx, cy, REPEL_R, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = '#F97316';
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

    raf = requestAnimationFrame(tick);
  }
  tick();
  return () => cancelAnimationFrame(raf);
}

export default function CanvasDemo({ type }: CanvasDemoProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const dpr = devicePixelRatio || 1;
    canvas.width  = canvas.offsetWidth * dpr;
    canvas.height = 220 * dpr;
    canvas.getContext('2d')!.scale(dpr, dpr);

    const cleanup = type === 'nodes'
      ? NodesDemo({ canvas })
      : RepulsionDemo({ canvas });

    return cleanup ?? undefined;
  }, [type]);

  const label = type === 'nodes'
    ? 'nós aparecendo aleatoriamente e se conectando por proximidade'
    : 'cursor simulado empurrando os nós (anel laranja = raio de repulsão)';

  return (
    <figure style={{ margin: '2em 0' }}>
      <canvas ref={ref} aria-label={label}
        style={{ width: '100%', height: '220px', borderRadius: '8px', display: 'block',
          border: '1px solid var(--color-line)' }} />
      <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: '10px',
        color: 'var(--color-muted)', marginTop: '0.5em', textAlign: 'center',
        letterSpacing: '0.06em' }}>
        {label}
      </figcaption>
    </figure>
  );
}
