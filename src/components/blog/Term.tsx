'use client';
import { useState } from 'react';

interface TermProps {
  def: string;
  children: React.ReactNode;
}

export default function Term({ def, children }: TermProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span style={{
        background: '#252530',
        padding: '0.05em 0.2em',
        borderRadius: '3px',
        cursor: 'help',
      }}>
        {children}
      </span>

      {visible && (
        <span style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--color-raised)',
          border: '1px solid var(--color-line)',
          color: 'var(--color-copy)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          lineHeight: '1.5',
          padding: '0.4em 0.75em',
          borderRadius: '6px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 100,
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}>
          {def}
        </span>
      )}
    </span>
  );
}
