'use client';
import { useEffect, useState } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

const THEME = {
  colors: {
    surface1: '#1C1C21', surface2: '#0D0D0F', surface3: '#3A3A42',
    clickable: '#8A8A96', base: '#F0F0F4', disabled: '#3A3A42',
    hover: '#F97316', accent: '#F97316', error: '#FF6B6B', errorSurface: '#2D1F1F',
  },
  syntax: {
    plain: '#F0F0F4', comment: { color: '#8A8A96', fontStyle: 'italic' as const },
    keyword: '#0EA5E9', tag: '#F97316', punctuation: '#8A8A96',
    definition: '#F0F0F4', property: '#0EA5E9', static: '#F97316', string: '#4ade80',
  },
  font: {
    body: "'Space Grotesk', system-ui, sans-serif",
    mono: "'JetBrains Mono', Consolas, monospace",
    size: '13px', lineHeight: '1.7',
  },
};

const HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0D0D0F; display: flex; justify-content: center; align-items: center; height: 100vh; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script src="/index.js"></script>
</body>
</html>`;

const DEMOS: Record<string, { title: string; code: string }> = {
  vogel: {
    title: 'Espiral de Vogel — edite numPoints e scale',
    code: `const canvas  = document.getElementById('canvas');
const ctx     = canvas.getContext('2d');
canvas.width  = 400;
canvas.height = 400;

// ── edite aqui ─────────────────────────
const numPoints = 200;
const scale     = 8;    // distância entre pontos
// ───────────────────────────────────────

const PHI = Math.PI * (3 - Math.sqrt(5)); // ângulo de ouro ≈ 137.5°
const cx  = canvas.width  / 2;
const cy  = canvas.height / 2;

ctx.fillStyle = '#0D0D0F';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let i = 0;
function frame() {
  if (i >= numPoints) return;

  const r     = scale * Math.sqrt(i);
  const angle = i * PHI;
  const x     = cx + r * Math.cos(angle);
  const y     = cy + r * Math.sin(angle);

  ctx.globalAlpha = 0.3 + (i / numPoints) * 0.7;
  ctx.fillStyle   = '#F97316';
  ctx.beginPath();
  ctx.arc(x, y, 1.5 + (i / numPoints) * 4, 0, Math.PI * 2);
  ctx.fill();

  i++;
  setTimeout(frame, 12);
}
frame();
`,
  },
  graph: {
    title: 'Malha de grafos — edite MAX_D para ver o grafo se fragmentar ou adensar',
    code: `const canvas  = document.getElementById('canvas');
const ctx     = canvas.getContext('2d');
canvas.width  = 400;
canvas.height = 380;

// ── edite aqui ─────────────────────────
const N     = 50;    // número de nós
const MAX_D = 120;   // raio máximo de conexão (px)
// ───────────────────────────────────────

const nodes = Array.from({ length: N }, () => ({
  x: 20 + Math.random() * 360,
  y: 20 + Math.random() * 340,
}));

ctx.fillStyle = '#0D0D0F';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// arestas
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
    if (d < MAX_D) {
      ctx.save();
      ctx.globalAlpha  = (1 - d / MAX_D) * 0.45;
      ctx.strokeStyle  = '#F97316';
      ctx.lineWidth    = 1;
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// nós
for (const n of nodes) {
  ctx.fillStyle = '#0D0D0F';
  ctx.beginPath(); ctx.arc(n.x, n.y, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0EA5E9';
  ctx.beginPath(); ctx.arc(n.x, n.y, 3, 0, Math.PI * 2); ctx.fill();
}
`,
  },
};

export default function SandpackDemo({ demo }: { demo: 'vogel' | 'graph' }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { title, code } = DEMOS[demo];

  if (!mounted) return (
    <div style={{ margin: '2em 0', background: 'var(--color-raised)',
      border: '1px solid var(--color-line)', borderRadius: '8px',
      padding: '2rem', textAlign: 'center',
      fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-muted)' }}>
      carregando editor…
    </div>
  );

  return (
    <figure style={{ margin: '2em 0' }}>
      <Sandpack
        template="vanilla"
        theme={THEME}
        files={{
          '/index.html': { code: HTML, hidden: true },
          '/index.js':   { code, active: true },
        }}
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: true,
          editorHeight: 340,
          externalResources: [],
        }}
      />
      <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: '10px',
        color: 'var(--color-muted)', marginTop: '0.5em', textAlign: 'center',
        letterSpacing: '0.06em' }}>
        {title}
      </figcaption>
    </figure>
  );
}
