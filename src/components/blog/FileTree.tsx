'use client';
import { useState } from 'react';

interface TreeNode {
  name: string;
  type: 'file' | 'dir';
  note?: string;
  children?: TreeNode[];
}

const ASTRO: TreeNode = {
  name: 'src/', type: 'dir', children: [
    { name: 'components/', type: 'dir', children: [
      { name: 'Layout.astro', type: 'file' },
      { name: 'Nav.astro', type: 'file' },
      { name: 'HeroCanvas.astro', type: 'file' },
      { name: 'VogelCanvas.astro', type: 'file' },
      { name: 'MathTransition.astro', type: 'file' },
    ]},
    { name: 'content/', type: 'dir', children: [
      { name: 'config.ts', type: 'file', note: 'schema das coleções' },
      { name: 'blog/', type: 'dir' },
      { name: 'portfolio/', type: 'dir' },
    ]},
    { name: 'pages/', type: 'dir', children: [
      { name: 'index.astro', type: 'file', note: 'home' },
      { name: 'about.astro', type: 'file' },
      { name: 'blog/', type: 'dir', children: [
        { name: 'index.astro', type: 'file' },
        { name: '[slug].astro', type: 'file' },
      ]},
      { name: 'portfolio/', type: 'dir', children: [
        { name: 'index.astro', type: 'file' },
        { name: '[slug].astro', type: 'file' },
      ]},
    ]},
    { name: 'styles/', type: 'dir', children: [
      { name: 'global.css', type: 'file' },
    ]},
  ],
};

const NEXTJS: TreeNode = {
  name: 'src/', type: 'dir', children: [
    { name: 'app/', type: 'dir', note: 'App Router', children: [
      { name: 'layout.tsx', type: 'file', note: 'raiz global' },
      { name: 'page.tsx', type: 'file', note: 'home' },
      { name: 'about/page.tsx', type: 'file' },
      { name: 'blog/page.tsx', type: 'file' },
      { name: 'blog/[slug]/page.tsx', type: 'file' },
      { name: 'portfolio/page.tsx', type: 'file' },
      { name: 'portfolio/[slug]/page.tsx', type: 'file' },
    ]},
    { name: 'components/', type: 'dir', children: [
      { name: 'Nav.tsx', type: 'file' },
      { name: 'HeroCanvas.tsx', type: 'file' },
      { name: 'VogelCanvas.tsx', type: 'file' },
      { name: 'MathTransition.tsx', type: 'file' },
      { name: 'blog/', type: 'dir', note: 'componentes MDX', children: [
        { name: 'Term.tsx', type: 'file' },
        { name: 'Callout.tsx', type: 'file' },
        { name: 'CanvasDemo.tsx', type: 'file' },
        { name: 'FileTree.tsx', type: 'file' },
        { name: 'SandpackDemo.tsx', type: 'file' },
      ]},
    ]},
    { name: 'lib/content.ts', type: 'file', note: 'lê os arquivos .md' },
    { name: 'styles/global.css', type: 'file' },
  ],
};

function Node({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const isDir  = node.type === 'dir';
  const indent = depth * 14;
  const color  = isDir ? 'var(--color-blue)' : 'var(--color-copy)';

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5em',
        paddingLeft: `${indent}px`, lineHeight: 1.9 }}>
        <span style={{ color, fontFamily: 'var(--font-mono)', fontSize: '12px',
          opacity: isDir ? 0.9 : 0.75 }}>
          {isDir ? '▸ ' : '  '}{node.name}
        </span>
        {node.note && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'var(--color-orange)', opacity: 0.7 }}>
            ← {node.note}
          </span>
        )}
      </div>
      {node.children?.map((child, i) => (
        <Node key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function FileTree() {
  const [tab, setTab] = useState<'astro' | 'nextjs'>('astro');

  const btn = (id: 'astro' | 'nextjs', label: string) => (
    <button onClick={() => setTab(id)} style={{
      fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase',
      letterSpacing: '0.08em', padding: '0.4em 1em', cursor: 'pointer',
      border: '1px solid',
      borderColor: tab === id ? 'var(--color-orange)' : 'var(--color-line)',
      color: tab === id ? 'var(--color-orange)' : 'var(--color-muted)',
      background: tab === id ? 'rgba(249,115,22,0.08)' : 'transparent',
      borderRadius: '4px', transition: 'all 0.15s',
    }}>
      {label}
    </button>
  );

  return (
    <figure style={{ margin: '2em 0' }}>
      <div style={{ display: 'flex', gap: '0.5em', marginBottom: '1em' }}>
        {btn('astro',  'Astro (antes)')}
        {btn('nextjs', 'Next.js (depois)')}
      </div>
      <div style={{
        background: 'var(--color-raised)', border: '1px solid var(--color-line)',
        borderRadius: '8px', padding: '1.25rem',
      }}>
        <Node node={tab === 'astro' ? ASTRO : NEXTJS} />
      </div>
      <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: '10px',
        color: 'var(--color-muted)', marginTop: '0.5em', textAlign: 'center',
        letterSpacing: '0.06em' }}>
        estrutura de arquivos — {tab === 'astro' ? 'versão Astro' : 'versão Next.js'}
      </figcaption>
    </figure>
  );
}
